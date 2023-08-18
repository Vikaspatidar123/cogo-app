import { useEffect, useState, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetCheckoutPromocodes = () => {
	const [filters, setFilters] = useState({});
	const {
		query: { checkout_id },
	} = useSelector(({ general }) => general);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_checkout_applicable_promocodes',
		method : 'get',
	}, { manual: true });

	const getCheckoutPromocodes = useCallback(() => {
		trigger({
			params: filters.q ? { checkout_id, filters } : { checkout_id },
		});
	}, [checkout_id, filters, trigger]);

	useEffect(() => {
		getCheckoutPromocodes();
	}, [filters, getCheckoutPromocodes]);

	const searchPromocode = (v) => {
		setFilters({ q: v });
	};

	return {
		loading,
		data: data || {},
		searchPromocode,
	};
};

export default useGetCheckoutPromocodes;
