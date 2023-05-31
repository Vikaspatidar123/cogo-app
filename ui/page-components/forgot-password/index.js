import React, { useState } from 'react';

import ForgotPasswordForm from './ForgotPasswordForm';
import ResetLinkSent from './ResetLinkSent';
import styles from './styles.module.css';

import LeftPanel from '@/ui/commons/components/LeftPanel';

function ForgotPassword() {
	const [sentMail, setSentMail] = useState(false);
	const [emailId, setEmailId] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<LeftPanel />
			</div>
			<div className={styles.right_container}>
				{!sentMail && <ForgotPasswordForm setSentMail={setSentMail} setEmailId={setEmailId} />}
				{sentMail && <ResetLinkSent emailId={emailId} />}
			</div>
		</div>
	);
}

export default ForgotPassword;
