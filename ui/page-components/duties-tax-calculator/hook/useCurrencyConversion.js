import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useCurrencyConversion = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_exchange_rate',
		method : 'get',
	}, { manual: true });

	const exchangeApi = async (from_cur, to_cur) => {
		try {
			const exData = await trigger({
				params: {
					from_currency : from_cur,
					to_currency   : to_cur,
				},
			});
			return exData;
		} catch (error) {
			Toast.error(error?.error, {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
			return null;
		}
	};

	return {
		exchangeApi,
		data,
		exchangeLoading: loading,
	};
};

export default useCurrencyConversion;
