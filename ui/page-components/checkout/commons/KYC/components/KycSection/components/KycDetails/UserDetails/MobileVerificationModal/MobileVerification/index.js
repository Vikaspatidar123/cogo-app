import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
import useMobileNoVerification from './useMobileNoVerification';

import OTPLayout from '@/packages/forms/Business/OTPLayout';
import getField from '@/packages/forms/Controlled';

const OTP_LENGTH = 4;

function MobileVerification({
	selectedUser = {},
	type = '',
	channelPartnerDetails = {},
}) {
	const {
		controls = [],
		control,
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

	const { handleSubmit = () => {} } = formProps;

	return (
		<div className={styles.container}>
			<div className={styles.title}>Mobile Number Verification</div>

			<form onSubmit={handleSubmit(onSubmit, onErrors)}>
				<div className={styles.layout}>
					{controls.map((item) => {
						const Element = getField(item.type);
						return (
							<div className={styles.field}>
								<div className={styles.lable}>{item.label}</div>
								<Element {...item} control={control} />
								{errors && (
									<div className={styles.errors}>
										{errors[item?.name]?.message}
									</div>
								)}
							</div>
						);
					})}
				</div>

				{showEnterOtpComponent && (
					<div className={styles.otp_container}>
						<OTPLayout
							otpLength={OTP_LENGTH}
							setOtpValue={setOtpNumber}
							loading={false}
							sendOtp={(obj) => sendOtpNumber({ ...obj })}
						/>
					</div>
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
			</form>
		</div>
	);
}

export default MobileVerification;
