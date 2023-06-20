import { useState, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useList = ({ sort }) => {
	const { sortBy, sortType } = sort || {};
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};
	const [apiData, setDataApi] = useState({});
	const [filters, setGlobalFilters] = useState({
		page: 1,
		pageLimit: 10,
		searchTerm: '',
	});
	const { date_range = {}, ...rest } = filters || {};

	const [{ loading: apiLoading }, tradeApitrigger] = useRequestBf(
		{
			url: '/saas/trade-engine/order-history',
			authKey: 'get_saas_trade_engine_order_history',
			method: 'get',
			autoCancel: false,
		},
		{ manual: true },
	);
	const checkList = Object?.keys(filters)?.length > 1;
	const getList = async () => {
		if (!checkList) {
			return;
		}
		try {
			const resp = await tradeApitrigger({
				params: {
					source: 'SAAS',
					organizationId: organization?.id,
					...date_range,
					...rest,
					sortBy,
					sortType,
				},
			});
			setDataApi(resp?.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (checkList || sort) getList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, sort]);

	return {
		setGlobalFilters,
		filters,
		apiData,
		apiLoading,
	};
};
export default useList;
