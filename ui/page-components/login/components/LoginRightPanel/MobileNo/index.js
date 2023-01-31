import { Button } from '@cogoport/components';

import styles from './styles.module.css';
import useMobileNo from './useMobileNo';

import OTPLayout from '@/packages/forms/Business/OTPLayout';
// import FormLayout from '@/temp/form/FormLayout';

const OTP_LENGTH = 4;

function MobileNo({ loginApiLoading = false, login = () => { } }) {
	const {
		controls = [],
		formProps = {},
		errors = {},
		onSubmit = () => { },
		showOtpInputs = false,
		setOtp = () => { },
		sendOtpApiLoading = false,
		onClickResendOtpButton = () => { },
	} = useMobileNo({ OTP_LENGTH, login });
	const { handleSubmit = () => { }, fields = {} } = formProps;

	const renderOtpInputs = () => {
		if (!showOtpInputs) {
			return null;
		}

		return (
			<>
				<div className={styles.otp_inputs_container}>
					<OTPLayout
						otpLength={OTP_LENGTH}
						setOtpValue={setOtp}
						loading={sendOtpApiLoading}
						sendOtp={onClickResendOtpButton}
					/>
				</div>

				<Button type="submit" className="primary lg" disabled={loginApiLoading}>
					{loginApiLoading ? 'Verifying OTP...' : 'Verify OTP'}
				</Button>
			</>
		);
	};

	return (
		<from onSubmit={handleSubmit(onSubmit)}>
			{/* <FormLayout controls={controls} fields={fields} errors={errors} /> */}

			{renderOtpInputs()}

			{!showOtpInputs && (
				<Button
					type="submit"
					className="primary lg"
					disabled={sendOtpApiLoading}
				>
					{sendOtpApiLoading ? 'Sending OTP...' : 'Get OTP'}
				</Button>
			)}
		</from>
	);
}

export default MobileNo;
