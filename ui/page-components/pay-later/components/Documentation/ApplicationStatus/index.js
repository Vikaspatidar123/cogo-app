import { STATUS } from '../../../constants/status';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function ApplicationStatus({ getCreditRequestResponse = {} }) {
	const { approved_credit_details = {}, cogoscore_application_status = '' } = getCreditRequestResponse || {};

	const { amount = '', currency = '', tenure_days = 0 } = approved_credit_details || {};

	return (
		<div className={styles.wrapper}>
			{['awaiting_cogoscore', 'assigned'].includes(cogoscore_application_status) && (
				<div className={styles.wrapper}>
					{STATUS.map((item) => (
						<div className={styles.container}>
							<div>
								{item.icon}
							</div>
							<div className={styles.heading}>
								{item.heading}
							</div>
							<div className={styles.subHeading}>
								{item.subHeading}
							</div>
						</div>
					))}
				</div>
			)}
			{cogoscore_application_status === 'pending_approval' && (
				<div className={styles.tentative_status}>
					<div className={styles.tentative}>
						<div className={styles.name}>
							Tentative Limit
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
							Tentative Tenure
						</div>
						<div className={styles.value}>
							{tenure_days}
							{' '}
							days
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ApplicationStatus;
