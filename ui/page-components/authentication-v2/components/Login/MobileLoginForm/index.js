import { Button } from '@cogoport/components';
import { useEffect, useState } from 'react';

import { checkMobileInput } from '../../../utils/checkMobileInput';

import styles from './styles.module.css';

import { useForm, MobileNumberSelectController } from '@/packages/forms';

function MobileLoginForm({ onSendOtp = () => {}, otpLoading = false }) {
	const { handleSubmit, control, watch } = useForm();

	const [customError, setCustomError] = useState('');

	const formValues = watch();

	useEffect(() => {
		const hasValues = checkMobileInput(formValues);

		if (hasValues) {
			setCustomError('');
		}
	}, [formValues]);

	const onOtpApiCall = (values, e) => {
		const hasValues = checkMobileInput(values);

		if (hasValues) {
			setCustomError('');
			onSendOtp(values, e);
		} else {
			setCustomError('Mobile Details are required.');
		}
	};

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onOtpApiCall)}>
			<div className={styles.label}>Mobile Number</div>
			<div>
				<MobileNumberSelectController
					control={control}
					name="mobile_number"
					type="mobile-number-select"
					placeholder="Enter your Number"
					rules={{ required: 'Mobile Number is required.' }}
				/>
				<div className={styles.errors}>
					{customError || ''}
				</div>
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
				<a href="/v2/signup">Don&#39;t have an Account?</a>
			</div>
		</form>
	);
}

export default MobileLoginForm;
