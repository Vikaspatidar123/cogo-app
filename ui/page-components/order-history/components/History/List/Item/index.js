import { Tooltip } from '@cogoport/components';

import MobileView from './MobileView';
import itemFunctions from './renderFunctions';
import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

const Item = ({
	item = {},
	fields = [],
	handleClick = () => {},
	loading = false,
	functions = {},
}) => {
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
					theme="light"
				>
					<div className={styles.info}>{getValue(itm, singleItem, newFunctions)}</div>
				</Tooltip>
			);
		}
		return getValue(itm, singleItem, newFunctions);
	};
	const renderItem = (itm) => (
		<div className={styles.container}>

			<div className={styles.mobile_view}>
				<MobileView fields={fields} infoData={infoData} itm={itm} loading={loading} />
			</div>

			<div className={styles.web_view}>
				<div className={styles.row} role="presentation" onClick={handleClick}>
					{(fields || []).map((singleItem) => (
						<div
							className={styles.col}
							style={singleItem?.styles}
							key={singleItem?.key}
						>
							{!loading && (
								<div className="main-item">
									<div className="static-background">
										<div className="background-masker btn-divide-left" />
									</div>
								</div>
							)}
							{infoData(singleItem, itm)}
						</div>
					))}
				</div>
			</div>
		</div>
	);

	return renderItem(item);
};

export default Item;
