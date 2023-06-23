import { FluidContainer, cl } from '@cogoport/components';
// import { useTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import LoginForm from './LoginForm';
import MobileLoginForm from './MobilLogineNoForm/MobileLoginForm';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import LeftPanel from '@/ui/commons/components/LeftPanel';

const MAPPING = {
	emailId: <LoginForm />,
	mobileNo: <MobileLoginForm />,
};
function Login() {
	const { t } = useTranslation(['common']);
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { loginType: login_type = '' } = query;

	const [loginType, setLoginType] = useState(() => {
		if (login_type === 'mobile') return 'mobileNo';

		return 'emailId';
	});

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
					<div className={styles.button_group}>
						<div
							className={cl`${styles.group_by_button} 
							${loginType === 'emailId'
								&& styles.active} ${styles.left}`}
							onClick={() => setLoginType('emailId')}
							role="presentation"
						>
							Email
						</div>
						<div
							className={cl`${styles.group_by_button}
									${loginType === 'mobileNo' && styles.active} ${styles.right}`}
							onClick={() => setLoginType('mobileNo')}
							role="presentation"
						>
							Mobile
						</div>
					</div>
					{MAPPING[loginType]}
				</div>
			</div>
		</FluidContainer>
	);
}
export default Login;
