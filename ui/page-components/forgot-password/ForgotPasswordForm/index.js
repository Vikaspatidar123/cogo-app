import { Button } from '@cogoport/components';
import React from 'react';

import useResetUserPassword from '../hooks/useResetUserPassword';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';

function ForgotPasswordForm({ setSentMail, setEmailId }) {
	const {
		handleSubmit, formState: { errors }, control, watch,
	} = useForm();
	const { resetUserPassword, resetPasswordLoading } = useResetUserPassword(setSentMail, setEmailId);

	const formValues = watch();

	const handleClick = () => {
		setEmailId(formValues);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.header_span}>Forgot Passowrd?</span>
				Let's help you out
			</div>
			<div className={styles.body}>
				<form className={styles.form_container} onSubmit={handleSubmit(resetUserPassword)}>
					<div className={styles.input_controller}>
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
					</div>
					<div className={styles.button_container}>
						<Button themeType="accent" type="submit" disabled={resetPasswordLoading} onClick={handleClick}>
							SEND EMAIL TO RESET PASSWORD
						</Button>
					</div>
				</form>
			</div>

		</div>
	);
}

export default ForgotPasswordForm;
