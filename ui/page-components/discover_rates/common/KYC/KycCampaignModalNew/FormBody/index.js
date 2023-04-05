/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useRequest } from '@cogo/commons/hooks';
import { useForm } from '@cogo/deprecated_legacy/forms';
import { cogoToast, Select2 } from '@cogo/deprecated_legacy/ui';
import { AwsUploader } from '@cogo/smart-components';
import countryCode from '@cogo/smart-components/constants/country-codes.json';
import getStaticPath from '@cogo/static';
import { useSelector } from '@cogo/store';
import styled from '@cogo/styled';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import { Button, Flex, Text, Input, BgImage } from '@cogoport/front/components';
import { useState } from 'react';

import ProgressBar from '../ProgressBar';

import { controls } from './controls.js';
import { Container, FormWrapper } from './styles';

function Form({
	scope,
	agent_id,
	onFinalSubmit,
	onDontShow = () => {},
	...rest
}) {
	const { country_code, preferred_languages, country_id } = rest || {};
	const [isOpen, setIsOpen] = useState(false);
	const { fields, getValues } = useForm([
		...controls(country_code, isOpen, setIsOpen, rest),
	]);
	const isMobile = useSelector((s) => s?.general?.isMobile);

	const { profile_id, organization_id } = useSelector(
		({ general, profile }) => ({
			isMobile        : general?.isMobile,
			kyc_status      : profile?.organization?.kyc_status,
			profile_id      : profile?.id,
			organization_id : profile?.organization?.id,
		}),
	);

	const [show, setShow] = useState(false);
	const [mobile] = useState({});
	const otpVarifyAPI = useRequest('post', false, scope)('/verify_user_mobile');
	const [formValue, setFormValue] = useState(null);
	const [countrycode, setCountrycode] = useState({});

	const formattedList = countryCode.map((code) => ({
		value : code.value,
		label : `${code.value}: ${code.label}`,
	}));
	const onSubmit = async (e) => {
		e.preventDefault();
		const values = getValues();
		if (values) {
			const data = {
				id                  : agent_id,
				registration_number : values?.registration_number,
				mobile_number       : values?.mobile,
				mobile_country_code : countrycode?.country_code,
			};
			setFormValue({
				...data,
				utility_bill_document_url: values?.utility_bill_document_url,
			});
			try {
				const res = await otpVarifyAPI.trigger({ data });
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
				/>
			) : (
				<form onSubmit={onSubmit} style={formStyle}>
					<Flex
						direction={isMobile ? 'column-reverse' : 'row'}
						alignItems="flex-end"
					>
						<Flex display="block" flex={1}>
							<div
								style={{
									backgroundColor : '#F5FAFE',
									display         : 'flex',
									borderRadius    : '5px',
									marginLeft      : '20px',
								}}
							>
								<h2
									style={{
										fontSize   : '16px',
										fontWeight : '400',
										alignItems : 'center',
										marginLeft : '10px',
									}}
								>
									Share some basic information about your company
								</h2>
							</div>
							<FormWrapper>
								<Flex direction={isMobile ? 'column' : 'row'} marginTop={15}>
									<Flex flex={1} direction="column">
										<Flex direction="column">
											<Text
												style={{
													color      : '#333333',
													fontWeight : '500',
													fontSize   : '12px',
												}}
											>
												Company's registration number
											</Text>
											{' '}
											<br />
											<Flex direction="column">
												<Input
													style={{
														height    : '44px',
														margin    : '4px',
														marginTop : '-8px',
													}}
													{...fields?.registration_number}
												/>
												{fields?.registration_number?.error && (
													<Text>{fields?.registration_number?.error}</Text>
												)}
											</Flex>
										</Flex>
										<Flex direction="column">
											<Text
												style={{
													color      : '#333333',
													fontWeight : '500',
													fontSize   : '12px',
													marginTop  : '4px',
												}}
											>
												Mobile number
											</Text>
											{' '}
											<br />
											<Flex>
												<StyledSelect2
													caret
													placeholder="Select"
													onChange={(a) => setCountrycode((val) => ({
														...val,
														country_code: a,
													}))}
													value={countrycode?.country_code}
													options={formattedList}
													style={{ width: 180 }}
												/>
												<Input
													style={{
														height    : '44px',
														margin    : '4px',
														marginTop : '-8px',
														flex      : 1,
													}}
													{...fields?.mobile}
												/>
												{fields?.rest?.mobile && (
													<Text>{fields?.rest?.mobile}</Text>
												)}
											</Flex>
										</Flex>
									</Flex>
									<Flex flex={1}>
										<Flex direction="column">
											<Text
												style={{
													color      : '#333333',
													fontWeight : '500',
													fontSize   : '12px',
													marginTop  : '4px',
												}}
											>
												Company's address proof
											</Text>
											{' '}
											<br />
											<AwsUploader
												name="utility_bill_document_url"
												type="file"
												drag
												height={126}
												uploadType="aws"
												uploadIcon="ic-upload"
												themeType="black"
												onlyURLOnChange
												accept="image/*,.jpg,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
												{...fields?.utility_bill_document_url}
												// style={{ padding: '5px 20px 5px 5px;', height: 'auto' }}
											/>
										</Flex>
									</Flex>
								</Flex>
							</FormWrapper>
							<Flex alignItems="center" direction="column">
								<Text
									align="center"
									style={{
										fontStyle    : 'italic',
										color        : '#999',
										marginBottom : '25px',
										fontSize     : '10px',
									}}
								>
									We attach great importance to protecting your private data,
									which is only used to verify your business and complete
									transactions
								</Text>
								<StyledButton
									style={{ marginBottom: 8 }}
									size="lg"
									type="submit"
								>
									<Text
										color="#FFFFFF"
										size="16px"
										fontWeight="700"
										textTransform="none"
									>
										DOWNLOAD YOUR eBOOK NOW
									</Text>
								</StyledButton>
								<ClearButton
									onClick={() => {
										localStorage.setItem(
											`ebook-modal-${profile_id}-${organization_id}`,
											'true',
										);
										onDontShow();
									}}
									style={{ marginBottom: 16 }}
								>
									Don't show this again
								</ClearButton>
							</Flex>
						</Flex>
						<Flex marginBottom={isMobile ? 0 : -36} width={360}>
							<BgImage height={380} src={getStaticPath('/images/ebook.png')} />
						</Flex>
					</Flex>
				</form>
			)}
		</Container>
	);
}

const StyledButton = styled(Button)`
	background-color: #2c3e50 !important;
	border-color: #2c3e50 !important;
	position: relative;

	.core-ui-button-root {
		text-transform: none;
	}
`;

export default Form;

const StyledSelect2 = styled(Select2)`
	width: 100px;
	height: 50px;
	margin: 4px;
	margin-top: -8px;

	.select__control {
		height: 44px;
		border: 1px solid #e0e0e0;
	}
`;

const ClearButton = styled.button`
	border: none;
	background-color: transparent;
	color: #999999;
	font-size: 12px;
	cursor: pointer;
	text-decoration: underline;
`;
