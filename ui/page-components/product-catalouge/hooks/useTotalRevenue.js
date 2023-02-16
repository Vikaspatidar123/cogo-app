import { toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import { useSaasState } from '../../../common/context';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTotalRevenue = () => {
	const [totalRevenue, setTotalRevenue] = useState();
	const { general, profile } = useSelector((state) => state);
	const { organization } = profile || {};
	const { scope } = general;
	const { trigger, loading } = useRequest('get', false, scope, {
		authkey: 'get_saas_product_total_revenue',
	})('saas/product/total-revenue');

	const fetchTotalRevenue = async () => {
		try {
			const resp = await trigger({
				params: {
					organizationId: organization?.id,
				},
			});
			setTotalRevenue(resp.data);
		} catch (error) {
			toast.error(error.message);
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
