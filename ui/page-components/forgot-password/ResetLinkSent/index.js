import { Button } from '@cogoport/components';
import { IcCSendEmail } from '@cogoport/icons-react';
import React from 'react';

import useResetUserPassword from '../hooks/useResetUserPassword';

import styles from './styles.module.css';

function ResetLinkSent({ emailId }) {
	const { resetUserPassword, resetPasswordLoading } = useResetUserPassword();

	const handleClick = () => {
		resetUserPassword(emailId);
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.header_span}>Reset Link Sent</span>
				A link has
				been sent to your Email ID
			</div>
			<div className={styles.icon_container}>
				<IcCSendEmail className={styles.icon} />
			</div>
			<div className={styles.text}>
				Please click on the password reset link sent to
				<span className={styles.text_span}>{emailId}</span>
			</div>
			<div className={styles.card}>
				<div className={styles.card_header}>Please Note:</div>
				<div>
					<ul>
						<li>Please be sure that the Email ID you entered is correct.</li>
						<li>
							Please wait for some time as your email provider can be a little
							slow some times.
						</li>
						<li>
							Please check your spam inbox if you are still unable to receive
							the email.
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.footer}>
				{'Didn \'t receive the password reset link?'}
				<Button
					themeType="tertiary"
					className={styles.button}
					onClick={handleClick}
					loading={resetPasswordLoading}
				>
					RESEND RESET EMAIL
				</Button>
			</div>
		</div>
	);
}

export default ResetLinkSent;
