import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import CC from '../../../helpers/condition-constants';
import useGetPermission from '../../../hooks/useGetPermission';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function LineItems({ item = {} }) {
	const { isConditionMatches } = useGetPermission();

	const {
		name,
		currency,
		quantity,
		unit,
		margins,
		total_price_discounted,
		price_discounted,
	} = item || {};

	let totalMarginValue = 0;
	if (isConditionMatches(CC.SEE_SALES_MARGIN, 'or')) {
		totalMarginValue = !isEmpty(margins)
			? (margins || []).filter((margin) => margin?.margin_type === 'demand')[0]
				?.total_margin_value
			: 0;
	}
	if (isConditionMatches(CC.SEE_SUPPLY_MARGIN, 'or')) {
		totalMarginValue = !isEmpty(margins)
			? (margins || []).filter((margin) => margin?.margin_type === 'supply')[0]
				?.total_margin_value
			: 0;
	}
	if (isConditionMatches(CC.SEE_ALL_MARGINS, 'or')) {
		(margins || []).forEach((margin) => {
			totalMarginValue += margin?.total_margin_value;
		});
	}

	const priceWithoutMargin = totalMarginValue
		? total_price_discounted - totalMarginValue
		: total_price_discounted;

	return (
		<div className={styles.line_item}>
			<div className={styles.flex_row}>
				<div className={styles.flex_row}>
					<div className={styles.text}>{name}</div>
				</div>

				<div className={styles.flex_row}>
					<div className={styles.total_price}>
						<span style={{ fontWeight: 500 }}>
							{formatAmount({
              	amount  : total_price_discounted,
              	currency,
              	options : {
              		style                 : 'currency',
              		currencyDisplay       : 'code',
              		maximumFractionDigits : 0,
              	},
							})}
						</span>

						{isConditionMatches(
            	[...CC.SEE_SALES_MARGIN, ...CC.SEE_SUPPLY_MARGIN],
            	'or',
						) ? (
							<div className={styles.space}>
								{price_discounted}
								(
								{startCase(unit)}
								) x
								{quantity}
							</div>
            	) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default LineItems;
