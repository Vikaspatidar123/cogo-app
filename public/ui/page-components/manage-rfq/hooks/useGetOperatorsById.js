import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import flattenErrorToString from '../helpers/getApiErrorString';

import { useRequest } from '@/packages/request';

const useGetOperatorsById = ({ setShippingLinesDetails }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_operators',
	}, { manual: true });

	const getOperators = async (ids, index, type, mode) => {
		try {
			let list = [];
			if (!isEmpty(ids)) {
				const res = await trigger({
					params: {
						filters    : { id: ids },
						page_limit : 100,
					},
				});
				list = res?.data?.list;
			}

			setShippingLinesDetails((prev) => ({
				...prev,
				[mode]: {
					...prev?.[mode],
					[index]: {
						...(prev?.[mode]?.[index] || {}),
						[type]: list,
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
