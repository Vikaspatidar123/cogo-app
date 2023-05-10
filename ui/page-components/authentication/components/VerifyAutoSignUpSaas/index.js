import React, { useState } from 'react';

import SignupForm from './SignupForm';
import styles from './styles.module.css';
import VerifictaionForm from './VerificationForm';

import LeftPanel from '@/ui/commons/components/LeftPanel';

function VerifyAutoSignUpSaas() {
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
								Welcome to Cogoport
								<span className={styles.right_signup_text_span}>
									Sign up to create an account with us.
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
