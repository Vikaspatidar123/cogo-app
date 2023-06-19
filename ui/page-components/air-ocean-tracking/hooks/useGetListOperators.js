import { useRequest } from '@/packages/request';

const useGetListOperators = ({ type }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_airline_from_airway_bill',
	});
};

export default useGetListOperators;
