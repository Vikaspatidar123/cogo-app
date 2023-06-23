import { Toast } from '@cogoport/components';

import flattenErrorToString from '../helpers/getApiErrorString';

import { useRequest } from '@/packages/request';

const useGetOperatorsById = ({ setShippingLinesDetails }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_operators',
	}, { manual: true });

	const getOperators = async (ids, index, type, mode) => {
		try {
			const res = await trigger({
				params: {
					filters    : { id: ids },
					page_limit : 100,
				},
			});
			setShippingLinesDetails((prev) => ({
				...prev,
				[mode]: {
					...prev?.[mode],
					[index]: {
						...(prev?.[mode]?.[index] || {}),
						[type]: res.data.list,
					},
				},
			}));
		} catch (err) {
			const { message = '' } = { ...err };
			if (message) Toast.error(flattenErrorToString(err?.data));
		}
	};

	return { operatorsLoading: loading, getOperators };
};

export default useGetOperatorsById;
