import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useCurrencyConversion = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : 'get_exchange_rate',
	}, { manual: true });

	const getExchangeRate = async (from_cur, to_cur) => {
		try {
			const exData = await trigger({
				params: {
					from_currency : from_cur,
					to_currency   : to_cur,
				},
			});
			return exData.data;
		} catch (error) {
			Toast.error(error?.error);
			return null;
		}
	};
	return { getExchangeRate, loading };
};

export default useCurrencyConversion;
