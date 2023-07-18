import { Button } from '@cogoport/components';

import styles from './styles.module.css';
import useResetPassword from './useResetPassword';

import { InputController } from '@/packages/forms';
import PasswordValidator from '@/ui/commons/components/PasswordValidator';

function ResetPassword({
	setShowPasswordModal = () => {},
	refetch = () => {},
}) {
	const {
		fields = [],
		formProps = {},
		errors = {},
		onSubmit = () => {},
		onErrors = () => {},
		loading = false,
	} = useResetPassword({
		setShowPasswordModal,
		refetch,
	});

	const { handleSubmit = () => {}, getValues = () => {}, control } = formProps;
	const { password = '' } = getValues();
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div className={styles.heading_title}>Reset Password</div>
				<div className={styles.heading_sub_title}>
					Let s get you a new password
				</div>
			</div>
			{fields.map((field) => (
				<div>
					<div>{field.label}</div>
					<InputController {...field} control={control} />
					<div className={styles.message}>
						{errors[field?.name]?.message || errors[field?.name]?.type}
						{' '}
					</div>
				</div>
			))}

			<PasswordValidator password={password} />
			<div className={styles.footer}>
				<Button
					onClick={handleSubmit(onSubmit, onErrors)}
					disabled={loading}
					loading={loading}
				>
					Save
				</Button>
				<Button
					onClick={() => setShowPasswordModal(false)}
					themeType="tertiary"
				>
					Cancel
				</Button>
			</div>
		</div>
	);
}

export default ResetPassword;
