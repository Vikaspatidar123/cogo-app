import { Button } from '@cogoport/components';

import OtpForm from '../OtpForm';

import styles from './styles.module.css';

import { useForm, MobileNumberSelectController } from '@/packages/forms';
import useMobileNoForm from '@/ui/page-components/authentication/hooks/useMobileNoForm';

function MobileLoginForm() {
	const { handleSubmit, formState: { errors }, control } = useForm();

	const {
		userDetails = {},
		onSubmit = () => { },
		loading = false,
		showOtpForm,
	} = useMobileNoForm({});
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
					rules={{ required: 'Mobile Number is required.' }}
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
