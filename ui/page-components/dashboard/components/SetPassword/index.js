import { Button, Modal } from '@cogoport/components';
import { IcCTick, IcMEyeclose, IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useSetPassword from '../../hooks/useSetPassword';

import styles from './styles.module.css';

import { InputController } from '@/packages/forms';
import PasswordValidator from '@/ui/commons/components/PasswordValidator';
import patterns from '@/ui/commons/configurations/patterns';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Header() {
	return (
		<img
			src={GLOBAL_CONSTANTS.image_url.cogoport_logo}
			alt="Cogoport"
		/>

	);
}

function SetPassword({ showModal = false, setShowModal = () => {} }) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { handleSubmit, control, watch, formState: { errors, isValid } } = useForm();

	const formValues = watch();

	const { password, confirm_password } = formValues;

	const {
		onSetPassword = () => {},
		loading = false,
		customErrors = '',
	} = useSetPassword({ password, confirm_password, setShowModal });

	const renderSuffix = (show, setShow) => {
		if (!show) {
			return <IcMEyeopen className={styles.show_password} onClick={() => setShow(!show)} />;
		}
		return <IcMEyeclose className={styles.show_password} onClick={() => setShow(!show)} />;
	};

	return (
		<Modal
			size="md"
			show={showModal}
			onClose={() => { setShowModal(false); }}
			placement="center"
		>
			<Modal.Header title={<Header />} />
			<form onSubmit={handleSubmit(onSetPassword)} className={styles.form_container}>
				<Modal.Body className={styles.modal_body}>
					<div>
						<h3>Set Password</h3>
						<h3 className={styles.verify_text}>
							<IcCTick height={28} width={28} style={{ marginRight: '4px' }} />
							Your email is successfully verified
						</h3>
						<div className={styles.form_container}>
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
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={!isEmpty(customErrors) || !isValid}
						loading={loading}
						type="submit"
						size="lg"
					>
						Submit
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default SetPassword;
