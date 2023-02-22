import { Toast } from '@cogoport/components';
import { useState, useEffect, useMemo } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useList = ({ sort }) => {
	const { sortBy, sortType } = sort || {};
	const {
		profile,
	} = useSelector((state) => state);
	const { organization } = profile || {};
	const [apiData, setDataApi] = useState({});
	const [filters, setGlobalFilters] = useState({
		page       : 1,
		pageLimit  : 10,
		searchTerm : '',
	});
	const { date_range = {}, ...rest } = filters || {};

	const [{ apiLoading }, tradeApitrigger] = useRequestBf({
		url     : '/saas/trade-engine/order-history',
		authKey : 'get_saas_trade_engine_order_history',
		method  : 'get',
	}, { manual: true });

	const getList = async () => {
		try {
			const resp = await tradeApitrigger({
				params: {
					source         : 'SAAS',
					organizationId : organization?.id,
					...date_range,
					...rest,
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
	}, [filters, sort]);

	useMemo(() => {
		setGlobalFilters({
			page      : 1,
			pageLimit : 10,
		});
	}, []);

	return {
		getList,
		setGlobalFilters,
		filters,
		apiData,
		apiLoading,
	};
};
export default useList;
