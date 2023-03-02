import { FluidContainer } from '@cogoport/components';
// import { useTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import React from 'react';

import LoginForm from './LoginForm';
import styles from './styles.module.css';

import LeftPanel from '@/ui/commons/components/LeftPanel';

function Login() {
	const { t } = useTranslation(['common']);
	return (
		<FluidContainer className={styles.container}>
			<div className={styles.left_container}>
				<LeftPanel />
			</div>
			<div className={styles.right_container}>
				<div className={styles.right_signup_text}>
					{t('common:text_1')}
					<a href="/signup" className={styles.right_signup_text_link}>{t('common:text_2')}</a>
				</div>
				<div className={styles.main_container}>
					<p className={styles.right_login_text}>
						{t('common:text_3')}
					</p>
					<LoginForm />
				</div>
			</div>
		</FluidContainer>
	);
}
export default Login;
