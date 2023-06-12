import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetServiceRates = (prioritySequence = 0) => {
	const { profile } = useSelector((state) => state);

	const { organization = {} } = profile || {};

	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/trade-engine/service-rates',
		authkey : 'get_saas_trade_engine_service_rates',
	}, { manual: true });

	const fetchServiceRates = async () => {
		try {
			await trigger({
				params: {
					prioritySequence,
					orgCountryId: organization?.country_id,
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prioritySequence]);

	return {
		serviceRatesLoading : loading,
		serviceRateData     : data,
	};
};
export default useGetServiceRates;
