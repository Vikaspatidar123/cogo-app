import { Button } from '@cogoport/components';
import { IcMFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function RegisteredWithUs({ getCreditRequestResponse = {}, setShowSignatory = () => {} }) {
	const { approved_credit_details = {}, credit_type = 'rolling_credit' } = getCreditRequestResponse || {};

	const { amount = '', currency = '', tenure_days = 0 } = approved_credit_details || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Congratulations!
			</div>
			<div className={styles.subHeading}>
				You have successfully been registered with us!
			</div>
			<div className={styles.tentative_status}>
				<div className={styles.tentative}>
					<div className={styles.name}>
						Pay Later Limit
					</div>
					<div className={styles.value}>
						{formatAmount({
							amount,
							currency,
							options: {
								minimumFractionDigits : 0,
								maximumFractionDigits : 0,
								style                 : 'currency',
								currencyDisplay       : 'symbol',
							},
						})}
					</div>
				</div>
				<div className={styles.tentative}>
					<div className={styles.name}>
						Pay Later Tenure
					</div>
					<div className={styles.value}>
						{tenure_days}
						{' '}
						days
					</div>
				</div>
				<div className={styles.tentative}>
					<div className={styles.name}>
						Pay Later Type
					</div>
					<div className={styles.value}>
						{startCase(credit_type?.split('_')?.[0])}
					</div>
				</div>
			</div>
			<div>
				<div className={styles.point}>
					<IcMFtick fill="#849E4C" className={styles.icon} width={27} height={27} />
					<div>
						You are eligible to avail Clean Deferred Payment  upto INR
						{' '}
						{amount}
						,
						for booking logistics on Cogoport  platform with a credit cycle of
						{' '}
						{tenure_days}
						{' '}
						Days
					</div>
				</div>
				<div className={styles.point}>
					<IcMFtick fill="#849E4C" className={styles.icon} width={20} height={20} />
					<div>
						Your
						{' '}
						{tenure_days}
						{' '}
						Days tenure will start once application is approved and booking is made
					</div>
				</div>
			</div>
			<div className={styles.button_div}>
				<Button onClick={() => setShowSignatory(true)}>
					Proceed to agreement
				</Button>
			</div>
		</div>
	);
}

export default RegisteredWithUs;
