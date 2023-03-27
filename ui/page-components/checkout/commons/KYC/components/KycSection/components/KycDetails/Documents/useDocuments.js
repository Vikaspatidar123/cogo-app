import { Toast } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';
import { useEffect } from 'react';

import controls from './get-documents-controls';

import { useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useDocuments = ({
	channelPartnerDetails = {},
	kycDetails,
	setKycDetails,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_channel_partner_document',
		method : 'post',
	}, { manual: true });

	const [{ loading: getApiLoaidng }, getOrganizationDocumentsApi] = useRequest({
		url    : '/',
		method : 'get',
		params : {
			partner_id    : channelPartnerDetails.id,
			account_types : channelPartnerDetails.account_types,
			filters       : {
				document_type: 'business_address_proof',
			},
		},
	}, { manual: true });

	const {
		fields = {},
		handleSubmit = () => {},
		formState = {},
		setValue = () => {},
		control,
	} = useForm();

	const { data = [] } = getOrganizationDocumentsApi;

	useEffect(() => {
		setValue('business_address_proof', data?.[0]?.image_url);
	}, [data]);

	const onSubmit = async (values = {}) => {
		if (!values.business_address_proof?.url) {
			Toast.info('Please re-upload the document');
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
				image_url       : getByKey(values, 'business_address_proof.url'),
				verification_id : verification?.[0].id,
			};

			const response = await trigger({
				data: payload,
			});

			Toast.success('Business Address Proof added successfully!');

			setKycDetails({
				...kycDetails,
				verification_progress: {
					...kycDetails.verification_progress,
					...(getByKey(response, 'data.verification_progress') || {}),
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.data));
		}
	};

	return {
		fields,
		handleSubmit,
		onSubmit,
		controls,
		control,
		formState,
		createChannelPartnerVerificationDocumentLoading: loading,
		getApiLoaidng,
	};
};

export default useDocuments;
