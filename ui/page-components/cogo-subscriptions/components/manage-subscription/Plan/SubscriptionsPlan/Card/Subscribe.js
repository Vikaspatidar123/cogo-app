import { Button, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const DEFAULT_MONTHLY_AMOUNT = 0;

function Subscribe({
	is_free_plan,
	currency,
	totalAmt,
	activeTab,
	displayPricing,
	item,
	onSubmit,
	setShowActivateModal,
}) {
	const { t } = useTranslation(['subscriptions']);

	return (
		<div className={cl`${styles.center_div} ${styles.subscribe}`}>
			<div>
				{!is_free_plan ? (
					<div className={styles.amount_div}>
						<div className={cl`${styles.styled_row} ${styles.priceRow}`}>
							<div className={styles.price}>
								<div className={styles.currency}>{currency}</div>
								{formatAmount({
                                	amount  : totalAmt || DEFAULT_MONTHLY_AMOUNT,
                                	currency,
                                	options : {
                                		notation : 'standard',
                                		style    : 'currency',
                                	},
								})}
								<div className={styles.per_period}>
									{' '}
									/
									{' '}
									{t('subscriptions:month_text')}
								</div>
							</div>
						</div>
						{activeTab === 'annual' && (
							<div className={cl`${styles.styled_row} ${styles.priceRow} `}>
								<div className={styles.annuallyTxt}>
									{t('subscriptions:billed_annually_text')}
								</div>
							</div>
						)}
					</div>
				) : null}
			</div>
			{!displayPricing?.activate_later ? (displayPricing?.show_button && (
				<Button
					className={cl`${styles.button}`}
					onClick={() => onSubmit(item)}
					type="button"
				>
					{t('subscriptions:subscribe_button_text')}
				</Button>
			)
			) : (
				<div className={styles.activate}>
					<Button
						className={cl`${styles.button}`}
						onClick={() => setShowActivateModal(true)}
						type="button"
					>
						{t('subscriptions:activate_button_text')}
					</Button>
				</div>
			)}
		</div>
	);
}

export default Subscribe;
