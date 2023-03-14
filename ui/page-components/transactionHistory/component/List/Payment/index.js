import styles from './styles.module.css';

import getShortFormatNumber from '@/ui/commons/utils/getShortFormatNumber';

function Payment({ paymentDetails }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Payment Details</div>
			<div className={styles.section}>
				<div className={styles.styled_row}>
					<div className={styles.styled_col}>
						<div className="title">Payment Amount</div>
					</div>
					<div className={styles.styled_col}>
						<div className="title">Payment Mode</div>
					</div>
					<div className={styles.styled_col}>
						<div className="title">Payment Response</div>
					</div>
				</div>
				<div className={styles.card}>
					{(paymentDetails || []).map(
						({
							id = '', amount = 0, mode = '', status = '',
						}) => (
							<div className={styles.styled_row} key={id}>
								<div className={styles.styled_col}>
									<div className="value">{getShortFormatNumber(amount, 'INR')}</div>
								</div>
								<div className={styles.styled_col}>
									<div className="value">{mode}</div>
								</div>
								<div className={styles.styled_col}>
									<div className={styles.styled_col}>{status}</div>
								</div>
							</div>
						),
					)}
				</div>
			</div>
		</div>
	);
}

export default Payment;
