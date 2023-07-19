import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useLoginEmailAuthentication from '../../../hooks/useLoginEmailAuthentication';
import TogglePasswordView from '../../common/TogglePasswordView';

import styles from './styles.module.css';

import { useForm, InputController } from '@/packages/forms';
import { Link } from '@/packages/next';

function EmailLoginForm({ setMode = () => {} }) {
	const { t } = useTranslation(['common']);
	const translationKey = 'common:loginField';

	const [showPassword, setShowPassword] = useState(false);

	const { onSubmit = () => { }, loginLoading = false } = useLoginEmailAuthentication({ setMode });

	const { handleSubmit, formState: { errors }, control } = useForm({
		defaultValues: {
			email    : '',
			password : '',
		},
	});

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>

			<div className={styles.label}>{t(`${translationKey}_email_label`)}</div>
			<InputController
				control={control}
				name="email"
				type="email"
				placeholder={t(`${translationKey}_email_placeholder`)}
				rules={{ required: t(`${translationKey}_email_error`) }}
			/>
			<span className={styles.errors}>
				{errors?.email?.message || ' '}
			</span>

			<div className={styles.label}>{t(`${translationKey}_password_label`)}</div>
			<InputController
				control={control}
				name="password"
				type={showPassword ? 'text' : 'password'}
				suffix={<TogglePasswordView showPassword={showPassword} setShowPassword={setShowPassword} />}
				placeholder={t(`${translationKey}_password_placeholder`)}
				rules={{ required: t(`${translationKey}_password_error`) }}
			/>
			<span className={styles.errors}>
				{errors?.password?.message || ' '}
			</span>

			<Button
				loading={loginLoading}
				className={styles.submit_button}
				type="submit"
				size="lg"
			>
				{t(`${translationKey}_submit_button`)}
			</Button>

			<div className={styles.links}>
				<Link href="/forgot-password">{t('common:loginFooter_forgot_password')}</Link>
				<Link href="/signup">{t('common:loginFooter_signup')}</Link>
			</div>

		</form>
	);
}

export default EmailLoginForm;
