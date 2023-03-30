import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';

const useServiceRates = ({ prioritySequence = 0 }) => {
	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/saas/trade-engine/service-rates',
		authKey : 'get_saas_trade_engine_service_rates',
		method  : 'get',
	}, { manual: true });

	const serviceRates = async () => {
		try {
			const resp = await trigger({
				params: {
					prioritySequence,
				},
			});
			return resp;
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong. Please try after sometime');
			return false;
		}
	};

	return { serviceRates, serviceRateData: data, serviceRatesLoading: loading };
};

export default useServiceRates;
