import { useRequestBf } from '@/packages/request';

const useServiceCodes = () => {
	const [{ loading, data }] = useRequestBf({
		method  : 'get',
		url     : 'saas/bill/product-codes',
		authKey : 'get_saas_bill_product_codes',
	}, { manual: false });

	return {
		serviceCodeLoading : loading,
		serviceCodeData    : data,
	};
};

export default useServiceCodes;
