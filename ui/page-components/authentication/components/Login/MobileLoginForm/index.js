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
	t = () => {},
}) {
	const translationKey = 'common:loginField';

	const {
		onSendOtp = () => {},
		otpLoading = false,
	} = useLoginMobileAuthentication({ setMode, setMobileNumber, setOtpId, mobileNumber });

	const { handleSubmit, control, watch, setValue } = useForm();

	const formValues = watch();

	const {
		customError = '',
		onOtpApiCall = () => {},
	} = useMobileLoginForm({ formValues, onSendOtp, setValue, t });

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onOtpApiCall)}>

			<div className={styles.label}>{t(`${translationKey}_mobile_label`)}</div>
			<MobileNumberSelectController
				control={control}
				name="mobile_number"
				placeholder={t(`${translationKey}_mobile_placeholder`)}
				rules={{ required: t(`${translationKey}_mobile_error`) }}
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
				{t(`${translationKey}_submit_otp_button`)}
			</Button>

			<div className={styles.links}>
				<a href="/signup">{t('common:loginFooter_signup')}</a>
			</div>
		</form>
	);
}

export default MobileLoginForm;
