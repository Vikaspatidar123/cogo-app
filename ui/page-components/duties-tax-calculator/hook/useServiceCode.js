import { useRequestBf } from '@/packages/request';

const useServiceCode = () => {
	const [{ loading }, trigger] = useRequestBf({
		url     : 'saas/bill/product-codes',
		authKey : 'get_saas_bill_product_codes',
		method  : 'get',
	}, { manual: true });

	const getServiceCode = async () => {
		try {
			const resp = await trigger({});
			return resp?.data;
		} catch (err) {
			return null;
		}
	};

	return {
		getServiceCode,
		serviceCodeLoading: loading,
	};
};

export default useServiceCode;
