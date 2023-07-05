import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';
import formatAmount from '@/ui/commons/utils/formatAmount';

const CURRENCY_OPTIONS = {
	notation              : 'standard',
	style                 : 'currency',
	currencyDisplay       : 'symbol',
	maximumFractionDigits : 2,
};

function Charges({ quotaValue = 0, isQuotaLeft = false, getPrice }) {
	const geo = getGeoConstants();
	const DEFAULT_CURRENCY = geo.country.currency.code;

	const { t } = useTranslation(['importExportControls']);

	const { amount = 0, gstAmount = 0, totalAmount = 0, currency = DEFAULT_CURRENCY } = getPrice();

	return (
		<div>
			{isQuotaLeft ? (
				<div>
					<div className={cl`${styles.avaliable} ${styles.row}`}>
						<div>{t('importExportControls:checkout_charge_quota_title')}</div>
						<div>{quotaValue}</div>
					</div>
					<div className={styles.row}>
						<div>{t('importExportControls:checkout_charge_quota_deduct')}</div>
						<div>-1</div>
					</div>
					<div className={cl`${styles.total} ${styles.row}`}>
						<div>{t('importExportControls:checkout_charge_quota_remain')}</div>
						<div className={styles.value}>{quotaValue - 1}</div>
					</div>
				</div>
			) : (
				<div>
					<div className={cl`${styles.avaliable} ${styles.row}`}>
						<div>{t('importExportControls:checkout_charge_services')}</div>
						<div>
							{formatAmount({
								amount,
								currency,
								options: CURRENCY_OPTIONS,
							})}
						</div>
					</div>
					<div className={styles.row}>
						<div>{t('importExportControls:checkout_charge_fee')}</div>
						<div>
							{formatAmount({
								amount  : gstAmount,
								currency,
								options : CURRENCY_OPTIONS,
							})}
						</div>
					</div>
					<div className={cl`${styles.total} ${styles.row}`}>
						<div>{t('importExportControls:checkout_charge_amount')}</div>
						<div className={styles.value}>
							{formatAmount({
								amount  : totalAmount,
								currency,
								options : CURRENCY_OPTIONS,
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Charges;
