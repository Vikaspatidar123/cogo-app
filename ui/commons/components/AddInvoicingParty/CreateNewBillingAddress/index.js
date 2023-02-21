import { useTranslation } from 'next-i18next';

import AddressForm from '../../AddressForm';

import getCountryDetails from '@/temp/utils/getCountryDetails';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals.json';
import showErrorsInToast from '@/utils/showErrorsInToast';

function CreateNewBillingAddress({
	setShowComponent = () => {},
	organizationDetails = {},
	refetch = () => {},
	invoiceToTradePartyDetails,
	setInvoiceToTradePartyDetails,
}) {
	const { t } = useTranslation(['common']);
	const translationKey =		'common:components.addInvoicingParty.createNewBillingAddress';

	const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

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

	const countryCode = getCountryDetails({
		country_id: INDIA_COUNTRY_ID,
	})?.country_code;

	return (
		<div>
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
				submitButtonLabel={t(`${translationKey}.submitButtonLabel`)}
				optionalButtons={[
					{
						className : 'secondary',
						label     : t(`${translationKey}.optionalButtons.label`),
						onClick   : () => {
							setShowComponent('view_billing_addresses');
							setInvoiceToTradePartyDetails({});
						},
					},
				]}
				loading={false}
				validateGst={countryIdForAddressForm === countryCode}
				registrationNumber={
					registrationNumber || organizationRegistrationNumber
				}
			/>
		</div>
	);
}

export default CreateNewBillingAddress;
