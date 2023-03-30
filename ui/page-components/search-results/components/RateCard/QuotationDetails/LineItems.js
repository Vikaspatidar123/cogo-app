import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import CC from '../../../helpers/condition-constants';
import useGetPermission from '../../../hooks/useGetPermission';

import Margins from './Margins';
import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function LineItems({ item = {} }) {
	const { isConditionMatches, isChannelPartner } = useGetPermission();

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

					{!isChannelPartner ? (
						<div>
							{`${formatAmount({
								amount  : priceWithoutMargin,
								currency,
								options : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							})}`}
						</div>
					) : null}
				</div>

				<div className={styles.flex_row}>
					{!isChannelPartner ? (
						<div style={{ marginTop: '-6px' }}>
							{!isEmpty(margins) ? (
								<Margins margins={margins} />
							) : (
								<div className={styles.space}>
									+
									{' '}
									<div className={`${styles.pill} ${styles.no_margin}`}>No margin</div>
								</div>
							)}
						</div>
					) : null}

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

			{/* mobileview  ----->>> */}
			{!isChannelPartner ? (
				<div className={`${styles.MobileMargins} ${styles.top}`}>
					{`${formatAmount({
						amount  : priceWithoutMargin,
						currency,
						options : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
						},
					})}`}

					<div style={{ marginTop: '-6px' }}>
						{!isEmpty(margins) ? (
							<Margins margins={margins} />
						) : (
							<div className={`${styles.pill} ${styles.no_margin}`}>No margin</div>
						)}
					</div>
				</div>
			) : null}
		</div>
	);
}

export default LineItems;
