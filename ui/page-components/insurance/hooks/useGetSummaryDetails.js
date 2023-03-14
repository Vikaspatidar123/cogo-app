import { Toast } from '@cogoport/components';
import { useEffect } from 'react';
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

	const summary = async () => {
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
	};
	useEffect(() => {
		summary();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, sort, activeTab]);

	return {
		summaryData    : data,
		summary,
		summaryLoading : summary.loading,
		loading,
	};
};
export default useGetSummaryDetails;
