import React, { useMemo } from 'react';

import cancellationMappings from './cancellationMappings';
import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const getCharges = ({ cancellation_charges }) => (cancellation_charges || []).map((item) => {
	const { conditions, charge_type, value, currency } = item;
	const { schedule_departure = '' } = conditions?.[0] || {};
	const [conditionality, days] = schedule_departure?.split(' ') || [];

	const charge =			charge_type === 'percentage'
		? `${value}% of Ocean freight`
		: `${formatAmount({
			amount  : value,
			currency,
			options : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 2,
			},
		})} (${charge_type})`;

	if (conditions) {
		return {
			label : `${days} ${cancellationMappings[conditionality]}`,
			value : charge,
		};
	}

	return {
		label : cancellationMappings[item.milestone],
		value : charge,
	};
});

function CancellationInfo({ detail = {} }) {
	const { cancellation_charges } = detail;

	const charges = useMemo(
		() => getCharges({ cancellation_charges }),
		[cancellation_charges],
	);

	return (
		<div className={styles.container}>
			<div className={styles.card_header}>
				<div className={styles.heading}>Cancellation Time Frame</div>
				<div className={styles.heading}>Charges</div>
			</div>

			<div className={styles.card_items}>
				{charges.map((item, idx) => {
					const { label, value } = item;

					return (
						<div className={styles.items} key={(label || '').replace(' ', '').concat(idx)}>
							<div className="cancellation">{label}</div>
							<div className="charge">{value}</div>
						</div>
					);
				})}
			</div>

			<div className={styles.text}>
				Cancellations made within 10 days of departure and after receiving the
				booking note or shipping order will incur no-show fees, which will be
				billed at actuals.
			</div>
		</div>
	);
}

export default CancellationInfo;
