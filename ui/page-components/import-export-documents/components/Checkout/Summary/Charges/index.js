import { cl } from '@cogoport/components';

import styles from '../styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function Charges({ quotaValue = 0, isQuotaLeft = false, getPrice }) {
	const { amount = 0, gstAmount = 0, totalAmount = 0, currency = 'INR' } = getPrice();
	return (
		<>
			{isQuotaLeft && (
				<div>
					<div className={cl`${styles.row} ${styles.avaliable}`}>
						<div>Available Premium Services Quota</div>
						<div>{quotaValue}</div>
					</div>
					<div className={styles.row}>
						<div>Quota deducted</div>
						<div>-1</div>
					</div>
					<div className={cl`${styles.row} ${styles.total}`}>
						<div>Remaining Quota</div>
						<div className={styles.value}>{quotaValue - 1}</div>
					</div>
				</div>
			)}
			{!isQuotaLeft && (
				<div>
					<div className={cl`${styles.row} ${styles.avaliable}`}>
						<div>Services</div>
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
						<div>Conviences Fee</div>
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
						<div>Total Amount</div>
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
