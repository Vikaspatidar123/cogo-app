import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useRequest } from '@/packages/request';

const useCreateOrganizationCreditRequest = ({ refetch = () => { } }) => {
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};

	const [{ loading, data }, trigger] = useRequest(
		{
			method: 'post',
			url: '/create_organization_credit_request',
		},
		{ manual: true },
	);

	const createOrganizationCreditRequest = useCallback(async ({ proofUrl, values }) => {
		const { tax_number = '', gst_proof = '' } = values || {};
		try {
			await trigger({
				data: {
					organization_id: organization?.id,
					business_name: profile?.name,
					tax_number,
					gst_proof: {
						document_extension: gst_proof?.split('.')?.[1],
						gst_proof_url: proofUrl,
						org_billing_address_id: '',
					},
					status: 'awaiting_user_inputs',
					source: 'app',
				},
			});
			refetch();
		} catch (e) {
			console.log(e);
		}
	}, [organization?.id, profile?.name, refetch, trigger]);

	return {
		loading,
		data,
		createOrganizationCreditRequest,
	};
};

export default useCreateOrganizationCreditRequest;
