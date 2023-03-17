import { useRequestBf } from '@/packages/request';

const useServiceCodes = () => {
	const [{ loading }, trigger] = useRequestBf({
		method  : 'get',
		url     : 'saas/bill/product-codes',
		authKey : 'get_saas_bill_product_codes',
	}, { manual: true });

	const getServiceCode = async () => {
		try {
			const resp = await trigger({});
			return resp?.data;
		} catch (err) {
			console.log(err);
			return false;
		}
	};
	return {
		getServiceCode,
		serviceCodeLoading: loading,
	};
};

export default useServiceCodes;
