import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetDraftDetails = ({ policyId }) => {
	const [draftDetailsPrefilling, setDraftDetailsPrefilling] = useState({});
	const [trigger, { loading }] = useRequestBf({
		method  : 'get',
		authKey : 'get_saas_insurance_draft_details',
		url     : '/saas/insurance/draft/details',
	}, { manual: true });

	const response = async () => {
		try {
			const res = await trigger({
				params: {
					policyId,
				},
			});
			if (res?.data) {
				setDraftDetailsPrefilling(res?.data);
			}
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	};
	useEffect(() => {
		if (policyId) {
			response();
		}
	});
	return {
		draftDetails        : response,
		draftDetailsLoading : loading,
		draftDetailsPrefilling,
	};
};

export default useGetDraftDetails;
