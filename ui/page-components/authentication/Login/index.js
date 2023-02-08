import { FluidContainer } from '@cogoport/components';
// import { useTranslation } from 'next-i18next';
import React from 'react';

import LeftPanel from '../../common/LeftPanel';

import LoginForm from './LoginForm';
import styles from './styles.module.css';

function Login() {
	return (
		<FluidContainer className={styles.container}>
			<div className={styles.left_container}>
				<LeftPanel />
			</div>
			<div className={styles.right_container}>
				<div className={styles.right_signup_text}>
					Not registered yet?
					<a href="/signup" className={styles.right_signup_text_link}>SignUp</a>
				</div>
				<div className={styles.main_container}>
					<p className={styles.right_login_text}>
						Please enter your credentials to login
					</p>
					<LoginForm />
				</div>
			</div>
		</FluidContainer>
	);
}
export default Login;
