import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequestBf } from '@/packages/request';

const useServiceRates = ({ prioritySequence = 0, setOpenDataModal }) => {
	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		url     : 'saas/trade-engine/service-rates',
		authKey : 'get_saas_trade_engine_service_rates',
	}, { manual: true });

	const getServiceRates = async () => {
		try {
			await trigger({
				params: {
					prioritySequence,
				},
			});
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong. Please try after sometime');
			setOpenDataModal(false);
		}
	};

	useEffect(() => {
		getServiceRates();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loading, serviceData: data,
	};
};

export default useServiceRates;
