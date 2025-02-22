import { Toast } from '@cogoport/components';
import { useCallback, useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetListCoupons = ({ amount, currency }) => {
	const [filters, setFilters] = useState({});
	const { profile } = useSelector((s) => s);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_coupons',
		method : 'get',
	}, { manual: true });

	const fetchCoupons = useCallback(async () => {
		try {
			await trigger({
				params: {
					organization_id : profile?.organization.id,
					total_amount    : amount,
					currency,
					category        : 'saas_subscription',
					filters,
				},
			});
		} catch (error) {
			Toast.error('Could not fetch details.Please try again later');
		}
	}, [amount, currency, filters, profile?.organization.id, trigger]);

	useEffect(() => {
		fetchCoupons({ params: { filters } });
	}, [fetchCoupons, filters]);
	return {
		fetchCouponsLoading : loading,
		couponsList         : data?.list,
		setFilters,
		fetchCoupons,
	};
};

export default useGetListCoupons;
