import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import OtpForm from '../OtpForm';

import styles from './styles.module.css';

import { MobileNumberSelectController } from '@/packages/forms';
import useMobileNoForm from '@/ui/page-components/authentication/hooks/useMobileNoForm';

function MobileLoginForm() {
	const { t } = useTranslation(['common']);

	const RULES = {
		required: `${t('common:rightPanel_enter_mobile_number')}`,
	};

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
					placeholder={t('common:rightPanel_tabs_mobile_controls_mobile_label')}
					mobileSelectRef={{ ...register('mobile_number', RULES) }.ref}
				/>
				{errors.mobile_number && (
					<span className={styles.errors}>
						{errors.mobile_number.message || errors.mobile_number.type}
					</span>
				)}
				<br />

				<Button
					loading={loading}
					className={styles.submit_button}
					type="submit"
					size="lg"
				>
					{t('common:rightPanel_tabs_mobile_getOtpButton_label')}
				</Button>

			</div>

		</form>
	);
}
export default MobileLoginForm;
