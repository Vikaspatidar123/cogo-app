/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTopProducts = () => {
	const { t } = useTranslation(['common', 'productCatalogue']);

	const [topProduct, setTopProduct] = useState([]);
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};
	const [{ loading }, trigger] = useRequestBf({
		url     : '/saas/product/top-products',
		method  : 'get',
		authKey : 'get_saas_product_top_products',
	}, { manual: true });

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
			Toast.error(error?.message || t('productCatalogue:product_catalogue_toast_2'));
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
