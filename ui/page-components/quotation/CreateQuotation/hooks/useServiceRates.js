/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useServiceRates = ({ prioritySequence = 0, setValidateProduct }) => {
	const { organization } = useSelector((state) => state.profile);

	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/trade-engine/service-rates',
		authKey : 'get_saas_trade_engine_service_rates',
	}, { manual: true });

	const getServiceRates = async () => {
		try {
			await trigger({
				params: {
					prioritySequence,
					orgCountryId: organization?.country_id,
				},
			});
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong. Please try after sometime');
			setValidateProduct(false);
		}
	};

	useEffect(() => {
		getServiceRates();
	}, []);

	return {
		loading, serviceData: data,
	};
};

export default useServiceRates;
