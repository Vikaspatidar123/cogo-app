import { Toast } from '@cogoport/components';
import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useFreightCharges = () => {
	const [{ loading:createSpotSearchLoading }, trigger] = useRequest({
		url    : 'create_spot_search',
		method : 'post',
	}, { manual: true });

	const [{ loading, data }, triggerGetSpotSearch] = useRequest({
		url    : '/get_spot_search',
		method : 'get',
	}, { manual: true });

	const getSpotSearchfn = useCallback(async (id) => {
		try {
			await triggerGetSpotSearch({
				params: {
					id,
					intent: 'discovery',
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	}, [triggerGetSpotSearch]);

	const createSpotSearch = useCallback(async (payload) => {
		try {
			const resp = await trigger({
				data: {
					...payload,
				},
			});
			getSpotSearchfn(resp?.data?.id);
		} catch (err) {
			Toast.error(err?.error?.search_type?.[0]);
		}
	}, [getSpotSearchfn, trigger]);

	return {
		createSpotSearch,
		spotSearchLoading : createSpotSearchLoading || loading,
		spotSearchData    : data,
	};
};

export default useFreightCharges;
