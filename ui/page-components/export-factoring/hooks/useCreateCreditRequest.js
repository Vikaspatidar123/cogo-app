import { useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateOrganizationCreditRequest = ({ refetch = () => { } }) => {
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};

	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/create_credit',
		},
		{ manual: true },
	);

	const createOrganizationCreditRequest = useCallback(async ({ proofUrl, values }) => {
		const { tax_number = '', gst_proof = '', iec = '', org_billing_address_id = '' } = values || {};
		try {
			await trigger({
				data: {
					organization_id                     : organization?.id,
					business_name                       : profile?.name,
					tax_number,
					export_factoring_service_attributes : {
						gst_proof_doc : { doc_extension: gst_proof?.split('.')?.[1], doc_url: proofUrl },
						iec_number    : iec,
						org_billing_address_id,
						status        : 'awaiting_user_inputs',
					},
					platform : 'app',
					category : 'export_factoring',
				},
			});
			refetch();
		} catch (e) {
			console.error(e);
		}
	}, [organization?.id, profile?.name, refetch, trigger]);

	return {
		loading,
		data,
		createOrganizationCreditRequest,
	};
};

export default useCreateOrganizationCreditRequest;
