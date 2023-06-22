import { Button } from '@cogoport/components';
import { IcMEyeclose, IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import PasswordValidator from '../../../../commons/components/PasswordValidator';
import useResetPassword from '../../hooks/useResetPassword';
import LayoutHelp from '../common/LayoutHelp';
import LayoutLogo from '../common/LayoutLogo';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';
import patterns from '@/ui/commons/configurations/patterns';

function ResetPassword() {
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

	const renderSuffix = (show, setShow) => {
		if (!show) {
			return <IcMEyeopen className={styles.show_password} onClick={() => setShow(!show)} />;
		}
		return <IcMEyeclose className={styles.show_password} onClick={() => setShow(!show)} />;
	};

	return (
		<div className={styles.authentication_layout}>
			<LayoutLogo />

			<div className={styles.card_container}>
				<div className={styles.card}>
					<h2 className={styles.card_heading}>Welcome back to Cogoport</h2>
					<h3 className={styles.card_sub_heading}>Let&#39;s get you a new Password</h3>

					<form onSubmit={handleSubmit(onResetPassword)} className={styles.form_container}>

						<div className={styles.label}>Password</div>
						<InputController
							control={control}
							name="password"
							type={showPassword ? 'text' : 'password'}
							suffix={renderSuffix(showPassword, setShowPassword)}
							placeholder="Type here..."
							rules={{
								required : 'Password is required.',
								pattern  : {
									value   : patterns.PASSWORD.PASSWORD_PATTERN,
									message : 'Password is invalid.',
								},
							}}
						/>
						<span className={styles.errors}>
							{errors?.password?.message || ''}
						</span>

						<div className={styles.label}>Confirm Password</div>
						<InputController
							control={control}
							name="confirm_password"
							type={showConfirmPassword ? 'text' : 'password'}
							suffix={renderSuffix(showConfirmPassword, setShowConfirmPassword)}
							placeholder="Type here..."
							rules={{
								required: 'Confirm Password is required.',
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
							Change Password
						</Button>
					</form>
				</div>
			</div>

			<LayoutHelp />
		</div>
	);
}

export default ResetPassword;
