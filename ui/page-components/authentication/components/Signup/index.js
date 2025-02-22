import { useState } from 'react';

import LayoutHelp from '../common/LayoutHelp';
import LayoutLogo from '../common/LayoutLogo';
import LoadingPrompts from '../common/LoadingPrompts';

import OTPSignupForm from './OTPSignupForm';
import SignupForm from './SignupForm';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SIGNUP_FLOW_MAPPING = {
	signup_form     : SignupForm,
	otp_form        : OTPSignupForm,
	loading_prompts : LoadingPrompts,
};

function Signup() {
	const [mode, setMode] = useState('signup_form');
	const [leadUserId, setLeadUserId] = useState('');

	const [userDetails, setUserDetails] = useState({
		name               : '',
		email              : '',
		mobile_number      : { country_code: '', number: '' },
		business_name      : '',
		country_id         : '',
		is_whatsapp_number : false,
	});

	const componentProps = {
		signup_form: {
			userDetails,
			leadUserId,
			setMode,
			setUserDetails,
			setLeadUserId,
		},
		otp_form: {
			userDetails,
			setMode,
		},
		loading_prompts: {
			type: 'signup',
		},
	};

	const Component = SIGNUP_FLOW_MAPPING[mode] || null;

	return (
		<div
			className={styles.authentication_layout}
			style={{
				backgroundImage: `url(${GLOBAL_CONSTANTS.image_url.neo_background_image})`,
			}}
		>
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
	);
}

export default Signup;
