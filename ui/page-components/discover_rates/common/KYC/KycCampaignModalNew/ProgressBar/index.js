import { useRequest } from '@cogo/commons/hooks';
import { Btn, cogoToast, Input } from '@cogo/deprecated_legacy/ui';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import React, { useState } from 'react';

import { ButtonDiv, Container, InputDiv, ResendOtp } from './styles';
import Timer from './Timer';

const buttonStyle = { width: '142px', height: '44px', borderRadius: '10px', fontSize: '14px' };
function Bar({
	formValues, scope,
	id,
	preferredLanguages,
	countryId,
	onFinalSubmit,
}) {
	const [otp, setOtp] = useState('');
	const otpVarifyAPI = useRequest('post', false, scope)('/verify_user_mobile');
	const submitKycAPI = useRequest('post', false, scope)('/submit_organization_kyc');
	const handleChange = (e) => {
		setOtp(e?.target?.value);
	};
	const handleResendOtp = async () => {
		try {
			const res = await otpVarifyAPI.trigger({ data: formValues });
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
					mobile_number             : formValues?.mobile_number,
					mobile_country_code       : formValues?.mobile_country_code,
					mobile_otp                : otp,
					utility_bill_document_url : formValues?.utility_bill_document_url,
				},
			});
			if (!res.hasError) {
				try {
					const resSubmit = await submitKycAPI.trigger({
						data: {
							id,
							preferred_languages       : preferredLanguages,
							country_id                : countryId,
							registration_number       : formValues?.registration_number,
							utility_bill_document_url : formValues?.utility_bill_document_url,
						// ! not sure if we need this
						// mobile_number             : formValues?.mobile_number,
						// mobile_country_code       : formValues?.mobile_country_code,
						},
					});
					if (!resSubmit.hasError) {
						cogoToast.success('KYC submitted successfully');
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
			<InputDiv>
				<Input type="text" value={otp} onChange={handleChange} />
			</InputDiv>
			<ResendOtp onClick={handleResendOtp}>RESEND OTP?</ResendOtp>
			<ButtonDiv style={{ paddingBottom: 16 }}>
				<Btn style={buttonStyle} className="small" onClick={handleSubmit}>SUBMIT</Btn>
			</ButtonDiv>
		</Container>

	);
}
export default Bar;
