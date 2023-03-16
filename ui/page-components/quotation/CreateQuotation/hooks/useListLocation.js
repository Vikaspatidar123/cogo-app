import { useRequest } from '@/packages/request';

const useListLocation = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_locations',
	}, { manual: true });

	const getPortDetails = async (filter) => {
		try {
			const resp = await trigger({
				params: {
					filters    : { ...filter },
					includes   : { default_params_required: true },
					page_limit : 20,
				},
			});
			return resp?.data?.list[0];
		} catch (err) {
			return false;
		}
	};

	return {
		getPortDetails,
		locationLoading: loading,
	};
};

export default useListLocation;
