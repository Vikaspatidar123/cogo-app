import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetServiceRates = (prioritySequence = 0) => {
	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		url     : 'saas/trade-engine/service-rates',
		authKey : 'get_saas_trade_engine_service_rates',
	}, { manual: true });

	const fetchServiceRates = async () => {
		try {
			await trigger({
				params: {
					prioritySequence,
				},
			});
		} catch (error) {
			Toast.error(error?.error?.message, {
				style: {
					color: 'black',
				},
			});
		}
	};

	useEffect(() => {
		if (prioritySequence >= 0) {
			fetchServiceRates();
		}
	}, [prioritySequence]);

	return {
		serviceRatesLoading : loading,
		serviceRateData     : data,
	};
};
export default useGetServiceRates;
