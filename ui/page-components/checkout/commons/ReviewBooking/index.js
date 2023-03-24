import styles from './styles.module.css';

function ReviewBooking() {
	return (
		<>
			<div className={styles.title}>
				Review your Booking
			</div>
			<div className={styles.tnc}>
				By placing this booking, you are agreeing to our
				<div className={styles.a} href="https://www.cogoport.com/terms-and-conditions" target="_blank">
					Terms & Conditions
				</div>
				{' and '}
				<div className={styles.a} href="https://www.cogoport.com/privacy-policy" target="_blank">
					Privacy policy
				</div>
			</div>
		</>
	);
}

export default ReviewBooking;
