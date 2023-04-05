import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

export function SelectedServices({ isOtp, mobileNumber }) {
	const title = !isOtp ? 'Add Your Details' : null;
	const subHeadingText = !isOtp
		? `You're one step away from gaining access to premium features
	like freight rate search, shipment booking and shipment management.
	Please enter the following details to help us verify your account.`
		: `Please enter the verification code we sent to your mobile number ${mobileNumber}`;
	return (
		<div className={cl`${isOtp ? styles.otp : null} ${styles.container}`}>
			{!isOtp ? <p className={styles.heading}>{title}</p> : null}
			<p className={cl`${isOtp ? 'otp' : null} ${styles.sub_heading}`}>{subHeadingText}</p>
		</div>
	);
}
export default SelectedServices;
