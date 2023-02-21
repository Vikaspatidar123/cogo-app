import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetProductClassificationId = ({
	setProductClassificationId,
	setProductDetailsfromApi,
	prefiledValues,
}) => {
	const [{ loading }, trigger] = useRequestBf({
		url     : 'saas/product/category',
		method  : 'get',
		authKey : 'get_saas_product_category',
	}, { manual: true });

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
