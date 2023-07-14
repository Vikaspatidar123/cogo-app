import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import EmailLoginForm from '../EmailLoginForm';
import MobileLoginForm from '../MobileLoginForm';

import styles from './styles.module.css';

function LoginTabs({ setMode = () => {}, setMobileNumber = () => {}, setOtpId = () => {}, mobileNumber = {} }) {
	const [activeTab, setActiveTab] = useState('email');

	return (
		<>
			<h1 className={styles.card_heading}>Welcome back to Cogoport</h1>

			<Tabs
				activeTab={activeTab}
				themeType="tertiary"
				onChange={setActiveTab}
				style={{ width: '100%' }}
			>

				<TabPanel name="email" title="Email">
					<EmailLoginForm setMode={setMode} />
				</TabPanel>

				<TabPanel name="mobile" title="Mobile">
					<MobileLoginForm
						setMode={setMode}
						setMobileNumber={setMobileNumber}
						setOtpId={setOtpId}
						mobileNumber={mobileNumber}
					/>
				</TabPanel>

			</Tabs>
		</>
	);
}

export default LoginTabs;
