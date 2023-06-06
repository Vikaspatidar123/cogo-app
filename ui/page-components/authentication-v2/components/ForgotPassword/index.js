import { useState } from 'react';

import useResetUserPassword from '../../hooks/useResetUserPassword';
import LayoutHelp from '../common/LayoutHelp';
import LayoutLogo from '../common/LayoutLogo';
import ShipStepper from '../common/ShipStepper';

import EmailForm from './EmailForm';
import styles from './styles.module.css';
import SuccessMessage from './SuccessMessage';

const FORGOT_FLOW_MAPPING = {
	email_form : EmailForm,
	success    : SuccessMessage,
};

function ForgotPassword() {
	const [mode, setMode] = useState('email_form');
	const [emailId, setEmailId] = useState('');

	const { resetUserPassword, resetPasswordLoading } = useResetUserPassword(setMode, setEmailId);

	const componentProps = {
		email_form: {
			resetUserPassword,
			resetPasswordLoading,
		},
		success: {
			emailId,
			resetUserPassword,
		},
	};

	const Component = FORGOT_FLOW_MAPPING[mode] || null;

	return (
		<>
			<ShipStepper />

			<div className={styles.authentication_layout}>

				<LayoutLogo />

				<div className={styles.card_container}>
					<div className={styles.card}>
						{Component && (
							<Component
								key={mode}
								{...(componentProps[mode] || {})}
							/>
						)}
					</div>
				</div>

				<LayoutHelp />

			</div>
		</>

	);
}

export default ForgotPassword;
