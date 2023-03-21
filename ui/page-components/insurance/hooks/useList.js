import { Toast } from '@cogoport/components';
import { useEffect, useState } from 'react';
import { useCallback } from 'react/cjs/react.production.min';
import { useSelector } from 'react-redux';

import { useRequestBf } from '@/packages/request';

const useList = ({ activeTab }) => {
	const { profile } = useSelector((state) => state);
	const [filters, setFilters] = useState({ page: 1, pageLimit: 10 });
	const [sort, setSort] = useState({});
	const { organization } = profile || {};
	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		authkey : 'get_saas_insurance_list',
		url     : '/saas/insurance/list',
	}, { manual: true });

	const transitModeMapping = (item) => {
		const mapping = {
			ALL   : '',
			OCEAN : 'SEA',
		};
		return mapping[item] || item;
	};
	const list = useCallback(() => {
		const { sortBy = undefined, sortType = undefined } = sort || {};
		try {
			trigger({
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
			Toast.error(err?.error?.message);
		}
	}, [activeTab, filters, organization, sort, trigger]);

	useEffect(() => {
		list();
	}, [activeTab, filters, sort, list]);

	return {
		data,
		list,
		setFilters,
		filters,
		loading,
		setSort,
		sort,
	};
};
export default useList;
