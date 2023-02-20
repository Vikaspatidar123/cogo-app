import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import PasswordValidator from './PasswordValidator';
import styles from './styles.module.css';
import useResetPassword from './useResetPassword';

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
		fields = {},
		handleSubmit = () => {},
		getValues = () => {},
	} = formProps;

	const { password = '' } = getValues();

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

			{/* <Layout controls={controls} fields={fields} errors={errors} /> */}

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
