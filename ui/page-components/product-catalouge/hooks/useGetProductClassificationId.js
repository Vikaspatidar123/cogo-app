import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetProductClassificationId = ({
	setProductClassificationId,
	setProductDetailsfromApi,
	prefiledValues,
}) => {
	const { general } = useSelector((state) => state);
	const { scope } = general;
	const { trigger, loading } = useRequest({
		url     : 'saas/product/category',
		method  : 'get',
		authKey : 'get_saas_product_category',
	}, { manual: true });

	// const [{ loading: deleteProductApiLoading }, deleteProductTrigger] = useRequest({
	// 	url     : '/saas/product',
	// 	method  : 'delete',
	// 	authKey : 'delete_saas_product',
	// }, { manual: true });

	const getProductClassification = async () => {
		try {
			const response = await trigger({
				params: {
					hsCode: prefiledValues?.hscode,
				},
			});
			setProductClassificationId(response?.data?.productClassificationId);
			setProductDetailsfromApi(response?.data);
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	};

	useEffect(() => {
		if (prefiledValues?.hscode) getProductClassification();
	}, [prefiledValues?.hscode]);
	return loading;
};
export default useGetProductClassificationId;
