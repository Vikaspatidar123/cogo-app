import { Button } from '@cogoport/components';
import { IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useLoginEmailAuthentication from '../../../hooks/useLoginEmailAuthentication';

import styles from './styles.module.css';

import { useForm, InputController } from '@/packages/forms';

function EmailLoginForm({ setMode = () => {} }) {
	const [showPassword, setShowPassword] = useState(false);
	const { onSubmit = () => {}, loginLoading = false } = useLoginEmailAuthentication({ setMode });
	const { handleSubmit, formState: { errors }, control } = useForm();

	const renderSuffix = () => {
		if (!showPassword) {
			return <IcMEyeopen className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
		}
		return <IcMEyeclose className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
	};

	return (
		<form className={styles.form_container} onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
			<div className={styles.label}>Email address</div>
			<InputController
				control={control}
				name="email"
				type="email"
				placeholder="Enter your Email"
				rules={{ required: 'Email is required.' }}
			/>
			<span className={styles.errors}>
				{errors?.email?.message || ' '}
			</span>

			<div className={styles.label}>Password</div>
			<InputController
				control={control}
				name="password"
				type={showPassword ? 'text' : 'password'}
				suffix={renderSuffix()}
				placeholder="Enter your Password"
				rules={{ required: 'Password is required.' }}
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
				Login
			</Button>

			<div className={styles.links}>
				<a href="/v2/forgot-password">Forgot Password?</a>
				<a href="/v2/signup">Create a New Account</a>
			</div>
		</form>
	);
}

export default EmailLoginForm;
