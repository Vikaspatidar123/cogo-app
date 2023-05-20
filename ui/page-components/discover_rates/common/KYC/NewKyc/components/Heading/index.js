import React from 'react';

import { Container, Heading, SubHeading } from './styles';

export function SelectedServices({ isOtp, mobileNumber, text = '' }) {
	const title = !isOtp ? 'Verify Your Business' : null;
	const subHeadingText = !isOtp ? text || `You're one step away from gaining access to premium features
	like freight rate search, shipment booking and shipment management.
	Please enter the following details to help us verify your account.` : `Please enter the verification code we sent to your mobile number ${mobileNumber}`;
	return (
		<Container className={isOtp ? 'otp' : null}>
			{!isOtp ? <Heading>{title}</Heading> : null}
			<SubHeading className={isOtp ? 'otp' : null}>{subHeadingText}</SubHeading>
		</Container>
	);
}
export default SelectedServices;
