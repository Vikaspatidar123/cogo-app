import { useState } from 'react';
import showErrorsInToast from '@/utils/showErrorsInToast';
import getValue from '@/commons/utils/getValue';
import { COUNTRY_IDS } from '@cogoport/business/constants';
import { Container, StepperContainer } from './styles';
import CompanyDetails from './CompanyDetails';
import BankAccount from './BankAccount';
import AdditionalDocuments from './AdditionalDocument';
import AddressForm from '../../AddressForm';
import useCreateOrgTradeParty from '../hooks/useCreateOrgTradeParty';
import ProgressStrip from './ProgressStrip';

const { IN = '' } = COUNTRY_IDS;

const stepperContent = {
	paying_party: {
		company_details: {
			key: 'company_details',
			label: 'COMPANY DETAILS',
		},
		billing_address: {
			key: 'billing_address',
			label: 'BILLING ADDRESS',
		},
	},
	collection_party: {
		company_details: {
			key: 'company_details',
			label: 'COMPANY DETAILS',
		},
		billing_address: {
			key: 'billing_address',
			label: 'BILLING ADDRESS',
		},
		bank_details: {
			key: 'bank_details',
			label: 'BANK DETAILS',
		},
		documents: {
			key: 'documents',
			label: 'DOCUMENTS',
		},
	},
};

function CreateNewInvoicingParty({
	orgResponse = {},
	tradePartyType = {},
	setShowComponent = () => {},
	setShowModal = () => {},
	fetchOrganizationTradeParties = () => {},
	viewType = 'from_profile',
}) {
	const [filledDetails, setFilledDetails] = useState({});
	const [currentStep, setCurrentStep] = useState('company_details');

	const { onSubmit = () => {}, loading = false } = useCreateOrgTradeParty({
		orgResponse,
		setShowComponent,
		tradePartyType,
		setShowModal,
		filledDetails,
		setFilledDetails,
		fetchOrganizationTradeParties,
	});

	const onClickAddressFormForTradeParty = (addressValues = {}) => {
		const { values = {} } = addressValues;

		setFilledDetails({
			...filledDetails,
			billing_address: { ...values },
		});

		if (tradePartyType.value === 'paying_party') {
			onSubmit(values);
		}

		if (tradePartyType.value === 'collection_party') {
			setCurrentStep('bank_details');
		}
	};

	let renderCurrentStepControls = null;
	if (currentStep === 'company_details') {
		const showCompanyDetailsBackButton = ['from_checkout'].includes(viewType);

		const onClickCompanyDetailsBack = () => {
			if (showCompanyDetailsBackButton && setShowComponent) {
				setShowComponent('view_billing_addresses');
			}
		};
		renderCurrentStepControls = (
			<CompanyDetails
				filledDetails={filledDetails}
				setFilledDetails={setFilledDetails}
				setCurrentStep={setCurrentStep}
				onClickBack={onClickCompanyDetailsBack}
				showBackButton={showCompanyDetailsBackButton}
			/>
		);
	}

	if (currentStep === 'billing_address') {
		const optionalButtons = [
			{
				className: 'secondary',
				label: 'Back',
				onClick: ({ values }) => {
					setCurrentStep('company_details');
					setFilledDetails({
						...filledDetails,
						billing_address: { ...values },
					});
				},
			},
		];

		const {
			company_details: companyDetails = {},
			billing_address: billingAddress = {},
		} = filledDetails || {};
		const { country_id } = companyDetails;
		const { isAddressRegisteredUnderGst } = billingAddress;

		renderCurrentStepControls = (
			<AddressForm
				organizationId={orgResponse.id}
				tradePartyId={orgResponse.organization_trade_party_id}
				isAddressRegisteredUnderGst={false}
				addressData={{}}
				addressType={
					isAddressRegisteredUnderGst ? 'otherAddress' : 'billingAddress'
				}
				showInvoiceTradeParty={false}
				onSuccess={(values) => {
					onClickAddressFormForTradeParty(values);
				}}
				onFailure={({ error }) => {
					showErrorsInToast(error.data);
				}}
				saveAddressData={false}
				showSavedPOC
				formState={billingAddress}
				submitButtonLabel={
					tradePartyType.value === 'paying_party' ? 'Submit' : 'Proceed'
				}
				optionalButtons={optionalButtons}
				loading={loading}
				registrationNumber={getValue(
					filledDetails,
					'company_details.registration_number',
				)}
				validateGst={country_id === IN}
			/>
		);
	}

	if (currentStep === 'bank_details') {
		renderCurrentStepControls = (
			<BankAccount
				setCurrentStep={setCurrentStep}
				filledDetails={filledDetails}
				setFilledDetails={setFilledDetails}
			/>
		);
	}

	if (currentStep === 'documents') {
		renderCurrentStepControls = (
			<AdditionalDocuments
				setCurrentStep={setCurrentStep}
				setShowModal={setShowModal}
				filledDetails={filledDetails}
				setFilledDetails={setFilledDetails}
				orgResponse={orgResponse}
				tradePartyType={tradePartyType}
				fetchOrganizationTradeParties={fetchOrganizationTradeParties}
			/>
		);
	}

	return (
		<Container>
			<StepperContainer>
				<ProgressStrip
					progressSteps={Object.values(
						stepperContent[tradePartyType.value] || [],
					)}
					currentStep={currentStep}
				/>
			</StepperContainer>

			{renderCurrentStepControls}
		</Container>
	);
}

export default CreateNewInvoicingParty;
