import { Button } from '@cogoport/components';
import { IcCSendEmail } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useEmailVerification from '../../../hooks/useEmailVerification';
import useOtpVerification from '../../../hooks/useOtpVerification';

import styles from './styles.module.css';

import OTPLayout from '@/packages/forms/Business/OTPLayout';
import OrSeparator from '@/ui/commons/components/OrSeparator';

const OTP_LENGTH = 4;

function VerifictaionForm({ formData, userDetails }) {
	const { t } = useTranslation(['common']);

	const [otpValue, setOtpValue] = useState('');
	const { id, email = '', mobile_country_code = '', mobile_number = '' } = userDetails || {};

	const { onClickResendEmail } = useEmailVerification();

	const {
		loading = false,
		onClickVerifyLeadUserMobileNo,
		resendOtpLoading = false,
		resendOtp = () => {},
	} = useOtpVerification({
		formData,
		otpValue,
		userDetails,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				{t('common:rightPanel_verification_texts_1')}
				<div className={styles.header_container_span}>
					{t('common:rightPanel_verification_texts_2')}
				</div>
			</div>
			<div className={styles.verification_text_container}>
				{t('common:rightPanel_verification_texts_3')}
				{' '}
				<span className={styles.verification_text_container_bold}>
					{mobile_country_code}
					-
					{mobile_number}
				</span>
				{' '}
				{t('common:rightPanel_verification_text_via_sms')}
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
					{t('common:rightPanel_verification_confirm_button_label')}
				</Button>
			</div>
			<OrSeparator />
			<div className={styles.footer_container}>
				{t('common:rightPanel_verification_texts_4')}
				<br />
				<span className={styles.footer_container_span}>{email}</span>
				<br />
				<span className={styles.footer_container_span}>
					{t('common:rightPanel_verification_texts_5')}
				</span>
				<br />
				{t('common:rightPanel_verification_email_texts_4')}
				<br />
				{t('common:rightPanel_verification_email_texts_5')}
				<button
					className={styles.resend_mail_button}
					onClick={() => onClickResendEmail(id)}
				>
					{t('common:rightPanel_verification_email_resendEmailButton_label')}
				</button>
			</div>
		</div>
	);
}

export default VerifictaionForm;
