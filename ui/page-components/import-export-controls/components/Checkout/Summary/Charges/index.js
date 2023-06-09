import { cl } from '@cogoport/components';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';
import formatAmount from '@/ui/commons/utils/formatAmount';

function Charges({ quotaValue = 0, isQuotaLeft = false, getPrice }) {
	const geo = getGeoConstants();
	const DEFAULT_CURRENCY = geo.country.currency.code;

	const CURRENCY_OPTIONS = {
		notation              : 'standard',
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	};
	const {
		amount = 0,
		gstAmount = 0,
		totalAmount = 0,
		currency = DEFAULT_CURRENCY,
	} = getPrice();
	return (
		<div>
			{isQuotaLeft ? (
				<div>
					<div className={cl`${styles.avaliable} ${styles.row}`}>
						<div>Available Premium Services Quota</div>
						<div>{quotaValue}</div>
					</div>
					<div className={styles.row}>
						<div>Quota deducted</div>
						<div>-1</div>
					</div>
					<div className={cl`${styles.total} ${styles.row}`}>
						<div>Remaining Quota</div>
						<div className={styles.value}>{quotaValue - 1}</div>
					</div>
				</div>
			) : (
				<div>
					<div className={cl`${styles.avaliable} ${styles.row}`}>
						<div>Services</div>
						<div>
							{formatAmount({
								amount,
								currency,
								options: CURRENCY_OPTIONS,
							})}
						</div>
					</div>
					<div className={styles.row}>
						<div>Conviences Fee</div>
						<div>
							{formatAmount({
								amount  : gstAmount,
								currency,
								options : CURRENCY_OPTIONS,
							})}
						</div>
					</div>
					<div className={cl`${styles.total} ${styles.row}`}>
						<div>Total Amount</div>
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
