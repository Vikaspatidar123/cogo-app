import { Button } from '@cogoport/components';
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
	const useImperativeHandleRef = useRef({});

	const timer = useTimer({ durationInSeconds: 30 });

	useEffect(() => timer.start(), []);

	return (
		<div className={styles.container}>
			<OtpInput
				otpLength={otpLength}
				inputSize="lg"
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
					className="primary md text"
					onClick={() => {
						sendOtp({ timer });

						useImperativeHandleRef.current?.resetOtp();
					}}
					disabled={timer.isTimeRemaining || loading}
				>
					Resend OTP
				</Button>
			</div>
		</div>
	);
}

export default OTPLayout;
