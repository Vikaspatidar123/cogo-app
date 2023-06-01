import { useState } from 'react';

import useLoginMobileAuthentication from '../../hooks/useLoginMobileAuthentication';
import getUserLocationData from '../../utils/getUserLocationData';
import LayoutHelp from '../common/LayoutHelp';
import LayoutLogo from '../common/LayoutLogo';
import LoadingPrompts from '../common/LoadingPrompts';
import ShipStepper from '../common/ShipStepper';

import LoginTabs from './LoginTabs';
import OTPLoginForm from './OTPLoginForm';
import styles from './styles.module.css';

const LOGIN_FLOW_MAPPING = {
	login_tabs      : LoginTabs,
	otp_form        : OTPLoginForm,
	loading_prompts : LoadingPrompts,
};

function Login() {
	const [mode, setMode] = useState('login_tabs');
	const [mobileNumber, setMobileNumber] = useState({});
	const [otpId, setOtpId] = useState('');

	const {
		onSendOtp = () => {},
		otpLoading = false,
		resendOtp = () => {},
	} = useLoginMobileAuthentication({ setMode, setMobileNumber, setOtpId, mobileNumber });

	const { countryCode } = getUserLocationData({});

	console.log('countryCode:: ', countryCode);

	const componentProps = {
		login_tabs: {
			onSendOtp,
			otpLoading,
			setMode,
		},
		otp_form: {
			otpId,
			mobileNumber,
			setMode,
			resendOtp,
		},
		loading_prompts: {
			type: 'login',
		},
	};

	const Component = LOGIN_FLOW_MAPPING[mode] || null;
	return (
		<>
			<ShipStepper mode={mode} />

			<div className={styles.authentication_layout}>
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
		</>
	);
}

export default Login;
