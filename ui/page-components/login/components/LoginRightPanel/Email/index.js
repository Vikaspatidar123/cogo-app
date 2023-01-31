// import FormLayout from '@/temp/form/FormLayout';
import { Text, Button } from '@cogoport/components';

import styles from './styles.module.css';
import useEmail from './useEmail';

function Email({ loginApiLoading = false, ...restProps }) {
	const {
		controls = [],
		formProps = {},
		errors = {},
		onSubmit = () => { },
		onClickForgotPasswordButton = () => { },
	} = useEmail({ ...restProps });
	const { handleSubmit = () => { }, fields = {} } = formProps;

	return (
		<from onSubmit={handleSubmit(onSubmit)}>
			{/* <FormLayout controls={controls} fields={fields} errors={errors} /> */}

			<div className={styles.forgot_password_container}>
				<Text
					color="#828282"
					style={{ cursor: 'pointer' }}
					size={12}
					onClick={onClickForgotPasswordButton}
				>
					Forgot Password?
				</Text>
			</div>

			<Button type="submit" className="primary lg" disabled={loginApiLoading}>
				{loginApiLoading ? 'Logging...' : 'Login'}
			</Button>
		</from>
	);
}

export default Email;
