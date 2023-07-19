import { useState } from 'react';

import useResetUserPassword from '../../hooks/useResetUserPassword';
import LayoutHelp from '../common/LayoutHelp';
import LayoutLogo from '../common/LayoutLogo';

import EmailForm from './EmailForm';
import styles from './styles.module.css';
import SuccessMessage from './SuccessMessage';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const FORGOT_FLOW_MAPPING = {
	email_form : EmailForm,
	success    : SuccessMessage,
};

function ForgotPassword() {
	const [mode, setMode] = useState('email_form');
	const [emailId, setEmailId] = useState('');

	const { resetUserPassword, resetPasswordLoading } = useResetUserPassword({ setMode, setEmailId });

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
		<div
			className={styles.authentication_layout}
			style={{
				backgroundImage: `url(${GLOBAL_CONSTANTS.image_url.neo_background_image})`,
			}}
		>
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

	);
}

export default ForgotPassword;
