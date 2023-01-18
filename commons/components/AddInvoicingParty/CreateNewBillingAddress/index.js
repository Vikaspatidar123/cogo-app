import showErrorsInToast from '@/utils/showErrorsInToast';
import { COUNTRY_IDS } from '@cogoport/business/constants';
import { LayoutContainer } from './styles';
import AddressForm from '../../AddressForm';

const { IN = '' } = COUNTRY_IDS;

function CreateNewBillingAddress({
	setShowComponent = () => {},
	organizationDetails = {},
	refetch = () => {},
	invoiceToTradePartyDetails,
	setInvoiceToTradePartyDetails,
}) {
	const {
		id = '',
		registration_number: organizationRegistrationNumber = '',
		country_id: organizationCountryId = '',
	} = organizationDetails;
	const {
		registrationNumber = '',
		countryId = '',
		tradePartyId = '',
	} = invoiceToTradePartyDetails;
	const countryIdForAddressForm = countryId || organizationCountryId;

	return (
		<LayoutContainer>
			<AddressForm
				organizationId={id}
				tradePartyId={tradePartyId}
				isAddressRegisteredUnderGst={false}
				addressData={{}}
				addressType="billingAddress"
				onSuccess={() => {
					setShowComponent('view_billing_addresses');
					refetch?.();
					setInvoiceToTradePartyDetails({});
				}}
				onFailure={({ error }) => {
					showErrorsInToast(error.data);
				}}
				saveAddressData
				showSavedPOC={false}
				formState={{}}
				submitButtonLabel="Submit"
				optionalButtons={[
					{
						className: 'secondary',
						label: 'Back',
						onClick: () => {
							setShowComponent('view_billing_addresses');
							setInvoiceToTradePartyDetails({});
						},
					},
				]}
				loading={false}
				validateGst={countryIdForAddressForm === IN}
				registrationNumber={
					registrationNumber || organizationRegistrationNumber
				}
			/>
		</LayoutContainer>
	);
}

export default CreateNewBillingAddress;
