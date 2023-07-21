import { useEffect, useState, useCallback } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useList = ({ activeTab }) => {
	const { profile } = useSelector((state) => state);
	const [filters, setFilters] = useState({ page: 1, pageLimit: 10 });
	const [sort, setSort] = useState({});
	const { organization } = profile || {};
	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		authKey : 'get_saas_insurance_list',
		url     : '/saas/insurance/list',
	}, { manual: true, autoCancel: false });

	const transitModeMapping = (item) => {
		const mapping = {
			ALL   : '',
			OCEAN : 'SEA',
		};
		return mapping[item] || item;
	};
	const list = useCallback(async () => {
		const { sortBy = undefined, sortType = undefined } = sort || {};
		try {
			await trigger({
				params: {
					source         : 'SAAS',
					organizationId : organization?.id,
					searchTerm     : filters?.searchTerm,
					transitMode    : activeTab !== 'ALL' ? transitModeMapping(activeTab) : null,
					sortBy,
					sortType,
					...filters,
				},
			});
		} catch (err) {
			console.error(getApiErrorString(err));
		}
	}, [activeTab, filters, organization?.id, sort, trigger]);

	useEffect(() => {
		if (organization?.id) { list(); }
	}, [list, organization?.id]);

	return {
		data,
		setFilters,
		filters,
		loading,
		setSort,
		sort,
		refetch: list,
	};
};
export default useList;
