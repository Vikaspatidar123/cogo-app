import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function DiscountTooltip({ discountedAmount, currency }) {
	const { t } = useTranslation(['subscriptions']);
	return (
		<div className={styles.discount_content}>
			<div className={styles.heading}>
				{t('subscriptions:total_discount_text')}
				:
			</div>
			<div className={styles.content}>
				<div>{t('subscriptions:coupons_discount_text')}</div>
				<div>
					-
					{formatAmount({
                    	amount  : discountedAmount,
                    	currency,
                    	options : {
                    		notation : 'standard',
                    		style    : 'currency',
                    	},
					})}
				</div>
			</div>
		</div>
	);
}

export default DiscountTooltip;
