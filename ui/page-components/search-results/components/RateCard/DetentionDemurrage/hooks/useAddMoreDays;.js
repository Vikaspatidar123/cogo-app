import { useRequest, useScope } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import { getApiErrorString } from '@cogoport/front/utils';

const useAddMoreDays = ({ refetch }) => {
	const { scope } = useScope();

	const addDaysApi = useRequest(
		'post',
		false,
		scope,
	)('/create_spot_search_service');

	const fetchApi = async (payload) => {
		try {
			await addDaysApi.trigger({ data: payload });

			refetch();

			toast.success('Days Added Successfully');
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	return { fetchApi, loading: addDaysApi.loading };
};

export default useAddMoreDays;
