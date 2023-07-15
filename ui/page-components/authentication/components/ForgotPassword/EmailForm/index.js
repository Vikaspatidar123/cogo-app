import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';
import { useRouter } from '@/packages/next';

function EmailForm({ resetUserPassword = () => { }, resetPasswordLoading = false, t = () => { } }) {
	const translationKey = 'common:forgotPassword';

	const { handleSubmit, formState: { errors }, control } = useForm();

	const router = useRouter();

	return (
		<>
			<span onClick={() => { router.back(); }} role="presentation" className={styles.back_button}>
				<IcMArrowBack
					width="20px"
					height="20px"
				/>
			</span>

			<h2 className={styles.card_heading}>{t(`${translationKey}_title`)}</h2>
			<p className={styles.card_sub_heading}>
				{t(`${translationKey}_subtitle`)}
			</p>

			<form className={styles.form_container} onSubmit={handleSubmit(resetUserPassword)}>

				<p className={styles.label}>{t(`${translationKey}_email_label`)}</p>
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

				<Button
					loading={resetPasswordLoading}
					className={styles.submit_button}
					type="submit"
					size="lg"
				>
					{t(`${translationKey}_submit_button`)}
				</Button>

			</form>
		</>
	);
}

export default EmailForm;
