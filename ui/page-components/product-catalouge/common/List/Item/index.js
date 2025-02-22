/* eslint-disable import/no-unresolved */
import { Tooltip, Loader } from '@cogoport/components';

import MobileView from '../MobileViewIndex';

import itemFunctions from './renderFunctions';
import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function Item({
	item,
	fields,
	handleClick,
	loading,
	functions,

}) {
	const { newFunctions } = itemFunctions({ functions });
	const infoData = (singleItem, itm) => {
		if (singleItem?.toolTip) {
			return (
				<Tooltip
					content={(
						<div style={{ color: 'grey' }}>
							{getValue(itm, singleItem, newFunctions, false)}
						</div>
					)}
					theme="light"
				>
					<div className={styles.info}>{getValue(itm, singleItem, newFunctions, false)}</div>
				</Tooltip>
			);
		}
		return getValue(itm, singleItem, newFunctions, false);
	};
	const renderItem = (itm) => (
		<div className={styles.container}>
			<div className={styles.mobile_view}>
				<MobileView fields={fields} infoData={infoData} itm={itm} loading={loading} />
			</div>
			<div className={styles.row_container} onClick={handleClick} role="presentation">
				{loading && (
					<Loader style={{ height: '20px', width: '20px' }} />
				)}
				{!loading && (fields || []).map((singleItem) => (
					<div
						className={styles.col_container}
						style={singleItem.styles}
						key={singleItem?.key}
					>
						{singleItem.render && !loading ? singleItem.render(itm) : null}
						{infoData(singleItem, itm)}
					</div>
				))}
			</div>
		</div>
	);

	return renderItem(item);
}

export default Item;
