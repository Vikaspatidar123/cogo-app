import { Button } from '@cogoport/components';
import { IcCSendEmail } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useEmailVerification from '../../hooks/useEmailVerification';
import useOtpVerification from '../../hooks/useOtpVerification';

import styles from './styles.module.css';

import OTPLayout from '@/packages/forms/Business/OTPLayout';
import OrSeparator from '@/ui/commons/components/OrSeparator';

function VerifictaionForm({ formData, userId }) {
	const OTP_LENGTH = 4;
	const [otpValue, setOtpValue] = useState('');

	const { id } = userId || {};

	const { onClickResendEmail } = useEmailVerification();

	const {
		loading = false,
		onClickVerifyLeadUserMobileNo,
		resendOtpLoading = false,
		resendOtp = () => { },
	} = useOtpVerification({
		formData,
		otpValue,
		id,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				Verify through email or phone
				<div className={styles.header_container_span}>
					You need to verify your email or phone to complete signup.
				</div>
			</div>
			<div className={styles.verification_text_container}>
				Verification code has been sent to
				{' '}
				<span className={styles.verification_text_container_bold}>+91-9987653456</span>
				{' '}
				via SMS
			</div>
			<div className={styles.mail_icon_container}>
				<IcCSendEmail width="100px" height="100px" />
			</div>
			<div className={styles.otp_container}>
				<OTPLayout
					otpLength={OTP_LENGTH}
					setOtpValue={setOtpValue}
					loading={resendOtpLoading}
					sendOtp={resendOtp}
				/>
			</div>
			<div className={styles.button_container}>
				<Button
					disabled={loading || !otpValue.length}
					onClick={onClickVerifyLeadUserMobileNo}
					size="lg"
				>
					CONFIRM
				</Button>
			</div>
			<OrSeparator />
			<div className={styles.footer_container}>
				An email with a verification link has been sent to
				<br />
				<span className={styles.footer_container_span}>testing@gmail.com.</span>
				<br />
				<span className={styles.footer_container_span}>Click on the link to verify.</span>
				<br />
				If you have not received the email within a few minutes,
				<br />
				please check your spam folder or click on
				<button
					className={styles.resend_mail_button}
					onClick={() => onClickResendEmail(id)}
				>
					resend email
				</button>
			</div>
		</div>
	);
}

export default VerifictaionForm;
