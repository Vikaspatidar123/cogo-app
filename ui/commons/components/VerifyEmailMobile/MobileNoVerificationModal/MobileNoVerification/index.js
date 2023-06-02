import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
import useMobileNoVerification from './useMobileNoVerification';

import OTPLayout from '@/packages/forms/Business/OTPLayout';

const OTP_LENGTH = 4;

function MobileNoVerification() {
	const {
		controls = [],
		formProps = {},
		errors = {},
		onSubmit = () => {},
		onErrors = () => {},
		showEnterOtpComponent = false,
		otpNumber = '',
		setOtpNumber = () => {},
		verifyMobileNumberApi = {},
		sendOtpNumber = () => {},
		verifyOtpNumber = () => {},
	} = useMobileNoVerification();
	const { fields = {}, handleSubmit = () => {} } = formProps;

	return (
		<div className={styles.container}>
			<div className={styles.title}>Mobile Number Verification</div>

			<form className={styles.form} onSubmit={handleSubmit(onSubmit, onErrors)}>
				{/* <Layout controls={controls} fields={fields} errors={errors} /> */}

				{showEnterOtpComponent && (
					<OTPLayout
						otpLength={OTP_LENGTH}
						setOtpValue={setOtpNumber}
						loading={false}
						sendOtp={(obj) => sendOtpNumber({ ...obj })}
					/>
				)}

				{!showEnterOtpComponent && (
					<Button
						type="submit"
						size="lg"
						disabled={verifyMobileNumberApi?.loading}
					>
						Get OTP
					</Button>
				)}

				{showEnterOtpComponent && (
					<Button
						type="submit"
						size="lg"
						onClick={verifyOtpNumber}
						disabled={verifyMobileNumberApi?.loading || otpNumber?.length !== 4}
					>
						Submit
					</Button>
				)}
			</form>
		</div>
	);
}

export default MobileNoVerification;
