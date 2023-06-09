import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useRequest } from '@/packages/request';

const useCreateOrganizationCreditRequest = () => {
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'create_organization_credit_request',
		},
		{ manual: true },
	);

	const createOrganizationCreditRequest = useCallback(({ image_url, values }) => {
		const { gst = '', gst_proof = '' } = values || {};
		try {
			trigger({
				data: {
					organization_id : organization?.id,
					business_name   : profile?.name,
					tax_number      : gst,
					gst_proof       : {
						document_extension     : gst_proof?.split('.')?.[1],
						gst_proof_url          : image_url,
						org_billing_address_id : '',
					},
					status : 'awaiting_user_inputs',
					source : 'app',
				},
			});
		} catch (e) {
			console.log(e);
		}
	}, [organization?.id, profile?.name, trigger]);

	return {
		loading,
		data,
		createOrganizationCreditRequest,
	};
};

export default useCreateOrganizationCreditRequest;
