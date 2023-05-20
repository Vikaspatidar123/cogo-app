import { useRequest } from '@cogo/commons/hooks';
import { Btn, cogoToast, Input } from '@cogo/deprecated_legacy/ui';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import React, { useState } from 'react';

import useSubmitKyc from '../../hooks/useSubmitKyc';

import { ButtonDiv, Container, InputDiv, ResendOtp } from './styles';
import Timer from './Timer';

const buttonStyle = { width: '142px', height: '44px', borderRadius: '10px', fontSize: '14px' };
function Bar({
	formValues, scope,
	id,
	mobileNumber,
	mobileCountryCode,
	preferredLanguages,
	countryId,
	onFinalSubmit,
	kyc_submitted_from,
}) {
	const [otp, setOtp] = useState('');
	const otpVarifyAPI = useRequest('post', false, scope)('/verify_user_mobile');
	const { submitKycWithMobile } = useSubmitKyc({
		preferredLanguages,
		countryId,
		onFinalSubmit,
		otp,
		mobileNumber,
		mobileCountryCode,
		scope,
		id,
		kyc_submitted_from,
	});
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
				cogoToast.success('OTP resended');
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
				<Btn style={buttonStyle} className="small" onClick={() => submitKycWithMobile(formValues, otp)}>SUBMIT</Btn>
			</ButtonDiv>
		</Container>

	);
}
export default Bar;
