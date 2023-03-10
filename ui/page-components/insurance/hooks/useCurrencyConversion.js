import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useCurrencyConversion = () => {
	const [{ loading }, trigger] = useRequest({ method: 'get', url: 'get_exchange_rate' });
	const exchangeRate = async (setExchangeRateResponse) => {
		try {
			const exchangeResponse = await trigger({
				params: {
					from_currency : 'USD',
					to_currency   : 'INR',
				},
			});
			setExchangeRateResponse(exchangeResponse?.data);
		} catch (error) {
			Toast.error(error);
		}
	};
	return { exchangeRate, loading };
};

export default useCurrencyConversion;
