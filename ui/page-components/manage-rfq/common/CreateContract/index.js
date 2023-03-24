// import DatePicker from '@cogo/business-modules/form/components/Controlled/DatePicker';
// import InputController from '@cogo/business-modules/form/components/Controlled/InputController';
// import { addDays } from '@cogo/date';
// import { Grid } from '@cogoport/front/components';
// import Button from '@cogoport/front/components/admin/Button';
// import { useFormCogo } from '@cogoport/front/hooks';
// import { startCase } from '@cogoport/front/utils';
// import React from 'react';

// import CreateContractsControls from '../../configurations/create-contract-details';
// import getNameSuggestions from '../../helpers/getNameSuggestions';
// import useCreateContractRfq from '../../hooks/useCreateContractRfq';

// import PortPairs from './portpairs';
// import {
// 	Container,
// 	Header,
// 	BackIcon,
// 	Title,
// 	StyledCol,
// 	Label,
// 	SubTitle,
// 	Tags,
// 	Tag,
// 	PlusIcon,
// 	TickIcon,
// 	SubLabel,
// 	// TermsAndConditions,
// 	Buttons,
// 	Error,
// 	// TermsText
// } from './styles';

// const { Row } = Grid;

// function CreateContract({
// 	formData,
// 	setShowContractCreation = () => {},
// 	setShowModal = () => {},
// }) {
// 	const RfqId = formData?.[0]?.rfq_id || '';
// 	const { nameSuggestions } = getNameSuggestions({
// 		formData,
// 	});
// 	const { loading, onContractRequest } = useCreateContractRfq({
// 		RfqId,
// 		setShowModal,
// 		setShowContractCreation,
// 	});

// 	const {
// 		fields,
// 		watch,
// 		setValue,
// 		handleSubmit,
// 		setError,
// 		formState: { errors },
// 	} = useFormCogo(CreateContractsControls({ formData }));

// 	const watchName = watch('contract_name');
// 	const ValidityStart = watch('validity_start') || new Date();

// 	const submitForm = (val) => {
// 		onContractRequest(val);
// 	};

// 	return (
// 		<Container>
// 			<Header>
// 				<BackIcon onClick={() => setShowContractCreation(false)} />
// 				Back to RFQ
// 			</Header>

// 			<Title>One last step, finalise your contract</Title>
// 			<Row>
// 				<StyledCol sm={3.7}>
// 					<Label>{fields.contract_name.label}</Label>
// 					<InputController
// 						{...fields.contract_name}
// 						className={(errors?.contract_name?.message || '') && 'error-class'}
// 					/>
// 					<Error>{errors?.contract_name?.message}</Error>
// 				</StyledCol>
// 				<StyledCol sm={0.1} />
// 				<StyledCol sm={2.1}>
// 					<Label>{fields.validity_start.label}</Label>
// 					<DatePicker
// 						{...fields.validity_start}
// 						maxDate={addDays(new Date(), 29)}
// 						className={(errors?.validity_start?.message || '') && 'error-class'}
// 					/>
// 					<SubLabel>{fields.validity_start.miniLabel}</SubLabel>
// 					{' '}
// 					<Error>{errors?.validity_start?.message}</Error>
// 				</StyledCol>
// 				<StyledCol sm={2.1}>
// 					<Label>{fields.validity_end.label}</Label>
// 					<DatePicker
// 						{...fields.validity_end}
// 						minDate={ValidityStart}
// 						maxDate={addDays(ValidityStart, 29)}
// 						className={(errors?.validity_end?.message || '') && 'error-class'}
// 					/>
// 					<SubLabel>{fields.validity_end.miniLabel}</SubLabel>
// 					{' '}
// 					<Error>{errors?.validity_end?.message}</Error>
// 				</StyledCol>
// 			</Row>
// 			<Row>
// 				<StyledCol sm={12}>
// 					<SubTitle>Name Suggestions</SubTitle>
// 					<Tags>
// 						{nameSuggestions.map((name) => (
// 							<Tag
// 								onClick={() => {
// 									setValue('contract_name', name);
// 									setError('contract_name', undefined);
// 								}}
// 								active={startCase(watchName) === name}
// 							>
// 								{startCase(watchName) === name ? <TickIcon /> : <PlusIcon />}
// 								<div>{name}</div>
// 							</Tag>
// 						))}
// 					</Tags>
// 				</StyledCol>
// 			</Row>
// 			<PortPairs
// 				formData={formData}
// 				errors={errors}
// 				fields={fields}
// 				watch={watch}
// 			/>
// 			<Buttons>
// 				<Button
// 					className="secondary md"
// 					onClick={() => setShowContractCreation(false)}
// 					disabled={loading}
// 				>
// 					Back
// 				</Button>
// 				<Button
// 					className="primary md"
// 					onClick={handleSubmit(submitForm)}
// 					disabled={loading}
// 				>
// 					Request Contract
// 				</Button>
// 			</Buttons>
// 		</Container>
// 	);
// }

// export default CreateContract;
