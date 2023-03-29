import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useAddMoreDays = ({ refetch }) => {
	const [{ loading }, addDaysApi] = useRequest(
		{
			url    : 'create_spot_search_service',
			method : 'post',
		},
		{ manual: true },
	);

	const fetchApi = async (payload) => {
		try {
			await addDaysApi.trigger({ data: payload });

			refetch();

			Toast.success('Days Added Successfully');
		} catch (err) {
			Toast.error(err.data?.message);
		}
	};

	return { fetchApi, loading };
};

export default useAddMoreDays;
