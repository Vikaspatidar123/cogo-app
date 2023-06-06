import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function PromoCodeIcon({
	filteredPromoData = [],
	service = {},
	isSelectDisabled,
}) {
	const getDiscount = (item) => {
		if (item.unit === 'percentage') {
			return `${Math.round(item.value)}%`;
		}

		return formatAmount({
			amount   : Math.round(item.value),
			currency : item.amount_currency,
			options  : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 0,
			},
		});
	};
	return (
		<div>
			{(filteredPromoData || []).map((item) => (
				<Tooltip
					content={(
						<div className={styles.tool_tip_content}>
							Add this service to get discount
							<div className={styles.amount}>
								upto
								{getDiscount(item)}
							</div>
						</div>
					)}
					theme="light"
					placement="left"
				>
					<div>
						{item.service_type === service.service_type
								&& item.trade_type === service.trade_type
								&& !service.isSelected
								&& !isSelectDisabled }
					</div>
				</Tooltip>
			))}
		</div>
	);
}

export default PromoCodeIcon;
