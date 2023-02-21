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
	isMobile = false,
	functions = {},
}) => {
	const { newFunctions } = itemFunctions({
		functions,
		isMobile,
	});
	const infoData = (singleItem, itm = {}) => {
		if (singleItem?.toolTip) {
			return (
				<Tooltip
					content={(
						<div style={{ color: 'grey' }}>
							{getValue(itm, singleItem, isMobile, newFunctions)}
						</div>
					)}
					theme="light"
				>
					<div>
						<div className={styles.info}>{getValue(itm, singleItem, isMobile, newFunctions)}</div>
					</div>
				</Tooltip>
			);
		}
		return getValue(itm, singleItem, isMobile, newFunctions);
	};
	const renderItem = (itm) => (
		<div className={`${styles.Container} ${isMobile && 'mobile'}`}>
			{isMobile ? (
				<MobileView fields={fields} infoData={infoData} itm={itm} loading={loading} />
			) : (
				<div className={styles.row} role="presentation" onClick={handleClick}>
					{(fields || []).map((singleItem) => (
						<div
							className={styles.col}
							style={singleItem?.styles}
							key={singleItem?.key}
						>
							{loading && (
								<>Loading...</>
							)}
							{infoData(singleItem, itm)}
						</div>
					))}
				</div>
			)}
		</div>
	);

	return renderItem(item);
};

export default Item;
