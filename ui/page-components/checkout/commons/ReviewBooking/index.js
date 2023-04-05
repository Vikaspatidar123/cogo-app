import styles from './styles.module.css';

function ReviewBooking() {
	return (
		<>
			<div className={styles.title}>
				Review your Booking
			</div>
			<div className={styles.tnc}>
				By placing this booking, you are agreeing to our
				<a
					className={styles.a}
					href="https://www.cogoport.com/terms-and-conditions"
					target="_blank"
					rel="noreferrer"
				>
					Terms & Conditions
				</a>
				{' and '}
				<a className={styles.a} href="https://www.cogoport.com/privacy-policy" target="_blank" rel="noreferrer">
					Privacy policy
				</a>
			</div>
		</>
	);
}

export default ReviewBooking;
