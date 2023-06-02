import { Button } from '@cogoport/components';
import React from 'react';

import MobileNoVerificationModal from './MobileNoVerificationModal';
import styles from './styles.module.css';
import useVerifyEmailIdAndMobileNo from './useVerifyEmailIdAndMobileNo';

import { useSelector } from '@/packages/store';

const VerifyEmailMobile = () => {
	const {
		profile: {
			email_verified: isEmailIdVerified = false,
			mobile_verified: isMobileNumberVerified = false,
		},
	} = useSelector((state) => state);

	const {
		showMobileNoVerificationModal = false,
		setShowMobileNoVerificationModal = () => {},
		resendEmailVerificationMailApi = {},
		onClickVerifyEmailIdButton = () => {},
		onClickVerifyMobileNoButton = () => {},
	} = useVerifyEmailIdAndMobileNo();

	let verificationComponent = null;
	if (!isEmailIdVerified) {
		verificationComponent = (
			<div className={styles.container}>
				<div className={styles.label}>
					Your email address is not verified yet. Please verify it to start getting regular updates
				</div>

				<Button
					type="button"
					onClick={onClickVerifyEmailIdButton}
					disabled={resendEmailVerificationMailApi?.loading}
				>
					Verify email
				</Button>
			</div>
		);
	}

	if (!isMobileNumberVerified) {
		verificationComponent = (
			<div className={styles.container}>
				<div className={styles.label}>
					Your mobile number is not verified yet. Please verify it to start getting regular updates.
				</div>

				<Button type="button" onClick={onClickVerifyMobileNoButton}>
					Verify mobile
				</Button>

				<MobileNoVerificationModal
					showMobileNoVerificationModal={showMobileNoVerificationModal}
					setShowMobileNoVerificationModal={setShowMobileNoVerificationModal}
				/>
			</div>
		);
	}

	return verificationComponent;
};

export default VerifyEmailMobile;
