import { Toast } from '@cogoport/components';

import formatDaysPayload from '../utils/format-days-payload';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateDestinationDemurrageDays = ({
	data = {},
	rates = [],
	refetch = () => {},
	setShow,
}) => {
	const {
		query: { search_id },
	} = useSelector(({ general }) => ({
		query: general.query || {},
	}));

	const { service_rates = {} } = data || {};
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_spot_search_service',
			method : 'post',
		},
		{ manual: true },
	);
	const fclLocalsTradeTypes = [];

	Object.keys(service_rates || {}).forEach((key) => {
		if (service_rates?.[key]?.service_type === 'fcl_freight_local') {
			if (!fclLocalsTradeTypes.includes(service_rates?.[key]?.trade_type)) {
				fclLocalsTradeTypes.push(service_rates?.[key]?.trade_type);
			}
		}
	});

	const onSubmit = async (values) => {
		try {
			const payload = {
				id                  : search_id,
				service             : 'subsidiary',
				subsidiary_services : formatDaysPayload({ data, rates, values }),
			};

			await trigger({
				data: payload,
			});

			Toast.success('Days updated successfully');
			refetch();
			setShow(false);
		} catch (error) {
			Toast.error(error?.response?.data?.message
				? error?.response?.data?.message : getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		onSubmit,
	};
};

export default useUpdateDestinationDemurrageDays;
