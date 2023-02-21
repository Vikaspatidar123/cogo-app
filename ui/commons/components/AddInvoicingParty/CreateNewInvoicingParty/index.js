import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import AddressForm from '../../AddressForm';
import useCreateOrgTradeParty from '../hooks/useCreateOrgTradeParty';
import getStepperContent from '../utils/getStepperContent';

import AdditionalDocuments from './AdditionalDocument';
import BankAccount from './BankAccount';
import CompanyDetails from './CompanyDetails';
import ProgressStrip from './ProgressStrip';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals.json';
import getValue from '@/ui/commons/utils/getValue';
// import showErrorsInToast from '@/utils/showErrorsInToast';

function CreateNewInvoicingParty({
	orgResponse = {},
	tradePartyType = {},
	setShowComponent = () => {},
	setShowModal = () => {},
	fetchOrganizationTradeParties = () => {},
	viewType = 'from_profile',
	source = '',
}) {
	const [filledDetails, setFilledDetails] = useState({});
	const [currentStep, setCurrentStep] = useState('company_details');
	console.log(currentStep, 'currentStep', tradePartyType);

	const stepperContent = getStepperContent();

	const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

	const translationKey =		'common:components.addInvoicingParty.createNewInvoicingParty.';

	const { onSubmit = () => {}, loading = false } = useCreateOrgTradeParty({
		orgResponse,
		setShowComponent,
		tradePartyType,
		setShowModal,
		filledDetails,
		setFilledDetails,
		fetchOrganizationTradeParties,
		source,
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
				tradePartyType={tradePartyType}
				onClickBack={onClickCompanyDetailsBack}
				showBackButton={showCompanyDetailsBackButton}
			/>
		);
	}

	if (currentStep === 'billing_address') {
		const optionalButtons = [
			{
				className : 'secondary',
				label     : 'tionalButtons.back',
				onClick   : ({ values }) => {
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
					Toast.error(error.data);
				}}
				saveAddressData={false}
				showSavedPOC
				formState={billingAddress}
				submitButtonLabel={
					tradePartyType.value === 'paying_party'
						? 'mitButtonLabel.submit'
						: 'tButtonLabel.proceed'
				}
				optionalButtons={optionalButtons}
				loading={loading}
				registrationNumber={getValue(
					filledDetails,
					'company_details.registration_number',
				)}
				validateGst={country_id === INDIA_COUNTRY_ID}
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
				source={source}
			/>
		);
	}

	return (
		<div>
			<div className={styles.stepper_container}>
				<ProgressStrip
					progressSteps={Object.values(
						stepperContent.paying_party || [],
					)}
					currentStep={currentStep}
				/>
			</div>

			{renderCurrentStepControls}
		</div>
	);
}

export default CreateNewInvoicingParty;
