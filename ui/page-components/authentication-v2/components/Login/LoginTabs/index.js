import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import EmailLoginForm from '../EmailLoginForm';
import MobileLoginForm from '../MobileLoginForm';

import styles from './styles.module.css';

function LoginTabs({ setMode = () => {}, onSendOtp = () => {}, otpLoading = false }) {
	const [activeTab, setActiveTab] = useState('email');

	return (
		<>
			<div className={styles.card_heading}>Welcome back to Cogoport</div>
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
						onSendOtp={onSendOtp}
						otpLoading={otpLoading}
					/>
				</TabPanel>
			</Tabs>
		</>
	);
}

export default LoginTabs;
