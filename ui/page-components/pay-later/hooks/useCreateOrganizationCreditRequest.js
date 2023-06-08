import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useRequest } from '@/packages/request';

const useCreateOrganizationCreditRequest = () => {
	const { profile:{ organization } } = useSelector((state) => state);
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'create_organization_credit_request',
		},
		{ manual: true },
	);

	const createOrganizationCreditRequest = useCallback(() => {
		try {
			trigger({
				data: {
					organization_id : organization?.id,
					business_name   : '',
					tax_number      : '',
					gst_proof       : {
						document_extension : '',
						gst_proof_url      : '',
					},
				},
			});
		} catch (e) {
			console.log(e);
		}
	}, [organization?.id, trigger]);

	return {
		loading,
		data,
		createOrganizationCreditRequest,
	};
};

export default useCreateOrganizationCreditRequest;
