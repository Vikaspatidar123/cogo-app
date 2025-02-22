/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef } from 'react';

import OtpInput from './components/OtpInput';
import useTimer from './hooks/useTimer';
import styles from './styles.module.css';

function OTPLayout({
	otpLength,
	setOtpValue = () => { },
	loading = false,
	sendOtp = () => { },
}) {
	const { t } = useTranslation(['common']);

	const useImperativeHandleRef = useRef({});

	const timer = useTimer({ durationInSeconds: 30 });

	useEffect(() => timer.start(), []);

	return (
		<div className={styles.container}>
			<OtpInput
				otpLength={otpLength}
				inputSize="md"
				onChange={(value) => {
					setOtpValue(value.length === otpLength ? `${value}` : '');
				}}
				ref={useImperativeHandleRef}
			/>

			<div className={styles.resend_otp_container}>
				<div className={styles.timer_text}>
					{timer.minutes}
					{' '}
					:
					{' '}
					{timer.seconds}
				</div>

				<Button
					type="button"
					themeType="linkUi"
					onClick={() => {
						sendOtp({ timer });
						useImperativeHandleRef.current?.resetOtp();
					}}
					disabled={timer.isTimeRemaining || loading}
				>
					{t('common:rightPanel_tabs_mobile_resendOtpButton_label')}
				</Button>
			</div>
		</div>
	);
}

export default OTPLayout;
