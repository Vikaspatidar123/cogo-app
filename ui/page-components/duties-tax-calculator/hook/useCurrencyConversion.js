import toast from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useCurrencyConversion = () => {
	const exRate = useRequest('get', false, { autoCancel: false })(
		'get_exchange_rate',
	);
	const exchangeApi = async (from_cur, to_cur) => {
		try {
			const exData = await exRate.trigger({
				params: {
					from_currency : from_cur,
					to_currency   : to_cur,
				},
			});
			return exData.data;
		} catch (error) {
			toast.error(error?.error, {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
			return null;
		}
	};

	return {
		exchangeApi,
		exchangeLoading: exRate.loading,
	};
};

export default useCurrencyConversion;
