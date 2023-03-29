import React, { useState } from 'react';
import { Btn, cogoToast, Input } from '@cogo/deprecated_legacy/ui';
import { useRequest } from '@cogo/commons/hooks';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import { ButtonDiv, Container, InputDiv, ResendOtp } from './styles';

import Timer from './Timer';

const buttonStyle = {
	width: '142px',
	height: '44px',
	borderRadius: '10px',
	fontSize: '14px',
};
const Bar = ({
	formValues,
	scope,
	id,
	mobileNumber,
	mobileCountryCode,
	preferredLanguages,
	countryId,
	onFinalSubmit,
}) => {
	const [otp, setOtp] = useState('');

	const otpVarifyAPI = useRequest('post', false, scope)('/verify_user_mobile');

	const otpLoading = otpVarifyAPI?.loading;

	const submitKycAPI = useRequest(
		'post',
		false,
		scope,
	)('/submit_organization_kyc');

	const kycLoading = submitKycAPI?.loading;

	const handleChange = (e) => {
		setOtp(e?.target?.value);
	};
	const handleResendOtp = async () => {
		try {
			const res = await otpVarifyAPI.trigger({
				data: {
					id,
					mobile_number: mobileNumber,
					mobile_country_code: mobileCountryCode,
				},
			});
			if (!res.hasError) {
				cogoToast.success('OTP resended');
			} else {
				showErrorsInToast(res?.messages);
			}
		} catch (err) {
			showErrorsInToast(err?.data);
		}
	};
	const handleSubmit = async () => {
		try {
			const res = await otpVarifyAPI.trigger({
				data: {
					id,
					mobile_number: mobileNumber,
					mobile_country_code: mobileCountryCode,
					mobile_otp: otp,
				},
			});
			if (!res.hasError) {
				try {
					const resSubmit = await submitKycAPI.trigger({
						data: {
							id,
							preferred_languages: preferredLanguages,
							country_id: countryId,
							registration_number: formValues?.registration_number,
							utility_bill_document_url: formValues?.utility_bill_document_url,
						},
					});
					if (!resSubmit.hasError) {
						cogoToast.success('KYC submitted successfully');
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
		<Container>
			<Timer initialMinute={2} initialSecond={120} />
			{/* <OTP
			length={6}
			isNumberInput
			handleOnChange={(otp) => console.log('OTP', otp)}
		/> */}
			<InputDiv>
				<Input type="text" value={otp} onChange={handleChange} />
			</InputDiv>
			<ResendOtp onClick={handleResendOtp}>RESEND OTP?</ResendOtp>
			{/* {otpTime ? <a} */}
			<ButtonDiv>
				<Btn
					style={buttonStyle}
					disabled={otpLoading || kycLoading}
					className="small"
					onClick={handleSubmit}
				>
					SUBMIT
				</Btn>
			</ButtonDiv>
		</Container>
	);
};
export default Bar;
