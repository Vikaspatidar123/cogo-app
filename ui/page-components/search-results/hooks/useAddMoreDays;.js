import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useAddMoreDays = ({ refetch, setShow }) => {
	const [{ loading }, addDaysApi] = useRequest(
		{
			url    : 'create_spot_search_service',
			method : 'post',
		},
		{ manual: true },
	);

	const fetchApi = async (payload) => {
		try {
			await addDaysApi({ data: payload });
			refetch();
			setShow(false);
			Toast.success('Days Added Successfully');
		} catch (err) {
			Toast.error(err.data?.message);
		}
	};

	return { fetchApi, loading };
};

export default useAddMoreDays;
