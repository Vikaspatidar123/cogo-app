import { toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import { useSaasState } from '../../../common/context';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTopProducts = () => {
	const [topProduct, setTopProduct] = useState([]);
	const { general, profile } = useSelector((state) => state);
	const { organization } = profile || {};
	const { scope } = general;
	const { trigger, loading } = useRequest('get', false, scope, {
		authkey: 'get_saas_product_top_products',
	})('/saas/product/top-products');

	const fetchTopProducts = async ({ productId }) => {
		try {
			const resp = await trigger({
				params: {
					organizationId : organization?.id,
					productId      : productId || undefined,
					limit          : 4,
				},
			});
			setTopProduct(resp.data);
		} catch (error) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		fetchTopProducts({ productId: '' });
	}, []);

	return {
		topProduct,
		loading,
		fetchTopProducts,
	};
};
export default useTopProducts;
