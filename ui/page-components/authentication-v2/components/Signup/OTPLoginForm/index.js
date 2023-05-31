import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useLoginOtpAuthentication from '../../../hooks/useLoginOtpAuthentication';

import styles from './styles.module.css';

import OTPLayout from '@/packages/forms/Business/OTPLayout';

function OTPLoginForm({ otpId = '', mobileNumber = {}, setshowOtpForm = () => {}, resendOtp = () => {} }) {
	const [otpValue, setOtpValue] = useState('');

	const email = 'test@cogoport.com';

	const {
		onLoginWithOtp,
		loginLoading = false,
	} = useLoginOtpAuthentication({
		mobileNumber,
		otpId,
		otpValue,
	});

	return (
		<div className={styles.otp_container}>
			<span onClick={() => setshowOtpForm(false)} role="presentation">
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
				loading={loginLoading}
				sendOtp={resendOtp}
			/>

			<Button
				loading={loginLoading}
				size="lg"
				className={styles.submit_button}
				onClick={onLoginWithOtp}
				// disabled={!otpValue}
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
					// onClick={() => onClickResendEmail(id)}
				>
					resend email.
				</span>
			</div>
		</div>
	);
}

export default OTPLoginForm;
