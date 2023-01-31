import { Tabs, TabPanel } from '@cogoport/components';
// import { useTranslation } from 'next-i18next';

import useLoginPage from './hooks/useLoginPage';
import styles from './styles.module.css';

function LoginRightPanel() {
	// const { t } = useTranslation('login');

	const {
		CONSTANTS = {},
		loginForm = '',
		setLoginForm = () => { },
		loginComponent: LoginComponent = null,
	} = useLoginPage();

	const {
		COMPONENT_KEYS: { MOBILE_NO, EMAIL },
	} = CONSTANTS;

	const tabOptions = [
		{ title: 'Mobile', name: MOBILE_NO },
		{ title: 'Email', name: EMAIL },
	];

	return (
		<div className={styles.container}>
			<div>
				{/* {t('title')} */}
				login
			</div>

			<div className={styles.form_container}>
				<Tabs activeTab={loginForm} onChange={setLoginForm}>
					{tabOptions.map((tabOption) => {
						const { title, name } = tabOption;

						return <TabPanel key={name} name={name} title={title} />;
					})}
				</Tabs>

				{LoginComponent}
			</div>

			<div className={styles.trouble_text} href="mailto:cp.onboarding@cogoport.com">
				{'If you have any trouble logging in, email here - '}
				<span className={styles.email}>app.onboarding@cogoport.com</span>
			</div>
		</div>
	);
}

export default LoginRightPanel;
