import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useLoginMobileAuthentication from '../../../hooks/useLoginMobileAuthentication';
import useLoginOtpAuthentication from '../../../hooks/useLoginOtpAuthentication';

import styles from './styles.module.css';

import OTPLayout from '@/packages/forms/Business/OTPLayout';

function OTPLoginForm({ setMode = () => {}, otpId = '', mobileNumber = {} }) {
	const [otpValue, setOtpValue] = useState('');

	const {
		onLoginWithOtp,
		loginLoading = false,
	} = useLoginOtpAuthentication({
		mobileNumber,
		otpId,
		otpValue,
		setMode,
	});

	const {
		resendOtp = () => {},
	} = useLoginMobileAuthentication({ mobileNumber });

	return (
		<div className={styles.otp_container}>
			<span onClick={() => setMode('login_tabs')} role="presentation" className={styles.back_button}>
				<IcMArrowBack
					width="1.2rem"
					height="1.2rem"
				/>
			</span>

			<h2 className={styles.card_heading}>Verify your mobile</h2>
			<h4 className={styles.card_subheading}>
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
			</h4>

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
				disabled={otpValue.length !== 6}
			>
				Verify
			</Button>

		</div>
	);
}

export default OTPLoginForm;
