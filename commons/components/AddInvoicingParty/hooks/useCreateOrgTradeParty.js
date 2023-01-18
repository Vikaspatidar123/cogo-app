import { toast } from '@cogoport/front/components/admin';
import showErrorsInToast from '@/utils/showErrorsInToast';
import useRequest from '@/temp/request/useRequest';

const formatPocDetails = ({ data }) => {
	return data.map((poc) => {
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
};

const useCreateOrgTradeParty = ({
	orgResponse = {},
	setShowComponent = () => {},
	tradePartyType = {},
	setShowModal = () => {},
	filledDetails = {},
	setFilledDetails = () => {},
	fetchOrganizationTradeParties = () => {},
}) => {
	const createOrgTradePartyApi = useRequest(
		'post',
		false,
	)('/create_organization_trade_party');

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

			const { company_existence_proof = '', indemnification = '' } = documents;

			if (pocDetails.length === 0) {
				toast.info('Please create at-least one POC before proceeding ');
				return;
			}

			const formattedPocDetails = formatPocDetails({ data: pocDetails });

			const orgTradePartyDocs = [
				{
					name: 'BankDetails',
					document_type: 'bank_account_details',
					image_url: image_url.url || undefined,
					data: { ...restBankDetails },
				},
				{
					name: 'Company Existence Proof',
					document_type: 'business_address_proof',
					image_url: company_existence_proof.url || undefined,
					data: {},
				},
				{
					name: 'Indemnification',
					document_type: 'indemnification_proof',
					image_url: indemnification.url || undefined,
					data: {},
				},
			];

			const payload = {
				organization_id: orgResponse.id || '',
				business_name,
				company_type,
				registration_number: registration_number.toUpperCase(),
				country_id: (company_details || {}).country_id,
				trade_party_type: tradePartyType.value || '',
				is_tax_applicable: !isAddressRegisteredUnderGst,
				poc_details: formattedPocDetails,
				address_detail: {
					...restBillingAddressValues,
					gst_list: gst_list || undefined,
					is_sez,
					sez_proof: sez_proof || undefined,
					tax_number: tax_number.toUpperCase() || undefined,
					tax_number_document_url: tax_number_document_url || undefined,
					address_type: address_type || undefined,
					country_id: country_id || undefined,
					name: billing_party_name,
				},
				organization_trade_party_documents:
					tradePartyTypeValue === 'paying_party'
						? undefined
						: orgTradePartyDocs,
			};
			await createOrgTradePartyApi?.trigger({
				data: payload,
			});

			toast.success(`Trade Party Created Successfully!!`);

			if (fetchOrganizationTradeParties) {
				setShowComponent('view_billing_addresses');
				fetchOrganizationTradeParties();
				setShowModal(false);
			}
		} catch (err) {
			showErrorsInToast(err?.error);
		}
	};
	return {
		onSubmit,
		loading: createOrgTradePartyApi.loading,
	};
};

export default useCreateOrgTradeParty;
