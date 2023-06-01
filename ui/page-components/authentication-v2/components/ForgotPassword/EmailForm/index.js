import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';

function EmailForm({ resetUserPassword = () => {}, resetPasswordLoading = false }) {
	const { handleSubmit, formState: { errors }, control } = useForm();
	const router = useRouter();
	return (
		<>
			<span onClick={() => { router.back(); }} role="presentation">
				<IcMArrowBack
					width="1.2rem"
					height="1.2rem"
					style={{ cursor: 'pointer' }}
				/>
			</span>
			<div className={styles.card_heading}>Forgot your Password?</div>
			<div className={styles.card_sub_heading}>
				We will send you a link to Reset your Password
			</div>
			<form className={styles.form_container} onSubmit={handleSubmit(resetUserPassword)}>
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

				<Button
					loading={resetPasswordLoading}
					className={styles.submit_button}
					type="submit"
					size="lg"
				>
					Reset Password
				</Button>
			</form>
		</>
	);
}

export default EmailForm;
