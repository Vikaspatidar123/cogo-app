import { Placeholder, cl } from '@cogoport/components';

import MobileView from './MobileView';
import itemFunctions from './renderFunctions';
import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function Item({
	item = {},
	fields = [],
	setDetailsModal,
	loading = false,
}) {
	const { newFunctions } = itemFunctions();

	const clickHandler = ({ key }) => {
		if (item.status !== 'DATA_GENERATED' || key === 'csat') return;
		setDetailsModal({
			show               : true,
			tradeEngineInputId : item?.tradeEngineInputId,
			requestType        : item?.requestType,
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.mobile_view}>
				<MobileView
					fields={fields}
					itm={item}
					loading={loading}
					newFunctions={newFunctions}
				/>
			</div>

			<div className={styles.web_view}>
				<div
					className={cl`${styles.row} ${item.status === 'DATA_GENERATED' ? styles.hover_row : ''} `}
				>
					{fields.map((singleItem) => (
						<div
							key={singleItem?.key}
							style={{ width: singleItem?.width }}
							className={styles.col}
							role="presentation"
							onClick={() => clickHandler({ key: singleItem?.key })}
						>
							{loading ? (
								<Placeholder width="90px" />
							) : (
								getValue(item, singleItem, newFunctions)
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Item;
