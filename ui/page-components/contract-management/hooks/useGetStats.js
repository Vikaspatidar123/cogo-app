import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useGetStats = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_contract_stats',
		method : 'get',
	}, { manual: true });

	const getStats = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						service_types : ['fcl_freight', 'lcl_freight', 'air_freight'],
						movement_type : ['international'],
					},
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	}, [trigger]);

	useEffect(() => {
		getStats();
	}, [getStats]);

	return {
		data,
		loading,
	};
};
export default useGetStats;
