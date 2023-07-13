import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import useResetUserPassword from '../hooks/useResetUserPassword';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';

function ForgotPasswordForm({ setSentMail, setEmailId }) {
	const { t } = useTranslation(['common', 'forgotPassword']);

	const {
		handleSubmit,
		formState: { errors },
		control,
		watch,
	} = useForm();
	const { resetUserPassword, resetPasswordLoading } = useResetUserPassword(
		setSentMail,
		setEmailId,
	);

	const formValues = watch();

	const handleClick = () => {
		setEmailId(formValues);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.header_span}>{t('forgotPassword:forgot_password_text_1')}</span>
				{t('forgotPassword:forgot_password_text_2')}
			</div>
			<div className={styles.body}>
				<form
					className={styles.form_container}
					onSubmit={handleSubmit(resetUserPassword)}
				>
					<div className={styles.input_controller}>
						<InputController
							control={control}
							name="email"
							type="email"
							placeholder={t('forgotPassword:rightPanel_tabs_email_title')}
							rules={{ required: t('forgotPassword:rightPanel_email_is_required') }}
						/>
						{errors.email ? (
							<span className={styles.errors}>{errors.email.message}</span>
						) : null}
					</div>
					<div className={styles.button_container}>
						<Button
							themeType="accent"
							type="submit"
							disabled={resetPasswordLoading}
							onClick={handleClick}
						>
							{t('forgotPassword:rightPanel_forgotPasswordButton_label')}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ForgotPasswordForm;
