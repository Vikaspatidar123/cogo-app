import { useEffect } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import useRequest from '@/utils/request/useRequest';
import { getApiErrorString } from '@cogoport/front/utils';
import { useSelector } from '@cogoport/front/store';
import { toast } from '@cogoport/front/components/admin';
import controls from './get-documents-controls';

const useDocuments = ({ kycDetails, setKycDetails }) => {
	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const {
		verifications = [],
		twin_importer_exporter_id = '',
		twin_service_provider_id = '',
	} = partner;

	const account_type = twin_importer_exporter_id
		? 'importer_exporter'
		: 'service_provider';

	const getAccountType = () => {
		return [
			twin_importer_exporter_id ? 'importer_exporter' : '',
			twin_service_provider_id ? 'service_provider' : '',
		].filter((accountType) => accountType);
	};

	const getOrganizationDocumentsAPI = useRequest(
		'get',
		true,
		'partner',
	)('/get_channel_partner_documents', {
		params: {
			account_types: [account_type],
			filters: {
				document_type: 'business_address_proof',
				status: 'active',
			},
		},
	});

	const createChannelPartnerVerificationDocumentAPI = useRequest(
		'post',
		false,
		'partner',
	)('/create_channel_partner_document');

	const {
		fields = {},
		handleSubmit = () => {},
		formState = {},
		setValue = () => {},
		setError = () => {},
	} = useFormCogo(controls);

	const { data = [] } = getOrganizationDocumentsAPI;

	useEffect(() => {
		setValue('business_address_proof', data[0]?.image_url);

		if (data[0]?.rejection_reason) {
			setError('business_address_proof', {
				type: 'custom',
				message: `Reason of rejection : ${data[0]?.rejection_reason}`,
			});
		}
	}, [data]);

	const onSubmit = async (values = {}) => {
		try {
			const verification_data = verifications.filter((verification) => {
				return verification.account_type === account_type;
			});

			const body = {
				account_types: getAccountType(),
				name: 'Business Address Proof',
				document_type: 'business_address_proof',
				image_url: values.business_address_proof.url,
				verification_id: verification_data[0].id,
			};

			const res = await createChannelPartnerVerificationDocumentAPI.trigger({
				data: body,
			});

			toast.success('Business Address Proof added successfully!');

			setKycDetails({
				...kycDetails,
				verification_progress:
					res.data?.verification_progress || kycDetails.verification_progress,
			});
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	return {
		fields,
		handleSubmit,
		onSubmit,
		controls,
		formState,
		loading: createChannelPartnerVerificationDocumentAPI.loading,
	};
};

export default useDocuments;
