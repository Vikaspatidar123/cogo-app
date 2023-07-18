import { Button, Modal } from '@cogoport/components';
import { IcCTick, IcMEyeclose, IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import useSetPassword from '../../hooks/useSetPassword';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';
import { Image } from '@/packages/next';
import PasswordValidator from '@/ui/commons/components/PasswordValidator';
import patterns from '@/ui/commons/configurations/patterns';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function SetPassword({ showModal = false, setShowModal = () => { } }) {
	const { t } = useTranslation(['dashboard']);
	const translationKey = 'dashboard:setPassword';

	const { profile: { email_verified = false } } = useSelector((state) => state);

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
		const Icon = show ? IcMEyeclose : IcMEyeopen;
		return <Icon className={styles.show_password} onClick={() => setShow(!show)} />;
	};

	return (
		<Modal
			size="md"
			show={showModal}
			onClose={() => { setShowModal(false); }}
			closeOnOuterClick={false}
			placement="center"
		>
			<Modal.Header
				title={(
					<Image
						src={GLOBAL_CONSTANTS.image_url.cogoport_logo}
						alt="Cogoport"
						width={120}
						height={36}
					/>
				)}
			/>
			<form onSubmit={handleSubmit(onSetPassword)} className={styles.form_container}>
				<Modal.Body className={styles.modal_body}>
					<div>
						<h3>{t(`${translationKey}_heading`)}</h3>

						{email_verified ? (
							<h3 className={styles.verify_text}>
								<IcCTick height={28} width={28} style={{ marginRight: '4px' }} />

								{t(`${translationKey}_emailVerify_message`)}
							</h3>
						) : null}

						<div className={styles.form_container}>
							<div className={styles.label}>{t(`${translationKey}_password_label`)}</div>
							<InputController
								control={control}
								name="password"
								type={showPassword ? 'text' : 'password'}
								suffix={renderSuffix(showPassword, setShowPassword)}
								placeholder={t(`${translationKey}_password_placeholder`)}
								rules={{
									required : t(`${translationKey}_password_error_1`),
									pattern  : {
										value   : patterns.PASSWORD.PASSWORD_PATTERN,
										message : t(`${translationKey}_password_error_2`),
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
								suffix={renderSuffix(showConfirmPassword, setShowConfirmPassword)}
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
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={!isEmpty(customErrors) || !isValid}
						loading={loading}
						type="submit"
						size="md"
					>
						{t(`${translationKey}_submit_button`)}
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default SetPassword;
