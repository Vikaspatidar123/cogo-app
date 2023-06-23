import { Button } from '@cogoport/components';

import useLoginMobileAuthentication from '../../../hooks/useLoginMobileAuthentication';
import useMobileLoginForm from '../../../hooks/useMobileLoginForm';

import styles from './styles.module.css';

import { useForm, MobileNumberSelectController } from '@/packages/forms';

function MobileLoginForm({
	setMode = () => {},
	setMobileNumber = () => {},
	setOtpId = () => {},
	mobileNumber = {},
}) {
	const {
		onSendOtp = () => {},
		otpLoading = false,
	} = useLoginMobileAuthentication({ setMode, setMobileNumber, setOtpId, mobileNumber });

	const { handleSubmit, control, watch, setValue } = useForm();

	const formValues = watch();

	const {
		customError = '',
		onOtpApiCall = () => {},
	} = useMobileLoginForm({ formValues, onSendOtp, setValue });

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onOtpApiCall)}>

			<div className={styles.label}>Mobile Number</div>
			<MobileNumberSelectController
				control={control}
				name="mobile_number"
				placeholder="Enter your Mobile Number"
				rules={{ required: 'Mobile Number is required.' }}
			/>
			<div className={styles.errors}>
				{customError || ''}
			</div>

			<Button
				loading={otpLoading}
				className={styles.submit_button}
				type="submit"
				size="lg"
			>
				Get OTP
			</Button>

			<div className={styles.links}>
				<a href="/signup">Create a New Account</a>
			</div>
		</form>
	);
}

export default MobileLoginForm;
