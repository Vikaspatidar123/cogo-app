import { Tooltip, Placeholder } from '@cogoport/components';

import MobileView from './MobileView';
import itemFunctions from './renderFunctions';
import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function Item({
	item = {},
	fields = [],
	handleClick = () => {},
	loading = false,
	functions = {},
}) {
	const { newFunctions } = itemFunctions({
		functions,
	});
	const infoData = (singleItem, itm = {}) => {
		if (singleItem?.toolTip) {
			return (
				<Tooltip
					content={(
						<div style={{ color: 'grey' }}>
							{getValue(itm, singleItem, newFunctions)}
						</div>
					)}
				>
					<div className={styles.info}>
						{getValue(itm, singleItem, newFunctions)}
					</div>
				</Tooltip>
			);
		}
		return getValue(itm, singleItem, newFunctions);
	};

	return (
		<div className={styles.container}>
			<div className={styles.mobile_view}>
				<MobileView
					fields={fields}
					infoData={infoData}
					itm={item}
					loading={loading}
				/>
			</div>

			<div className={styles.web_view}>
				<div
					className={styles.row}
					role="presentation"
					onClick={handleClick}
				>
					{(fields || []).map((singleItem) => (
						<div
							style={{ width: singleItem?.width }}
							key={singleItem?.key}
						>
							{loading ? (
								<Placeholder width="90px" />
							) : (infoData(singleItem, item)
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Item;
