import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';
import useOtpForm from './useOtpForm';
import { useTranslation } from 'next-i18next';

import OTPLayout from '@/packages/forms/Business/OTPLayout';

const OTP_LENGTH = 4;

function OtpForm({ userDetails = {} }) {
	const { t } = useTranslation(['common']);

	const [otpValue, setOtpValue] = useState('');

	const {
		loading = false,
		onClickLoginUserWithMobileNo = () => { },
		sendOtpLoading = false,
		sendOtp = () => { },
	} = useOtpForm({ userDetails, otpValue });

	return (
		<div className={styles.form_container}>
			<div className={styles.input_container}>
				<OTPLayout
					otpLength={OTP_LENGTH}
					setOtpValue={setOtpValue}
					loading={sendOtpLoading}
					sendOtp={sendOtp}
				/>

				<Button
					onClick={onClickLoginUserWithMobileNo}
					disabled={loading || !otpValue.length}
				>
					{t('common:rightPanel_tabs_mobile_verifyOtpButton_label')}
				</Button>
			</div>
		</div>
	);
}

export default OtpForm;
