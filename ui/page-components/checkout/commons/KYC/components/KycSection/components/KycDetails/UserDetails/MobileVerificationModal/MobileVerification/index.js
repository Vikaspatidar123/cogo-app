import OTPLayout from '@cogo/business-modules/components/OTPLayout';
import Layout from '@cogo/business-modules/form/Layout';
import React from 'react';

// import { Container, Title, Form, Button, OtpContainer } from './styles';
import styles from './styles.module.css';
import useMobileNoVerification from './useMobileNoVerification';

const OTP_LENGTH = 4;

function MobileVerification({
	selectedUser = {},
	type = '',
	channelPartnerDetails = {},
}) {
	const {
		controls = [],
		formProps = {},
		errors = {},
		onSubmit = () => {},
		onErrors = () => {},
		showEnterOtpComponent = false,
		otpNumber = '',
		setOtpNumber = () => {},
		verifyMobileNumberAPI = {},
		sendOtpNumber = () => {},
		verifyOtpNumber = () => {},
	} = useMobileNoVerification({ selectedUser, type, channelPartnerDetails });

	const { fields = {}, handleSubmit = () => {} } = formProps;

	return (
		<Container>
			<Title>Mobile Number Verification</Title>

			<Form onSubmit={handleSubmit(onSubmit, onErrors)}>
				<Layout controls={controls} fields={fields} errors={errors} />

				{showEnterOtpComponent && (
					<OtpContainer>
						<OTPLayout
							otpLength={OTP_LENGTH}
							setOtpValue={setOtpNumber}
							loading={false}
							sendOtp={(obj) => sendOtpNumber({ ...obj })}
						/>
					</OtpContainer>
				)}

				{!showEnterOtpComponent && (
					<Button
						type="submit"
						size="lg"
						disabled={verifyMobileNumberAPI.loading}
					>
						Get OTP
					</Button>
				)}

				{showEnterOtpComponent && (
					<Button
						type="submit"
						size="lg"
						onClick={verifyOtpNumber}
						disabled={verifyMobileNumberAPI.loading || otpNumber?.length !== 4}
					>
						Submit
					</Button>
				)}
			</Form>
		</Container>
	);
}

export default MobileVerification;
