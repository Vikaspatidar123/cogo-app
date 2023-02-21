import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { useRequest } from '@/packages/request';
// import showErrorsInToast from '@/utils/showErrorsInToast';

const translationKey =	'common:components.addInvoicingParty.hooks.useCreateOrgTradeParty';

const formatPocDetails = ({ data }) => data.map((poc) => {
	const {
		name = '',
		email = '',
		mobile_country_code = '',
		mobile_number = '',
	} = poc;

	return {
		name,
		email,
		mobile_country_code,
		mobile_number,
	};
});

const useCreateOrgTradeParty = ({
	orgResponse = {},
	setShowComponent = () => {},
	tradePartyType = {},
	setShowModal = () => {},
	filledDetails = {},
	setFilledDetails = () => {},
	fetchOrganizationTradeParties = () => {},
	source = '',
}) => {
	const { t } = useTranslation(['common']);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_trade_party',
		method : 'post',
	}, { manual: false });

	const onSubmit = async (values = {}) => {
		let newFilledDetails = { ...filledDetails };

		const { value: tradePartyTypeValue = {} } = tradePartyType;

		if (tradePartyTypeValue === 'paying_party') {
			newFilledDetails = {
				...newFilledDetails,
				billing_address: values,
			};
		}

		if (tradePartyTypeValue === 'collection_party') {
			newFilledDetails = {
				...newFilledDetails,
				documents: values,
			};
		}

		setFilledDetails(newFilledDetails);

		try {
			const {
				company_details = {},
				billing_address = {},
				bank_details = {},
				documents = {},
				verification_document = '',
			} = newFilledDetails;

			const {
				business_name = '',
				company_type = '',
				registration_number = '',
			} = company_details;

			const {
				tax_number = '',
				tax_number_document_url = '',
				address_type = '',
				country_id = '',
				is_sez = false,
				sez_proof = '',
				isAddressRegisteredUnderGst = false,
				poc_details: pocDetails = [],
				gst_list,
				billing_party_name,
				...restBillingAddressValues
			} = billing_address || {};

			const { image_url = '', ...restBankDetails } = bank_details;

			const {
				company_existence_proof = '',
				indemnification = '',
				verification_document: verification_document_collection_party = {},
			} = documents;

			if (pocDetails.length === 0) {
				Toast.info(t(`${translationKey}.toasts.info`));
				return;
			}

			const formattedPocDetails = formatPocDetails({ data: pocDetails });

			const orgPayingPartyDocs = [
				{
					name          : 'Trade Party Verification',
					document_type : 'verification_document',
					image_url     : verification_document.url,
					data          : {},
					source,
				},
			];

			const orgTradePartyDocs = [
				{
					name          : 'BankDetails',
					document_type : 'bank_account_details',
					image_url     : image_url.url || undefined,
					data          : { ...restBankDetails },
					source,
				},
				{
					name          : 'Company Existence Proof',
					document_type : 'business_address_proof',
					image_url     : company_existence_proof.url || undefined,
					data          : {},
					source,
				},
				{
					name          : 'Indemnification',
					document_type : 'indemnification_proof',
					image_url     : indemnification.url || undefined,
					data          : {},
					source,
				},
				{
					name          : 'Trade Party Verification',
					document_type : 'verification_document',
					image_url     : verification_document_collection_party?.url,
					data          : {},
					source,
				},
			];

			const payload = {
				organization_id     : orgResponse.id || '',
				business_name,
				company_type,
				registration_number : registration_number.toUpperCase(),
				country_id          : (company_details || {}).country_id,
				trade_party_type    : tradePartyType.value || '',
				is_tax_applicable   : !isAddressRegisteredUnderGst,
				poc_details         : formattedPocDetails,
				address_detail      : {
					...restBillingAddressValues,
					gst_list                : gst_list || undefined,
					is_sez,
					sez_proof               : sez_proof || undefined,
					tax_number              : tax_number.toUpperCase() || undefined,
					tax_number_document_url : tax_number_document_url || undefined,
					address_type            : address_type || undefined,
					country_id              : country_id || undefined,
					name                    : billing_party_name,
				},
				organization_trade_party_documents:
					tradePartyTypeValue === 'paying_party'
						? orgPayingPartyDocs
						: orgTradePartyDocs,
			};
			await trigger({
				data: payload,
			});

			Toast.success(t(`${translationKey}.toasts.success`));

			if (fetchOrganizationTradeParties) {
				setShowComponent('view_billing_addresses');
				fetchOrganizationTradeParties();
				setShowModal(false);
			}
		} catch (err) {
			Toast.error(err?.error);
		}
	};
	return {
		onSubmit,
		loading,
	};
};

export default useCreateOrgTradeParty;
