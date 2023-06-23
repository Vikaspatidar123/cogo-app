import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useEmailVerification from '../../../hooks/useEmailVerification';
import useSignupOtpAuthentication from '../../../hooks/useSignupOtpAuthentication';

import styles from './styles.module.css';

import OTPLayout from '@/packages/forms/Business/OTPLayout';

const OTP_LENGTH = 4;

function OTPSignupForm({ userDetails = {}, setMode = () => {} }) {
	const { id = '', mobile_number = {}, email = '' } = userDetails;
	const [otpValue, setOtpValue] = useState('');

	const {
		onSignupWithOtp = () => {},
		signupLoading = false,
		resendLoading = false,
		resendOtp = () => {},
	} = useSignupOtpAuthentication({
		otpValue,
		setMode,
		userDetails,
	});

	const { onClickResendEmail } = useEmailVerification();

	return (
		<div className={styles.otp_container}>

			<span onClick={() => setMode('signup_form')} role="presentation" className={styles.back_button}>
				<IcMArrowBack
					width="20px"
					height="20px"
				/>
			</span>

			<h2 className={styles.card_heading}>Verify your mobile</h2>

			<h4 className={styles.card_subheading}>
				Verification code is sent to
				{isEmpty(mobile_number?.number) ? (
					<>
						{' '}
						the mobile number.
					</>
				) : (
					<>
						{' '}
						{mobile_number?.country_code}
						{' '}
						{mobile_number?.number}
					</>
				)}
			</h4>

			<OTPLayout
				otpLength={OTP_LENGTH}
				setOtpValue={setOtpValue}
				loading={resendLoading}
				sendOtp={resendOtp}
			/>

			<Button
				loading={signupLoading}
				size="lg"
				className={styles.submit_button}
				onClick={onSignupWithOtp}
				disabled={otpValue.length !== OTP_LENGTH}
			>
				Verify
			</Button>

			<div className={styles.footer_container}>
				Please check your email
				{'  '}

				{email ? (
					<>
						at
						{'  '}
						<b>{email}</b>
					</>
				) : ('')}

				{'  '}
				and follow the instructions to
				{' '}
				<b>verify</b>
				{' '}
				your account.
				<br />
				<br />
				If you haven&#39;t received the email within a few minutes, please check your spam folder or
				{'  '}

				<h4
					className={styles.resend_mail_button}
					role="presentation"
					onClick={() => onClickResendEmail(id)}
				>
					resend email.
				</h4>
			</div>
		</div>
	);
}

export default OTPSignupForm;
