import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useCurrencyConversion = ({ watchCurrency = '', orgCurrency = '', landingPageCall = false }) => {
	const [{ loading, data: exchangeRate }, trigger] = useRequest({
		method : 'get',
		url    : 'get_exchange_rate',
	}, { manual: true });

	const getExchangeRate = useCallback(async (fromCur, toCur) => {
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
	}, [trigger]);

	useEffect(() => {
		if (watchCurrency && landingPageCall) {
			getExchangeRate(orgCurrency, watchCurrency);
		}
	}, [getExchangeRate, landingPageCall, orgCurrency, watchCurrency]);

	return { getExchangeRate, loading, exchangeRate };
};

export default useCurrencyConversion;
