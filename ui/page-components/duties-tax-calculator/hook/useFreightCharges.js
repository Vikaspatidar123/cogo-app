import toast from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useFreightCharges = () => {
	const createSpotSearchApi = useRequestBf('post', false)('/create_spot_search');

	const {
		trigger: getSpotSearch,
		data,
		loading,
	} = useRequest('get', false)('/get_spot_search');

	const getSpotSearchfn = async (id) => {
		try {
			await getSpotSearch({
				params: {
					id,
					intent: 'discovery',
				},
			});
		} catch (err) {
			toast.error(err?.message, {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};
	const createSpotSearch = async (payload) => {
		try {
			const resp = await createSpotSearchApi.trigger({
				data: {
					...payload,
				},
			});
			getSpotSearchfn(resp?.data?.id);
		} catch (err) {
			toast.error(err?.error?.search_type?.[0], {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};

	return {
		createSpotSearch,
		spotSearchLoading : createSpotSearchApi.loading || loading,
		spotSearchData    : data,
	};
};

export default useFreightCharges;
