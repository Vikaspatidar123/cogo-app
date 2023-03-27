import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCurrencyConversion = ({ watchPolicyCurrency, query }) => {
	const { profile } = useSelector((state) => state);
	const [{ loading, data }, trigger] = useRequest({ method: 'get', url: 'get_money_exchange_external' });
	const exchangeRate = useCallback(async () => {
		try {
			if (watchPolicyCurrency) {
				await trigger({
					params: {
						from_currency   : watchPolicyCurrency,
						to_currency     : 'INR',
						price           : query,
						organization_id : profile?.organization?.id,
					},
				});
			}
		} catch (error) {
			Toast.error(error);
		}
	}, [trigger, watchPolicyCurrency, query, profile]);

	useEffect(() => {
		if (!isEmpty(query) && !isEmpty(watchPolicyCurrency) && watchPolicyCurrency === 'USD') {
			exchangeRate();
		}
	}, [exchangeRate, query, watchPolicyCurrency]);

	return { data: data?.data || { price: query }, loading };
};

export default useCurrencyConversion;
