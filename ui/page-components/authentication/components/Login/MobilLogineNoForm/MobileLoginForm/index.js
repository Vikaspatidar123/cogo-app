import { Button } from '@cogoport/components';

import OtpForm from '../OtpForm';

import styles from './styles.module.css';

import { MobileNumberSelectController } from '@/packages/forms';
// import patterns from '@/ui/commons/configurations/patterns';
import useMobileNoForm from '@/ui/page-components/authentication/hooks/useMobileNoForm';

const RULES = {
	// pattern: {
	// 	value   : /^[0-9]{10}$/,
	// 	message : 'Invalid mobile number',
	// },
	required: 'Please enter mobile no',
};

function MobileLoginForm() {
	const {
		userDetails = {},
		onSubmit = () => { },
		loading = false,
		showOtpForm,
		formHook,
	} = useMobileNoForm();

	const { handleSubmit, register, formState: { errors }, control } = formHook;

	if (showOtpForm) {
		return <OtpForm userDetails={userDetails} />;
	}

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.input_container}>
				<MobileNumberSelectController
					control={control}
					name="mobile_number"
					placeholder="Mobile Number"
					mobileSelectRef={{ ...register('mobile_number', RULES) }.ref}
				/>
				{errors.mobile_number && (
					<span className={styles.errors}>
						{errors.mobile_number.message}
					</span>
				)}
				<br />

				<Button
					loading={loading}
					className={styles.submit_button}
					type="submit"
					size="lg"
				>
					GET OTP
				</Button>

			</div>

		</form>
	);
}
export default MobileLoginForm;
