import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useEmailVerification from '../../../hooks/useEmailVerification';
import useSignupOtpAuthentication from '../../../hooks/useSignupOtpAuthentication';

import styles from './styles.module.css';

import OTPLayout from '@/packages/forms/Business/OTPLayout';

function OTPSignupForm({ otpId = '', userDetails = {}, setMode = () => {}, resendOtp = () => {}, id = '' }) {
	const { mobile_number: mobileNumber = {}, email = '' } = userDetails;
	const [otpValue, setOtpValue] = useState('');

	const {
		onSignupWithOtp,
		signupLoading = false,
	} = useSignupOtpAuthentication({
		setMode,
		mobileNumber,
		otpId,
		otpValue,
	});

	const { onClickResendEmail } = useEmailVerification();

	return (
		<div className={styles.otp_container}>
			<span onClick={() => setMode('signup_form')} role="presentation">
				<IcMArrowBack
					width="1.2rem"
					height="1.2rem"
					style={{ cursor: 'pointer' }}
				/>
			</span>

			<div className={styles.card_heading}>Verify your mobile</div>
			<div className={styles.card_subheading}>
				Verification code is sent to
				{isEmpty(mobileNumber?.number) ? (
					<>
						{' '}
						the mobile number.
					</>
				) : (
					<>
						{' '}
						{mobileNumber?.country_code}
						{' '}
						{mobileNumber?.number}
					</>
				)}
			</div>

			<OTPLayout
				otpLength={6}
				setOtpValue={setOtpValue}
				loading={signupLoading}
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
				and
				{' '}
				<b>create password</b>
				{' '}
				for your account.
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
