import { Toast } from '@cogoport/components';
import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useFreightCharges = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_spot_search',
	}, { manual: true });

	const [{ loading:getSpotSearchloading, data:getSpotData }, getSpotSearch] = useRequest({
		method : 'get',
		url    : '/get_spot_search',
	}, { manual: true });

	const getSpotSearchfn = useCallback(async (id) => {
		try {
			await getSpotSearch({
				params: {
					id,
					intent: 'discovery',
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	}, [getSpotSearch]);

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
		getSpotSearchfn,
		createSpotSearch,
		loading     : loading || getSpotSearchloading,
		apiResponse : getSpotData,
	};
};

export default useFreightCharges;
