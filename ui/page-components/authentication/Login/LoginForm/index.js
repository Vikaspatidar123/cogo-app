import { Button } from '@cogoport/components';
import { IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useLoginAuthenticate from '../../hooks/useLoginAuthenticate';

import styles from './styles.module.css';

import { useForm, InputController } from '@/packages/forms';

function LoginForm() {
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
					placeholder="Email"
					rules={{ required: 'Email is required.' }}
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
						placeholder="Password"
						rules={{ required: 'Password is required.' }}
					/>
				</div>
				{errors.password && (
					<span className={styles.errors}>
						{errors.password.message}
					</span>
				)}

				<div className={styles.forgot}>
					<a href="/forgot-password">Forgot password</a>
				</div>

				<Button
					loading={loading}
					className={styles.submit_button}
					type="submit"
					size="lg"
				>
					Login
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
			<a href="mailto:cp.onboarding@cogoport.com" className={styles.right_footer_text}>
				If you have any trouble logging in, email here -
				<span className={styles.right_footer_text_span}> cp.onboarding@cogoport.com</span>
			</a>
		</form>
	);
}

export default LoginForm;
