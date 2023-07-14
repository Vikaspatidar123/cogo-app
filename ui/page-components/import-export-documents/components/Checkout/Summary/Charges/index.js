import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function Charges({ quotaValue = 0, isQuotaLeft = false, getPrice }) {
	const { t } = useTranslation(['importExportDoc']);

	const { amount = 0, gstAmount = 0, totalAmount = 0, currency = 'INR' } = getPrice();
	return (
		<>
			{isQuotaLeft && (
				<div>
					<div className={cl`${styles.row} ${styles.avaliable}`}>
						<div>{t('importExportDoc:checkout_charge_quota_title')}</div>
						<div>{quotaValue}</div>
					</div>
					<div className={styles.row}>
						<div>{t('importExportDoc:checkout_charge_quota_deduct')}</div>
						<div>-1</div>
					</div>
					<div className={cl`${styles.row} ${styles.total}`}>
						<div>{t('importExportDoc:checkout_charge_quota_remain')}</div>
						<div className={styles.value}>{quotaValue - 1}</div>
					</div>
				</div>
			)}
			{!isQuotaLeft && (
				<div>
					<div className={cl`${styles.row} ${styles.avaliable}`}>
						<div>{t('importExportDoc:checkout_charge_services')}</div>
						<div>
							{formatAmount({
								amount,
								currency,
								options: {
									notation : 'standard',
									style    : 'currency',
								},
							})}
						</div>
					</div>
					<div className={styles.row}>
						<div>{t('importExportDoc:checkout_charge_fee')}</div>
						<div>
							{formatAmount({
								amount  : gstAmount,
								currency,
								options : {
									notation : 'standard',
									style    : 'currency',
								},
							})}
						</div>
					</div>
					<div className={cl`${styles.row} ${styles.total}`}>
						<div>{t('importExportDoc:checkout_charge_amount')}</div>
						<div>
							{formatAmount({
								amount  : totalAmount,
								currency,
								options : {
									notation : 'standard',
									style    : 'currency',
								},
							})}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Charges;
