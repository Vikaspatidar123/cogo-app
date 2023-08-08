import usePayment from './usePayment';

import { useRequestBf } from '@/packages/request';

const useGetProductCode = () => {
	const { initiatePayment, loading: paymentLoading } = usePayment();

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/saas/bill/product-codes',
			authKey : 'get_saas_bill_product_codes',
			method  : 'get',
		},
		{ manual: true },
	);

	const getProductCode = async ({ draftResponse = {}, services = {}, address = {} }) => {
		try {
			const resp = await trigger({
				params: {},
			});
			if (resp?.data) {
				initiatePayment({
					res          : draftResponse,
					services,
					productCodes : resp?.data,
					address,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return {
		getProductCode,
		getProductCodeLoading: loading || paymentLoading,
	};
};

export default useGetProductCode;
