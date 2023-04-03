import { useForm } from '@cogo/deprecated_legacy/forms';
import { cogoToast } from '@cogo/deprecated_legacy/ui';
import { Button, Flex, Text } from '@cogoport/front/components';
import FormLayout from '@cogo/app-common/components/FormLayoutSimple';
import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import styled from '@cogo/styled';
import { APP_EVENT, trackEvent } from '@cogo/commons/analytics';
import { useSelector } from '@cogo/store';
import { controls } from './controls.js';
import { Container, FormWrapper } from './styles';
import ProgressBar from '../ProgressBar';

const Form = ({
	trackAnalytics = false,
	scope,
	agent_id,
	onFinalSubmit,
	...rest
}) => {
	const { country_code, preferred_languages, country_id } = rest || {};
	const [isOpen, setIsOpen] = useState(false);
	const newControls = controls(country_code, isOpen, setIsOpen, rest);
	const { fields, getValues } = useForm(newControls);
	const [show, setShow] = useState(false);
	const [mobile, setMobile] = useState({});
	const otpVerifyAPI = useRequest('post', false, scope)('/verify_user_mobile');
	const loading = otpVerifyAPI?.loading;
	const [formValue, setFormValue] = useState(null);
	const { organization } = useSelector((state) => state?.profile);

	const onSubmit = async (e) => {
		e.preventDefault();
		const values = getValues();
		if (values) {
			setMobile({
				mobile_number: values?.mobile?.mobile_number,
				mobile_country_code: values?.mobile?.mobile_country_code,
			});
			setFormValue(values);
			try {
				if (scope === 'app') {
					trackEvent(APP_EVENT.kyc_requested_verfication, {
						company_name: organization.business_name,
						company_type: organization.account_type,
					});
				}
				const res = await otpVerifyAPI.trigger({
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
	};
	const formStyle = { marginLeft: '-8px' };

	return (
		<Container className={show ? 'otp' : ''}>
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
					trackAnalytics={trackAnalytics}
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
					<Flex marginTop={12} direction="column" alignItems="center">
						<Text
							marginBottom={8}
							size={10}
							color="#999"
							align="center"
							style={{ width: 320 }}
						>
							We attach great importance to protecting your private data, which
							is only used to verify your business and complete transactions
						</Text>
						<StyledButton disabled={loading} size="md" type="submit">
							Avail your free Searches
						</StyledButton>
					</Flex>
				</form>
			)}
		</Container>
	);
};

const StyledButton = styled(Button)`
	background-color: #2c3e50;
	border-color: #2c3e50;
`;

export default Form;
