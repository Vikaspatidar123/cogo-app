import { toast } from '@cogoport/components';
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
	const { trigger, loading } = useRequest('get', false, scope, {
		authkey: 'get_saas_product_category',
	})('saas/product/category');

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
			toast.error(error?.error?.message);
		}
	};

	useEffect(() => {
		if (prefiledValues?.hscode) getProductClassification();
	}, [prefiledValues?.hscode]);
	return loading;
};
export default useGetProductClassificationId;
