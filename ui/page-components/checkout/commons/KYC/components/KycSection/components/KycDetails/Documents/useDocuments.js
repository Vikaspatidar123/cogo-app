import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import { useFormCogo } from '@cogoport/front/hooks';
import { get, getApiErrorString } from '@cogoport/front/utils';
import { useEffect } from 'react';

import controls from './get-documents-controls';

const useDocuments = ({
	channelPartnerDetails = {},
	kycDetails,
	setKycDetails,
}) => {
	const getOrganizationDocumentsApi = useRequest(
		'get',
		true,
		'partner',
	)('/get_channel_partner_documents', {
		params: {
			partner_id    : channelPartnerDetails.id,
			account_types : channelPartnerDetails.account_types,
			filters       : {
				document_type: 'business_address_proof',
			},
		},
	});

	const createChannelPartnerVerificationDocumentApi = useRequest(
		'post',
		false,
		'partner',
	)('/create_channel_partner_document');

	const {
		fields = {},
		handleSubmit = () => {},
		formState = {},
		setValue = () => {},
	} = useFormCogo(controls);

	const { data = [] } = getOrganizationDocumentsApi;

	useEffect(() => {
		setValue('business_address_proof', data?.[0]?.image_url);
	}, [data]);

	const onSubmit = async (values = {}) => {
		if (!values.business_address_proof?.url) {
			toast.info('Please re-upload the document');
			return;
		}

		try {
			const {
				id,
				verification = [],
				twin_importer_exporter_id = '',
				twin_service_provider_id = '',
			} = channelPartnerDetails;

			const accountTypes = [
				twin_importer_exporter_id ? 'importer_exporter' : '',
				twin_service_provider_id ? 'service_provider' : '',
			].filter((accountType) => accountType);

			const payload = {
				partner_id      : id,
				account_types   : accountTypes,
				name            : 'Business Address Proof',
				document_type   : 'business_address_proof',
				image_url       : get(values, 'business_address_proof.url'),
				verification_id : verification?.[0].id,
			};

			const response =				await createChannelPartnerVerificationDocumentApi.trigger({
				data: payload,
			});

			toast.success('Business Address Proof added successfully!');

			setKycDetails({
				...kycDetails,
				verification_progress: {
					...kycDetails.verification_progress,
					...(get(response, 'data.verification_progress') || {}),
				},
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
		createChannelPartnerVerificationDocumentLoading:
			createChannelPartnerVerificationDocumentApi.loading,
	};
};

export default useDocuments;
