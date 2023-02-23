import { Toast } from '@cogoport/components';

import usePayment from './usePayment';

import { useRequestBf } from '@/packages/request';

const useGetProductCode = () => {
	const { initiatePayment } = usePayment();

	const [{ loading }, trigger] = useRequestBf({
		url     : '/saas/bill/product-codes',
		authKey : 'get_saas_bill_product_codes',
		method  : 'get',
	}, { manual: true });

	const getProductCode = async ({ draftResponse = {}, services = {} }) => {
		try {
			const resp = await trigger({
				params: {},
			});
			if (resp?.data) {
				initiatePayment({
					res          : draftResponse,
					services,
					productCodes : resp?.data,
				});
			}
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	};

	return {
		getProductCode,
		getProductCodeLoading: loading,
	};
};

export default useGetProductCode;
