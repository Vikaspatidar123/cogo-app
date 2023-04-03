import { useForm } from '@cogo/deprecated_legacy/forms';
import { Btn, cogoToast } from '@cogo/deprecated_legacy/ui';
import FormLayout from '@cogo/app-common/components/FormLayoutSimple';
import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import { controls } from './controls.js';
import { ButtonDiv, Container, FormWrapper } from './styles';
import ProgressBar from '../ProgressBar';
import Heading from '../Heading';
import useSubmitKyc from '../../hooks/useSubmitKyc';

const Form = ({ scope, agent_id, onFinalSubmit, ...rest }) => {
	const {
		country_code,
		preferred_languages,
		country_id,
		showMobile = true,
		kyc_submitted_from,
	} = rest || {};
	const [isOpen, setIsOpen] = useState(false);
	const newControls = controls(country_code, isOpen, setIsOpen, rest);
	const { fields, getValues } = useForm(newControls);
	const [show, setShow] = useState(false);
	const [mobile, setMobile] = useState({});
	const otpVarifyAPI = useRequest('post', false, scope)('/verify_user_mobile');
	const [formValue, setFormValue] = useState(null);
	const { submitKyc } = useSubmitKyc({
		scope,
		id: agent_id,
		mobileNumber: mobile?.mobile_number,
		mobileCountryCode: mobile?.mobile_country_code,
		preferredLanguages: preferred_languages,
		countryId: country_id,
		onFinalSubmit,
		kyc_submitted_from,
	});

	const onSubmit = async (e) => {
		if (!showMobile) {
			const values = getValues();
			submitKyc(values);
		} else {
			e.preventDefault();
			const values = getValues();
			if (values) {
				setMobile({
					mobile_number: values?.mobile?.mobile_number,
					mobile_country_code: values?.mobile?.mobile_country_code,
				});
				setFormValue(values);

				try {
					const res = await otpVarifyAPI.trigger({
						data: {
							id: agent_id,
							mobile_number: values?.mobile?.mobile_number,
							mobile_country_code: values?.mobile?.mobile_country_code,
						},
					});
					if (!res.hasError) {
						setShow(true);
						cogoToast.success('OTP sent');
					} else {
						showErrorsInToast(res?.messages);
					}
				} catch (err) {
					showErrorsInToast(err?.data);
				}
			}
		}
	};
	const formStyle = { marginLeft: '-8px' };
	const buttonStyle = {
		minWidth: '142px',
		height: '44px',
		borderRadius: '10px',
		fontSize: '14px',
	};
	return (
		<Container className={show ? 'otp' : ''}>
			<Heading
				isOtp={show}
				mobileNumber={mobile?.mobile_number}
				text={rest.text}
			/>
			{show ? (
				<ProgressBar
					formValues={formValue}
					scope={scope}
					id={agent_id}
					mobileNumber={mobile?.mobile_number}
					mobileCountryCode={mobile?.mobile_country_code}
					preferredLanguages={preferred_languages}
					countryId={country_id}
					onFinalSubmit={onFinalSubmit}
					kyc_submitted_from={kyc_submitted_from}
				/>
			) : (
				<form onSubmit={onSubmit} style={formStyle}>
					<FormWrapper>
						<FormLayout
							controls={newControls}
							fields={fields}
							themeType="new big"
						/>
					</FormWrapper>
					<ButtonDiv>
						<Btn type="submit" style={buttonStyle} className="small">
							{showMobile ? 'PROCEED' : 'SUBMIT BUSINESS VERIFICATION'}
						</Btn>
					</ButtonDiv>
				</form>
			)}
		</Container>
	);
};
export default Form;
