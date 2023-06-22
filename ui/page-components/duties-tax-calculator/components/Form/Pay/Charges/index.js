import { cl } from '@cogoport/components';

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

	return (
		<div className={styles.scroll_content}>
			<div className={styles.container}>
				<div>
					<div className={styles.heading}>Charges</div>
					{freightCharge > 0 && (
						<div className={styles.service}>
							<div className={styles.text}>Freight Charge</div>
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
					<div className={styles.heading}>Summary</div>
					{!isQuotaLeft && (
						<>
							<div className={styles.service}>
								<div className={styles.text}>Services</div>
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
								<div className={styles.text}>Conviences Fee</div>
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
								<div className={styles.text}>Total Amount</div>
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
								<div className={styles.text}>Available Premium Services Quota</div>
								<div className={styles.price}>{quotaValue}</div>
							</div>
							<div className={styles.border} />
							<div className={styles.service}>
								<div className={styles.text}>Quota deducted</div>
								<div className={styles.price}>- 1</div>
							</div>
							<div className={styles.border} />

							<div className={styles.service}>
								<div className={styles.total}>Remaining Quota</div>
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
