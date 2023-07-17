import { Button } from '@cogoport/components';
import { IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useLoginEmailAuthentication from '../../../hooks/useLoginEmailAuthentication';

import styles from './styles.module.css';

import { useForm, InputController } from '@/packages/forms';

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

	const renderSuffix = (show, setShow) => {
		const Icon = show ? IcMEyeclose : IcMEyeopen;
		return <Icon className={styles.show_password} onClick={() => setShow(!show)} />;
	};

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
				suffix={renderSuffix(showPassword, setShowPassword)}
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
				<a href="/forgot-password">{t('common:loginFooter_forgot_password')}</a>
				<a href="/signup">{t('common:loginFooter_signup')}</a>
			</div>

		</form>
	);
}

export default EmailLoginForm;
