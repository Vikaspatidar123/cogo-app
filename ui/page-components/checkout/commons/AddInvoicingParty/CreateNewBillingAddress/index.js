import AddressForm from '../../AddressForm';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryId from '@/ui/commons/utils/getCountryId';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const INDIA_COUNTRY_ID = getCountryId(GLOBAL_CONSTANTS.country_code.IN);

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
				validateGst={countryIdForAddressForm === INDIA_COUNTRY_ID}
				registrationNumber={
					registrationNumber || organizationRegistrationNumber
				}
				organizationCountryId={organizationCountryId}
			/>
		</div>
	);
}

export default CreateNewBillingAddress;
