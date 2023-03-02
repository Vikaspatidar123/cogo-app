import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import { useSaasState } from '../../../common/context';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTotalRevenue = () => {
	const [totalRevenue, setTotalRevenue] = useState();
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};
	const [{ loading }, trigger] = useRequestBf({
		method  : 'get',
		url     : 'saas/product/total-revenue',
		authKey : 'get_saas_product_total_revenue',
	}, { manual: true });

	const fetchTotalRevenue = async () => {
		try {
			const resp = await trigger({
				params: {
					organizationId: organization?.id,
				},
			});
			setTotalRevenue(resp.data);
		} catch (error) {
			Toast.error(error.message || 'Something Went Wrong');
		}
	};
	useEffect(() => {
		fetchTotalRevenue();
	}, []);

	return {
		totalRevenue,
		loading,
	};
};

export default useTotalRevenue;
