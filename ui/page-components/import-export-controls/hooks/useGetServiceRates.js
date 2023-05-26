import { useEffect } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';
import { useSaasState } from '../../../common/context';

const useGetServiceRates = (prioritySequence = 0) => {
	const { profile = {} } = useSaasState();
	const { organization = {} } = profile || {};
	const { data, trigger, loading } = useRequest('get', false, 'saas', {
		authkey: 'get_saas_trade_engine_service_rates',
	})('/saas/trade-engine/service-rates');

	const fetchServiceRates = async () => {
		try {
			await trigger({
				params: {
					prioritySequence,
					orgCountryId: organization?.country_id,
				},
			});
		} catch (error) {
			toast.error(error?.error?.message, {
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
		serviceRatesLoading: loading,
		serviceRateData: data,
	};
};
export default useGetServiceRates;
