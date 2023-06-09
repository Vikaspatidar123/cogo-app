import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';

const useGetProductCode = () => {
	const [{ loading }, trigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/bill/product-codes',
		authKey : 'get_saas_bill_product_codes',
	}, { manual: true });

	const getProductCode = async () => {
		try {
			const resp = await trigger({});
			return resp?.data;
		} catch (error) {
			Toast.error(error?.error?.message);
			return null;
		}
	};

	return {
		getProductCode,
		getProductCodeLoading: loading,
	};
};

export default useGetProductCode;
