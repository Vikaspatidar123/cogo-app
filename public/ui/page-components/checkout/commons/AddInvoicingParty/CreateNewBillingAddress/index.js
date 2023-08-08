import AddressForm from '../../AddressForm';

import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

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

	const { invoicing_party_validate_gst } = getCountrySpecificData({
		country_id   : countryIdForAddressForm,
		accessorType : 'navigations',
		accessor     : 'common',
	});

	return (
		<div>
			<AddressForm
				organizationId={id}
				tradePartyId={tradePartyId}
				isAddressRegisteredUnderGst={false}
				addressData={{}}
				addressType="billingAddress"
				showInvoiceTradeParty={false}
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
						className : 'secondary',
						label     : 'Back',
						onClick   : () => {
							setShowComponent('view_billing_addresses');
							setInvoiceToTradePartyDetails({});
						},
					},
				]}
				loading={false}
				validateGst={invoicing_party_validate_gst}
				registrationNumber={
					registrationNumber || organizationRegistrationNumber
				}
				organizationCountryId={organizationCountryId}
			/>
		</div>
	);
}

export default CreateNewBillingAddress;
