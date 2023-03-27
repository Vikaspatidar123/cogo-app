import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetDraftDetails = ({ policyId }) => {
	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		authKey : 'get_saas_insurance_draft_details',
		url     : '/saas/insurance/draft/details',
	}, { manual: true });

	const response = useCallback(async () => {
		try {
			await trigger({
				params: {
					policyId,
				},
			});
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	}, [policyId, trigger]);

	useEffect(() => {
		if (policyId) {
			response();
		}
	}, [policyId, response]);
	return {
		draftDetails           : response,
		draftDetailsLoading    : loading,
		draftDetailsPrefilling : data,
	};
};

export default useGetDraftDetails;
