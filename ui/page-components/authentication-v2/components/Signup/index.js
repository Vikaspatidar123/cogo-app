import { useState } from 'react';

import LayoutHelp from '../common/LayoutHelp';
import LayoutLogo from '../common/LayoutLogo';
import LoadingPrompts from '../common/LoadingPrompts';
import ShipStepper from '../common/ShipStepper';

import OTPSignupForm from './OTPSignupForm';
import SignupForm from './SignupForm';
import styles from './styles.module.css';

const SIGNUP_FLOW_MAPPING = {
	signup_form     : SignupForm,
	otp_form        : OTPSignupForm,
	loading_prompts : LoadingPrompts,
};

function Signup() {
	const [mode, setMode] = useState('signup_form');
	const [formData, setFormData] = useState({});
	const [userDetails, setUserDetails] = useState({});

	const componentProps = {
		signup_form: {
			setMode,
			setFormData,
			setUserDetails,
		},
		otp_form: {
			setMode,
			formData,
			userDetails,
		},
		loading_prompts: {
			type: 'signup',
		},
	};

	const Component = SIGNUP_FLOW_MAPPING[mode] || null;

	return (
		<>
			<ShipStepper />

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

export default Signup;
