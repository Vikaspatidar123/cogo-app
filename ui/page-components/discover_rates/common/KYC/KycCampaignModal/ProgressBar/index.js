import { Button, Toast } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';
import Timer from './Timer';

import OtpInput from '@/packages/forms/Business/OTPLayout/components/OtpInput';
import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const buttonStyle = {
	width        : '142px',
	height       : '44px',
	borderRadius : '10px',
	fontSize     : '14px',
};
function Bar({
	formValues,
	id,
	mobileNumber,
	mobileCountryCode,
	preferredLanguages,
	countryId,
	onFinalSubmit,
}) {
	const [otp, setOtp] = useState('');

	const [{ loading:otpLoading }, otpVarifyAPI] = useRequest({
		url    : '/verify_user_mobile',
		method : 'post',
	}, { manual: true });

	const [{ loading:kycLoading }, submitKycAPI] = useRequest({
		url    : '/submit_organization_kyc',
		method : 'post',
	}, { manual: true });

	const handleChange = (e) => {
		setOtp(e?.target?.value);
	};
	const handleResendOtp = async () => {
		try {
			const res = await otpVarifyAPI.trigger({
				data: {
					id,
					mobile_number       : mobileNumber,
					mobile_country_code : mobileCountryCode,
				},
			});
			if (!res.hasError) {
				Toast.success('OTP resended');
			} else {
				showErrorsInToast(res?.messages);
			}
		} catch (err) {
			showErrorsInToast(err?.data);
		}
	};
	const handleSubmit = async () => {
		try {
			const res = await otpVarifyAPI({
				data: {
					id,
					mobile_number       : mobileNumber,
					mobile_country_code : mobileCountryCode,
					mobile_otp          : otp,
				},
			});
			if (!res.hasError) {
				try {
					const resSubmit = await submitKycAPI({
						data: {
							id,
							preferred_languages       : preferredLanguages,
							country_id                : countryId,
							registration_number       : formValues?.registration_number,
							utility_bill_document_url : formValues?.utility_bill_document_url,
						},
					});
					if (!resSubmit.hasError) {
						Toast.success('KYC submitted successfully');
						window.location.reload();
						if (onFinalSubmit) {
							onFinalSubmit();
						}
					} else {
						showErrorsInToast(resSubmit?.messages);
					}
				} catch (err) {
					showErrorsInToast(err?.data);
				}
			} else {
				showErrorsInToast(res?.messages);
			}
		} catch (err) {
			showErrorsInToast(err?.data);
		}
	};
	return (
		<div className={styles.container}>
			<Timer initialMinute={2} initialSecond={120} />
			<div className={styles.input_div}>
				<OtpInput value={otp} onChange={handleChange} />
			</div>
			<div
				className={styles.resend_otp}
				role="presentation"
				onClick={handleResendOtp}
			>
				RESEND OTP?
			</div>
			{/* {otpTime ? <a} */}
			<div className={styles.button_div}>
				<Button
					style={buttonStyle}
					disabled={otpLoading || kycLoading}
					onClick={handleSubmit}
				>
					SUBMIT
				</Button>
			</div>
		</div>
	);
}
export default Bar;
