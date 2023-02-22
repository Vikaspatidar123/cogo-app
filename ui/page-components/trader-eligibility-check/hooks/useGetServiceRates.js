import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';

const useGetServiceRates = () => {
	// const { data, trigger, loading } = useRequest('get', false, 'saas', {
	// 	authkey: 'get_saas_trade_engine_service_rates',
	// })('saas/trade-engine/service-rates');

	const [{ data, loading }, trigger] = useRequestBf({
		url     : 'saas/trade-engine/service-rates',
		authKey : 'get_saas_trade_engine_service_rates',
		method  : 'get',
	}, { manual: true });

	const fetchServiceRates = async (priority_sequence = 0) => {
		try {
			await trigger({
				params: {
					prioritySequence: priority_sequence,
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

	return {
		fetchServiceRates,
		serviceRatesLoading : loading,
		serviceRates        : data,
	};
};
export default useGetServiceRates;
