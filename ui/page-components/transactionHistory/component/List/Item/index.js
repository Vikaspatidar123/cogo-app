import { Tooltip, Placeholder } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useGetDrillDownData from '../../../hooks/useGetDrillDownData';
import Bill from '../Bill';
import MobileBill from '../MobileBill';

import MobileView from './MobileView';
import itemFunctions from './renderFunctions';
import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function Item({
	item,
	fields,
	loading,
	sort,
}) {
	const [showDrill, setShowDrill] = useState(false);

	const {
		drillDownData,
		drillDownLoading,
	} = useGetDrillDownData();

	useEffect(() => {
		setShowDrill(false);
	}, [sort]);

	const { newFunctions } = itemFunctions();
	const infoData = (singleItem, itm) => {
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
		<div
			className={`${styles.container} ${showDrill
				&& styles.displayDrill && styles.mobile}`}
		>
			<div className={styles.mobile_table}>
				<MobileView
					fields={fields}
					infoData={infoData}
					itm={itm}
					loading={loading}
				/>
			</div>

			<div className={styles.row}>
				{(fields || []).map((singleItem) => (
					<div
						className={styles.col}
						style={singleItem.styles}
						key={singleItem?.key}
					>
						{loading && (
							<Placeholder style={{ height: '20px', width: '100%' }}>
								<rect width="100%" height="20px" />
							</Placeholder>
						)}
						{singleItem.render && !loading ? singleItem.render(itm) : null}
						{infoData(singleItem, itm)}
					</div>
				))}
			</div>

			{/* <div
				className={styles.arrow}
				role="presentation"
				onClick={() => onOpen(itm)}
			>
				<div className={styles.arrow_icon_div}>
					<IcMArrowRotateDown
						width={15}
						height={15}
						className={`${showDrill && 'rotateIcon'} hyperlinkIcon`}
					/>
				</div>
			</div> */}

			<div
				className={
					showDrill ? `${styles.drill_down}${styles.displayDrill}` : `${styles.drill_down}`
				}
			>
				<div className={styles.mobile_bill}>
					{!drillDownLoading && (
						<div className={styles.parent}>
							<div className={styles.bill}>
								<Bill drillDownData={drillDownData} />
							</div>
						</div>
					)}
				</div>
				<div className={styles.mobile_bill_summary}>
					{!drillDownLoading && (
						<div className={styles.parent}>
							<div className={styles.bill}>
								<MobileBill drillDownData={drillDownData} />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);

	return renderItem(item);
}

export default Item;
