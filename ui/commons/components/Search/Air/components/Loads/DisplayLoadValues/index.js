import { Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from '../styles.module.css';

function DisplayLoadValues({ showFilledValues }) {
	if (!isEmpty(showFilledValues.gross || {})) {
		const { gross = {} } = showFilledValues || {};
		const {
			gross_volume = '',
			total_quantity = '',
			total_weight = '',
			volume_unit = 'CBM',
			weight_unit = 'KGs',
		} = gross || {};
		return (
			<Tooltip
				placement="top-start"
				animation="shift-away"
				content={(
					<div className={styles.tool_tip_container}>
						<li>
							PACKAGES:
							{' '}
							{total_quantity}
							{' '}
							|| WT:
							{total_weight}
							{weight_unit.toUpperCase()}
							{' '}
							|| VOL:
							{gross_volume}
							{volume_unit.toUpperCase()}
						</li>
					</div>
				)}
			>
				<div className={styles.load_value_container}>
					<div className={styles.filled_value_container}>
						PACKAGES:
						{' '}
						{total_quantity}
					</div>
					<div className={styles.filled_value_container}>
						WT:
						{' '}
						{total_weight}
						{weight_unit.toUpperCase()}
					</div>
					<div className={styles.filled_value_container}>
						VOL:
						{' '}
						{gross_volume}
						{volume_unit.toUpperCase()}
					</div>
				</div>
			</Tooltip>
		);
	}
	const { perPackagedata = {} } = showFilledValues || {};

	let totalWeight = 0;
	let totalQuantity = 0;
	let totalVolume = 0;
	(perPackagedata.packages || []).forEach((item) => {
		totalQuantity += Number(item.quantity);
		if (!item.weight_unit || item.weight_unit === 'kg_unit') {
			totalWeight += Number(item.quantity) * Number(item.weight);
		}
		if (item.weight_unit === 'kg_total') {
			totalWeight += Number(item.weight);
		}
		if (item.weight_unit === 'lb_unit') {
			totalWeight += (Number(item.quantity) * Number(item.weight)) / 2.205;
		}
		if (item.weight_unit === 'lb_total') {
			totalWeight += Number(item.weight) / 2.205;
		}

		if (item.dimensions_unit === 'cm' || !item.dimensions_unit) {
			totalVolume
        += (Number(item.length)
          * Number(item.width)
          * Number(item.height)
          * Number(item.quantity))
        / 1000000;
		}
		if (item.dimensions_unit === 'inch') {
			totalVolume
        += (Number(item.length)
          * Number(item.width)
          * Number(item.height)
          * Number(item.quantity))
        / 61020;
		}
	});

	totalVolume = Math.round(totalVolume * 1000000) / 1000000;
	totalWeight = Math.round(totalWeight * 1000000) / 1000000;
	return (
		<Tooltip
			placement="top-start"
			theme="light"
			animation="shift-away"
			content={(
				<div className={styles.tool_tip_container}>
					{perPackagedata.packages.map((item) => (
						<li>
							{item.quantity}
							{' '}
							||
							{item.packing_type}
							{' '}
							||
							{item.weight}
							{item?.weight_unit?.split('_')[0] || 'kgs'}
							{' '}
							||
							{'  '}
							{item.length}
							x
							{item.width}
							x
							{item.height}
							{'  '}
							{item?.dimensions_unit || 'cm'}
						</li>
					))}
				</div>
			)}
		>
			<div className={styles.load_value_container}>
				<div className={styles.filled_value_container}>
					QTY.-
					{totalQuantity}
				</div>
				<div className={styles.filled_value_container}>
					WT.-
					{totalWeight}
					Kgs
					{' '}
				</div>
				<div className={styles.filled_value_container}>
					VOL.-
					{totalVolume}
					cbm
				</div>
			</div>
		</Tooltip>
	);
}

export default DisplayLoadValues;
