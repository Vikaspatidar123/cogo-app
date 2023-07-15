import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useEmailVerification from '../../../hooks/useEmailVerification';
import useSignupOtpAuthentication from '../../../hooks/useSignupOtpAuthentication';

import styles from './styles.module.css';

import OTPLayout from '@/packages/forms/Business/OTPLayout';

const OTP_LENGTH = 4;

function OTPSignupForm({ userDetails = {}, setMode = () => {}, t = () => {} }) {
	const translationKey = 'authentication:signupOtp';

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

			<h2 className={styles.card_heading}>{t(`${translationKey}_title`)}</h2>

			<h4 className={styles.card_subheading}>
				{t(`${translationKey}_subtitle`)}
				{isEmpty(mobile_number?.number) ? (
					<>
						{' '}
						{t(`${translationKey}_subtitle_null`)}
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
				{t(`${translationKey}_submitButton_label`)}
			</Button>

			<div className={styles.footer_container}>
				{t(`${translationKey}_footer_1`)}
				{'  '}

				{email ? (
					<>
						at
						{'  '}
						<b>{email}</b>
					</>
				) : ('')}

				{'  '}
				{t(`${translationKey}_footer_2`)}
				<br />
				<br />
				{t(`${translationKey}_footer_3`)}
				{'  '}

				<h4
					className={styles.resend_mail_button}
					role="presentation"
					onClick={() => onClickResendEmail(id)}
				>
					{t(`${translationKey}_footer_resend_mail`)}
				</h4>
			</div>
		</div>
	);
}

export default OTPSignupForm;
