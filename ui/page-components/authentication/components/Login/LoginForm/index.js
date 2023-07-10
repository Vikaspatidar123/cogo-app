import { Button } from '@cogoport/components';
import { IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useLoginAuthenticate from '../../../hooks/useLoginAuthenticate';

import styles from './styles.module.css';

import { useForm, InputController } from '@/packages/forms';

function LoginForm() {
	const { t } = useTranslation(['common']);
	const [showPassword, setShowPassword] = useState(false);
	const { onSubmit = () => { }, loading = false } = useLoginAuthenticate();
	const { handleSubmit, formState: { errors }, control } = useForm();

	const renderSuffix = () => {
		if (!showPassword) {
			return <IcMEyeopen className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
		}
		return <IcMEyeclose className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
	};

	return (
		<form className={styles.form_container} onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
			<div className={styles.input_container}>
				<InputController
					control={control}
					name="email"
					type="email"
					placeholder={t('common:rightPanel_tabs_email_controls_email_label')}
					rules={{ required: `${t('common:rightPanel_email_is_required')}` }}
				/>
				{errors.email && (
					<span className={styles.errors}>
						{errors.email.message}
					</span>
				)}
				<br />
				<div className={styles.password_container}>
					<InputController
						control={control}
						name="password"
						type={showPassword ? 'text' : 'password'}
						suffix={renderSuffix()}
						placeholder={t('common:rightPanel_password_placeholder')}
						rules={{ required: `${t('common:rightPanel_password_is_required')}` }}
					/>
				</div>
				{errors.password && (
					<span className={styles.errors}>
						{errors.password.message}
					</span>
				)}

				<div className={styles.forgot}>
					<a href="/forgot-password">{t('common:rightPanel_tabs_email_forgotPassword')}</a>
				</div>

				<Button
					loading={loading}
					className={styles.submit_button}
					type="submit"
					size="lg"
				>
					{t('common:rightPanel_tabs_email_loginButton_label')}
				</Button>

				{/* <Button
							loading={socialLoginLoading}
							themeType="secondary"
							className={styles.submit_button}
							style={{ fontWeight: '500' }}
							onClick={onLogin}
						>
							<IcCMicrosoft />
							<p className={styles.micro}>CONTINUE WITH MICROSOFT</p>
						</Button> */}
			</div>
			{/* <a href="mailto:kanira.patel@cogoport.com" className={styles.right_footer_text}>
				{t('common:rightPanel_support_label')}
				<span className={styles.right_footer_text_span}>kanira.patel@cogoport.com</span>
			</a> */}
		</form>
	);
}

export default LoginForm;
