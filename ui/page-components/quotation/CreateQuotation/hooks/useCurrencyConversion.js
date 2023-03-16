import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useCurrencyConversion = ({ watchCurrency = '', orgCurrency = '', landingPageCall = false }) => {
	const [{ loading, data: exchangeRate }, trigger] = useRequest({
		method : 'get',
		url    : 'get_exchange_rate',
	}, { manual: true });

	const getExchangeRate = async (fromCur, toCur) => {
		try {
			if (fromCur === toCur) return 1;
			const exData = await trigger({
				params: {
					from_currency : fromCur,
					to_currency   : toCur,
				},
			});
			return exData.data;
		} catch (error) {
			Toast.error(error?.error);
			return null;
		}
	};

	useEffect(() => {
		if (watchCurrency && landingPageCall) {
			getExchangeRate(orgCurrency, watchCurrency);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchCurrency]);

	return { getExchangeRate, loading, exchangeRate };
};

export default useCurrencyConversion;
