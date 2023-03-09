import { Toast } from '@cogoport/components';
import { useRequest } from '@/packages/request';

const useCreateFreightRate = () => {
	const [{ loading }, freckTrackerTrigger] = useRequest({
		url    : '/create_freight_trend_rate',
		method : 'post',
	}, { manual: true });

	const createTrendRate = async (formattedValues) => {
		const {
			commodity,
			price_select,
			destination_port_id,
			endDate,
			origin_port_id,
			price_number,
			startDate,
			validity_end,
			validity_start,
			volume,
		} = formattedValues;
		try {
			const requestData = {
				commodity,
				currency : price_select,
				destination_port_id,
				endDate,
				origin_port_id,
				price    : price_number,
				startDate,
				validity_end,
				validity_start,
				volume,
			};
			const res = await freckTrackerTrigger({ data: requestData });
			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);

			const { data } = res;

			return data;
		} catch (err) {
			Toast.error(err?.message || 'Unable to create Trend Rate. Please try again.');
			return null;
		}
	};

	return { loading, createTrendRate };
};

export default useCreateFreightRate;
