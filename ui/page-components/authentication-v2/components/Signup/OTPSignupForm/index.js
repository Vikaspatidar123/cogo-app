import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useEmailVerification from '../../../hooks/useEmailVerification';
import useSignupOtpAuthentication from '../../../hooks/useSignupOtpAuthentication';

import styles from './styles.module.css';

import OTPLayout from '@/packages/forms/Business/OTPLayout';

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
					width="1.2rem"
					height="1.2rem"
				/>
			</span>

			<div className={styles.card_heading}>Verify your mobile</div>

			<div className={styles.card_subheading}>
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
			</div>

			<OTPLayout
				otpLength={6}
				setOtpValue={setOtpValue}
				loading={resendLoading}
				sendOtp={resendOtp}
			/>

			<Button
				loading={signupLoading}
				size="lg"
				className={styles.submit_button}
				onClick={onSignupWithOtp}
				disabled={otpValue.length !== 6}
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

				<span
					className={styles.resend_mail_button}
					role="presentation"
					onClick={() => onClickResendEmail(id)}
				>
					resend email.
				</span>
			</div>
		</div>
	);
}

export default OTPSignupForm;
