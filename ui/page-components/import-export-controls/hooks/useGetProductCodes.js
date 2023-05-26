import { Toast } from '@cogoport/components';
import { useCallback, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetProductCode = () => {
	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/bill/product-codes',
		authkey : 'get_saas_bill_product_codes',
	}, { manual: true });

	const getProductCode = useCallback(async () => {
		try {
			await trigger({});
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	}, [trigger]);

	useEffect(() => {
		getProductCode();
	}, [getProductCode]);

	return {
		getProductCodeLoading : loading,
		productCode           : data,
	};
};

export default useGetProductCode;
