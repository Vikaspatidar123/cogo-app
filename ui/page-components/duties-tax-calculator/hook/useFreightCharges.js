import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useFreightCharges = () => {
	// const createSpotSearchApi = useRequest('post', false)('/create_spot_search');

	const [{ loading:createSpotSearchLoading }, trigger] = useRequest({
		url    : 'create_spot_search',
		method : 'post',
	}, { manual: true });

	// const {
	// 	trigger: getSpotSearch,
	// 	data,
	// 	loading,
	// } = useRequest('get', false)('/get_spot_search');

	const [{ loading, data }, triggerGetSpotSearch] = useRequest({
		url    : 'get_spot_search',
		method : 'get',
	}, { manual: true });

	const getSpotSearchfn = async (id) => {
		try {
			await triggerGetSpotSearch({
				params: {
					id,
					intent: 'discovery',
				},
			});
		} catch (err) {
			Toast.error(err?.message, {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};
	const createSpotSearch = async (payload) => {
		try {
			const resp = await trigger({
				data: {
					...payload,
				},
			});
			getSpotSearchfn(resp?.data?.id);
		} catch (err) {
			Toast.error(err?.error?.search_type?.[0], {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};

	return {
		createSpotSearch,
		spotSearchLoading : createSpotSearchLoading || loading,
		spotSearchData    : data,
	};
};

export default useFreightCharges;
