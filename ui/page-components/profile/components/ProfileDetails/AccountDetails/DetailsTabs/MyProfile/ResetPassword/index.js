import { Button, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getControls from './controls';
import PasswordValidator from './PasswordValidator';
import styles from './styles.module.css';
import useResetPassword from './useResetPassword';

import { InputController } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const InputElement = getField('text');

function ResetPassword({
	setShowPasswordModal = () => {},
	refetch = () => {},
}) {
	const {
		controls = [],
		formProps = {},
		errors = {},
		onSubmit = () => {},
		onErrors = () => {},
		loading = false,
	} = useResetPassword({
		setShowPasswordModal,
		refetch,
	});

	const {
		handleSubmit = () => {},
		getValues = () => {},
		control,
	} = formProps;
	const { password = '', password1 = '' } = getValues();
	console.log(errors);
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div className={styles.heading__title}>
					Reset Password
				</div>
				<div className={styles.heading__sub_title}>

					Let s get you a new password

				</div>
			</div>

			{controls.map((field) => (
				<div>
					<div>{field.label}</div>
					<InputController {...field} control={control} />
					<div>
						{ errors[field?.name]?.message || errors[field?.name]?.type }
						{' '}
					</div>
				</div>
			))}

			<PasswordValidator password={password} />

			<Button
				onClick={handleSubmit(onSubmit, onErrors)}
				disabled={loading}
			>
				{loading
					? 'profile.resetPassword.butt'
					: 'Save'}
			</Button>
		</div>
	);
}

export default ResetPassword;
