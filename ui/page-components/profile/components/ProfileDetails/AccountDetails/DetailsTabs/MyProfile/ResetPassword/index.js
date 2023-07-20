import { Button } from '@cogoport/components';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';
import useResetPassword from './useResetPassword';

import { InputController } from '@/packages/forms';
import PasswordValidator from '@/ui/commons/components/PasswordValidator';

function ResetPassword({
	setShowPasswordModal = () => {},
	refetch = () => {},
}) {
	const { t } = useTranslation(['settings']);

	const {
		fields = [],
		formProps = {},
		errors = {},
		onSubmit = () => {},
		onErrors = () => {},
		loading = false,
	} = useResetPassword({
		setShowPasswordModal,
		refetch,
	});

	const { handleSubmit = () => {}, getValues = () => {}, control } = formProps;
	const { password = '' } = getValues();
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div className={styles.heading_title}>{t('settings:personal_information_label_6')}</div>
				<div className={styles.heading_sub_title}>
					{t('settings:reset_password_text_1')}
				</div>
			</div>
			{fields.map((field) => (
				<div key={field?.name}>
					<div>{field.label}</div>
					<InputController {...field} control={control} />
					<div className={styles.message}>
						{errors[field?.name]?.message || errors[field?.name]?.type}
						{' '}
					</div>
				</div>
			))}

			<PasswordValidator password={password} />
			<div className={styles.footer}>
				<Button
					onClick={handleSubmit(onSubmit, onErrors)}
					disabled={loading}
					loading={loading}
					type="submit"
				>
					{t('settings:reset_password_button_label_1')}
				</Button>
				<Button
					onClick={() => setShowPasswordModal(false)}
					themeType="tertiary"
					type="button"
				>
					{t('settings:edit_or_add_button_label_1')}
				</Button>
			</div>
		</div>
	);
}

export default ResetPassword;
