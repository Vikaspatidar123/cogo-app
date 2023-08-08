import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useLoginMobileAuthentication from '../../../hooks/useLoginMobileAuthentication';
import useLoginOtpAuthentication from '../../../hooks/useLoginOtpAuthentication';

import styles from './styles.module.css';

import OTPLayout from '@/packages/forms/Business/OTPLayout';

const OTP_LENGTH = 4;

function OTPLoginForm({ setMode = () => {}, otpId = '', mobileNumber = {} }) {
	const { t } = useTranslation(['common']);
	const translationKey = 'common:loginOtpField';

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
					width="20px"
					height="20px"
				/>
			</span>

			<h2 className={styles.card_heading}>{t(`${translationKey}_title`)}</h2>
			<h4 className={styles.card_subheading}>
				{t(`${translationKey}_subtitle`)}
				{isEmpty(mobileNumber?.number) ? (
					<>
						{' '}
						{t(`${translationKey}_subtitle_null`)}
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
				otpLength={OTP_LENGTH}
				setOtpValue={setOtpValue}
				loading={loginLoading}
				sendOtp={resendOtp}
			/>

			<Button
				loading={loginLoading}
				size="lg"
				className={styles.submit_button}
				onClick={onLoginWithOtp}
				disabled={otpValue.length !== OTP_LENGTH}
			>
				{t(`${translationKey}_submit_button`)}
			</Button>

		</div>
	);
}

export default OTPLoginForm;
