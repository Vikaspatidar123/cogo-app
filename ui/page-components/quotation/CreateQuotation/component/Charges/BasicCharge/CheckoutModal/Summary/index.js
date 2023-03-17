import { cl } from '@cogoport/components';

import styles from './styles.module.css';

import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

function Summary({ isQuotaLeft = false, quotaValue, productInfoArr = [], chargeData = {}, serviceData = {} }) {
	const { currency } = serviceData;
	const {
		// totalAmount,
		// discountAmount,
		taxAmount,
		subTotalAmount,
		netAmount,
	} = chargeData;
	const productLength = productInfoArr.length;
	const remainingAddon = +quotaValue - +productLength;

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Summary</h3>
			{!isQuotaLeft && (
				<div>
					<div className={styles.flex_box}>
						<p>Services</p>
						<div className="price">
							{shortFormatNumber(subTotalAmount, currency, true)}

						</div>
					</div>

					<div className={styles.flex_box}>
						<p>Convenience Fee</p>
						<div className="price">{shortFormatNumber(taxAmount, currency, true)}</div>

					</div>

					<div className={cl`${styles.flex_box} ${styles.total_row}`}>
						<p className={styles.total}>Total Amount:</p>
						<div className="price">{shortFormatNumber(netAmount, currency, true)}</div>

					</div>
				</div>
			)}
			{isQuotaLeft && (
				<div>
					<div className={styles.flex_box}>
						<p>Available Premium Services Quota</p>
						<div className="price">
							{quotaValue}
						</div>
					</div>

					<div className={styles.flex_box}>
						<p>Quota deducted</p>
						-
						{productLength}
					</div>

					<div className={cl`${styles.flex_box} ${styles.total_row}`}>
						<p className={styles.total}>Total Amount:</p>
						{remainingAddon}
					</div>
				</div>
			)}
		</div>
	);
}

export default Summary;
