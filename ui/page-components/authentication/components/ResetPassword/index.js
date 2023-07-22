import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import PasswordValidator from '../../../../commons/components/PasswordValidator';
import useResetPassword from '../../hooks/useResetPassword';
import LayoutHelp from '../common/LayoutHelp';
import LayoutLogo from '../common/LayoutLogo';
import TogglePasswordView from '../common/TogglePasswordView';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';
import patterns from '@/ui/commons/configurations/patterns';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ResetPassword() {
	const { t } = useTranslation(['authentication']);
	const translationKey = 'authentication:resetPassword';

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { handleSubmit, control, watch, formState: { errors, isValid } } = useForm();

	const formValues = watch();

	const { password, confirm_password } = formValues;

	const {
		onResetPassword = () => {},
		loading = false,
		customErrors = '',
	} = useResetPassword({ password, confirm_password });

	return (
		<div
			className={styles.authentication_layout}
			style={{
				backgroundImage: `url(${GLOBAL_CONSTANTS.image_url.neo_background_image})`,
			}}
		>
			<LayoutLogo />

			<div className={styles.card_container}>
				<div className={styles.card}>
					<h1 className={styles.card_heading}>{t(`${translationKey}_title`)}</h1>
					<h3 className={styles.card_sub_heading}>{t(`${translationKey}_subtitle`)}</h3>

					<form onSubmit={handleSubmit(onResetPassword)} className={styles.form_container}>

						<div className={styles.label}>{t(`${translationKey}_password_label`)}</div>
						<InputController
							control={control}
							name="password"
							type={showPassword ? 'text' : 'password'}
							suffix={(
								<TogglePasswordView
									showPassword={showPassword}
									setShowPassword={setShowPassword}
								/>
							)}
							placeholder={t(`${translationKey}_password_placeholder`)}
							rules={{
								required : t(`${translationKey}_password_error`),
								pattern  : {
									value   : patterns.PASSWORD.PASSWORD_PATTERN,
									message : t(`${translationKey}_password_error_1`),
								},
							}}
						/>
						<span className={styles.errors}>
							{errors?.password?.message || ''}
						</span>

						<div className={styles.label}>{t(`${translationKey}_confirmPassword_label`)}</div>
						<InputController
							control={control}
							name="confirm_password"
							type={showConfirmPassword ? 'text' : 'password'}
							suffix={(
								<TogglePasswordView
									showPassword={showConfirmPassword}
									setShowPassword={setShowConfirmPassword}
								/>
							)}
							placeholder={t(`${translationKey}_confirmPassword_placeholder`)}
							rules={{
								required: t(`${translationKey}_confirmPassword_error`),
							}}
						/>
						<span className={styles.errors}>
							{errors?.confirm_password?.message || customErrors }
						</span>

						<div className={styles.validator}>
							<PasswordValidator password={password} />
						</div>

						<Button
							disabled={!isEmpty(customErrors) || !isValid}
							loading={loading}
							className={styles.submit_button}
							type="submit"
							size="lg"
						>
							{t(`${translationKey}_submit_button`)}
						</Button>
					</form>
				</div>
			</div>

			<LayoutHelp />
		</div>
	);
}

export default ResetPassword;
