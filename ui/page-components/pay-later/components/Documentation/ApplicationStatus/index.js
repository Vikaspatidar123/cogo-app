import { STATUS } from '../../../constants/status';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function ApplicationStatus() {
	return (
		<div className={styles.wrapper}>
			{false &&			(
				<div>
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
			{true && (
				<div className={styles.tentative_status}>
					<div className={styles.tentative}>
						<div className={styles.name}>
							Tentative Limit
						</div>
						<div className={styles.value}>
							{formatAmount({
								amount   : 1000,
								currency : 'USD',
								options  : {
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
							300 days
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ApplicationStatus;
