import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useRequestBf } from '@/packages/request';

const useGetSummaryDetails = ({ activeTab, filters, sort }) => {
	const { profile } = useSelector((state) => state);
	const { organization = {} } = profile || {};
	const [{ data, loading }, trigger] = useRequestBf({
		method  : 'get',
		authkey : 'get_saas_insurance_list_summary',
		url     : 'saas/insurance/list/summary',
	});

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
			Toast.error(err?.error?.message);
		}
	}, [activeTab, filters, organization, sort, trigger]);

	useEffect(() => {
		summary();
	}, [filters, sort, activeTab, summary]);

	return {
		summaryData    : data,
		summary,
		summaryLoading : summary.loading,
		loading,
	};
};
export default useGetSummaryDetails;
