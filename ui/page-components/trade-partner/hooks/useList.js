/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect, useMemo } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useList = ({ activeTab, archived = false, sort }) => {
	const { sortBy, sortType } = sort || {};
	const { profile } = useSelector((s) => s);
	const { organization } = profile || {};
	const [apiData, setDataApi] = useState({});
	const [filters, setGlobalFilters] = useState({
		page       : 1,
		pageLimit  : 10,
		searchTerm : '',
		query      : '',
	});

	const [{ loading }, trigger] = useRequestBf({
		url     : '/saas/organization/partner/list',
		authKey : 'get_saas_organization_partner_list',
		method  : 'get',
	}, { manual: true });

	const getList = async () => {
		try {
			const resp = await trigger({
				params: {
					organizationId: organization.id,
					...filters,
					archived,
					sortBy,
					sortType,
				},
			});
			setDataApi(resp?.data);
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	useEffect(() => {
		getList();
	}, [activeTab, filters, sort]);

	useMemo(() => {
		setGlobalFilters({
			page      : 1,
			pageLimit : 10,
		});
	}, [activeTab]);

	return {
		getList,
		setGlobalFilters,
		filters,
		apiData,
		apiLoading: loading,
	};
};
export default useList;
