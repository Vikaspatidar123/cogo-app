import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import SignupForm from './SignupForm';
import styles from './styles.module.css';
import VerifictaionForm from './VerificationForm';

import LeftPanel from '@/ui/commons/components/LeftPanel';

function VerifyAutoSignUpSaas() {
	const { t } = useTranslation(['common']);

	const [hasSignedup, setHasSignedup] = useState(false);
	const [formData, setFormData] = useState({});
	const [userDetails, setUserDetails] = useState();

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<LeftPanel />
			</div>
			<div className={styles.right_container}>
				<div className={styles.main_container}>
					{!hasSignedup ? (
						<>
							<div className={styles.right_signup_text}>
								{t('common:rightPanel_signup_form_welcome_to_cogoport')}
								<span className={styles.right_signup_text_span}>
									{t('common:rightPanel_signup_form_signup_to_create_account')}
								</span>
							</div>
							<SignupForm
								setHasSignedup={setHasSignedup}
								setFormData={setFormData}
								setUserDetails={setUserDetails}
							/>
						</>
					)
						: <VerifictaionForm formData={formData} userDetails={userDetails} />}

				</div>
			</div>
		</div>
	);
}

export default VerifyAutoSignUpSaas;
