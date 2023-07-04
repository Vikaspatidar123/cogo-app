import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function Charges({
	formData = {},
	isQuotaLeft = false,
	dtCurrency,
	quotaValue = 0,
	gstAmount = 0,
	amount = 0,
	totalAmount = 0,
}) {
	const { freightCharge = '', incotermCharges = [], currency = '' } = formData || {};
	const { t } = useTranslation(['dutiesTaxesCalculator']);

	return (
		<div className={styles.scroll_content}>
			<div className={styles.container}>
				<div>
					<div className={styles.heading}>{t('dutiesTaxesCalculator:form_pay_charge_title')}</div>
					{freightCharge > 0 && (
						<div className={styles.service}>
							<div className={styles.text}>{t('dutiesTaxesCalculator:form_pay_charge_freight')}</div>
							<div className={styles.price}>
								{formatAmount({
									amount  : freightCharge,
									currency,
									options : {
										notation : 'standard',
										style    : 'currency',
									},
								})}
							</div>
						</div>
					)}
					{(incotermCharges || []).map(
						({ name, value }) => value > 0 && (
							<div className={styles.service}>
								<div className={styles.text}>{name}</div>
								<div className={styles.price}>
									{formatAmount({
										amount  : value,
										currency,
										options : {
											notation : 'standard',
											style    : 'currency',
										},
									})}

								</div>
							</div>
						),
					)}
				</div>
			</div>
			<div className={styles.container}>
				<div>
					<div className={styles.heading}>{t('dutiesTaxesCalculator:form_pay_charge_summary')}</div>
					{!isQuotaLeft && (
						<>
							<div className={styles.service}>
								<div className={styles.text}>{t('dutiesTaxesCalculator:form_pay_charge_service')}</div>
								<div className={styles.price}>
									{formatAmount({
										amount,
										currency : dtCurrency,
										options  : {
											notation : 'standard',
											style    : 'currency',
										},
									})}

								</div>
							</div>
							<div className={styles.service}>
								<div className={styles.text}>{t('dutiesTaxesCalculator:form_pay_charge_fee')}</div>
								<div className={styles.price}>
									{formatAmount({
										amount   : gstAmount,
										currency : dtCurrency,
										options  : {
											notation : 'standard',
											style    : 'currency',
										},
									})}
								</div>
							</div>
							<div className={cl`${styles.service} ${styles.total}`}>
								<div className={styles.text}>{t('dutiesTaxesCalculator:form_pay_charge_amount')}</div>
								<div className={styles.price}>
									{formatAmount({
										amount   : totalAmount,
										currency : dtCurrency,
										options  : {
											notation : 'standard',
											style    : 'currency',
										},
									})}
								</div>
							</div>
						</>
					)}
					{isQuotaLeft && (
						<>
							<div className={styles.service}>
								<div className={styles.text}>
									{t('dutiesTaxesCalculator:form_pay_charge_available_quota')}
								</div>
								<div className={styles.price}>{quotaValue}</div>
							</div>
							<div className={styles.border} />
							<div className={styles.service}>
								<div className={styles.text}>
									{t('dutiesTaxesCalculator:form_pay_charge_deduct_quota')}
								</div>
								<div className={styles.price}>- 1</div>
							</div>
							<div className={styles.border} />

							<div className={styles.service}>
								<div className={styles.total}>
									{t('dutiesTaxesCalculator:form_pay_charge_remain_quota')}
								</div>
								<div className={styles.price}>{quotaValue - 1}</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
export default Charges;
