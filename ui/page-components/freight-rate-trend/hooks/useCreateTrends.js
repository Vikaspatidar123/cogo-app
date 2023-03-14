import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateTrends = () => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trendTrigger] = useRequest({
		url    : '/create_freight_trend_subscription',
		method : 'post',
	}, { manual: true });

	const createTrend = async (origin, destination) => {
		try {
			const requestData = {
				origin_port_id       : origin,
				destination_port_id  : destination,
				performed_by_user_id : profile.id,
				organization_id      : profile.organization.id,
			};

			const res = await trendTrigger({ data: requestData });

			const { hasError } = res || {};

			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);

			const { data } = res;
			Toast.success('Freight Rate Trends succesfully added');
			return data;
		} catch (err) {
			Toast.error(
				err?.message || 'Unable to create trend. Please try again.',
			);
			return null;
		}
	};

	return { loading, createTrend };
};

export default useCreateTrends;
