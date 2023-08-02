import { useRequest } from '@/packages/request';

const DEFAULT_PAGE_LIMIT = 2000;

const createOptions = (list = []) => (
	(list || []).map((ele) => ({
		...ele,
		value : ele?.id,
		label : ele?.short_name,
	}))
);

const useGetOperatorList = () => {
	const [{ data: shippingLineData }] = useRequest({
		method : 'get',
		url    : '/get_saas_container_shipping_lines',
	}, { manual: false });

	const [{ data: airLineData }] = useRequest({
		method : 'get',
		url    : '/list_operators',
		params : {
			filters: {
				operator_type: 'airline',
			},
			page_limit: DEFAULT_PAGE_LIMIT,
		},
	}, { manual: false });

	return {
		shippingLineData: createOptions(shippingLineData?.list), airLineData: createOptions(airLineData?.list),
	};
};

export default useGetOperatorList;
