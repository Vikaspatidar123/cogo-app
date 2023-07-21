import { useEffect, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetSummaryDetails = ({ activeTab, filters, sort }) => {
	const { profile } = useSelector((state) => state);
	const { organization = {} } = profile || {};
	const [{ data, loading }, trigger] = useRequestBf({
		method  : 'get',
		authKey : 'get_saas_insurance_list_summary',
		url     : 'saas/insurance/list/summary',
	}, { autoCancel: false, manual: true });

	const summary = useCallback(async () => {
		const { sortBy = undefined, sortType = undefined } = sort || {};
		try {
			await trigger({
				params: {
					source         : 'SAAS',
					organizationId : organization?.id,
					transitMode    : activeTab !== 'ALL' ? activeTab : undefined,
					sortBy,
					sortType,
					...filters,
				},
			});
		} catch (err) {
			console.error(err?.error?.message);
		}
	}, [activeTab, filters, organization?.id, sort, trigger]);

	useEffect(() => {
		if (organization?.id) {
			console.log('hey siummary');
			summary();
		}
	}, [organization?.id, summary]);

	return {
		summaryData    : data,
		summary,
		summaryLoading : summary.loading,
		loading,
	};
};
export default useGetSummaryDetails;
