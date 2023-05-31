import { useState } from 'react';

import LayoutHelp from '../common/LayoutHelp';
import LayoutLogo from '../common/LayoutLogo';
import LoadingPrompts from '../common/LoadingPrompts';
import ShipStepper from '../common/ShipStepper';
import OTPForm from '../Login/OTPLoginForm';

import SignupForm from './SignupForm';
import styles from './styles.module.css';

function Signup() {
	const [showOtpForm, setshowOtpForm] = useState(false);
	const [formData, setFormData] = useState({});

	return (
		<>
			<ShipStepper />

			<div className={styles.authentication_layout}>
				<LayoutLogo />

				<div className={styles.card_container}>
					<div className={styles.card}>
						<LoadingPrompts />
					</div>
				</div>

				{/* <div className={styles.card_container}>
					{showOtpForm ? (
						<div className={styles.card}>
							<OTPForm mobileNumber={formData} setshowOtpForm={setshowOtpForm} />
						</div>
					) : (
						<div className={styles.card}>
							<div className={styles.card_heading}>Welcome to Cogoport </div>
							<SignupForm setshowOtpForm={setshowOtpForm} setFormData={setFormData} />
						</div>
					)}
				</div> */}

				<LayoutHelp />
			</div>
		</>
	);
}

export default Signup;
