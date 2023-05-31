import styles from './styles.module.css';

function SuccessMessage({ resetUserPassword = () => {}, emailId = '' }) {
	return (
		<>
			<div className={styles.card_heading}>Password Reset Link Sent</div>
			<div className={styles.card_body}>
				Check your email
				{' '}
				<b>
					{emailId}
				</b>
				{' '}
				for a link to reset your password.
				<br />
				<br />
				Simply click on the link to proceed with resetting your password.
			</div>
			<div className={styles.info}>
				Please Note:
				<ul>
					<li>
						Please be sure that the Email ID you entered is correct.
					</li>
					<li>
						Please wait for some time as your email provider can be a little slow some times.
					</li>
					<li>
						Please check your spam inbox if you are still unable to receive the email
					</li>
				</ul>
			</div>
			<div className={styles.links}>
				Didn&#39;t receive the password reset link?
				{' '}
				<span className={styles.reset_link} onClick={resetUserPassword(emailId)} role="presentation">
					Resend Reset Email
				</span>
			</div>
		</>
	);
}

export default SuccessMessage;
