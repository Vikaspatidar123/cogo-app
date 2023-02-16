import toast from '@cogoport/components';

import { useRequestBf } from '@/packages/request';

const useServiceRates = ({ prioritySequence = 0 }) => {
	const [{ loading, data }, trigger] = useRequestBf({
		url     : 'saas/trade-engine/service-rates',
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
			toast.error(error?.message || 'Something went wrong. Please try after sometime', {
				autoClose : 2000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
			return false;
		}
	};

	return { serviceRates, serviceRateData: data, serviceRatesLoading: loading };
};

export default useServiceRates;
