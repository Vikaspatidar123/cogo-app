import { useState } from 'react';
import { toast } from '@cogoport/front/components';
import { useRequest } from '@cogo/commons/hooks';
// import request from '../../../common/utils/request';
import { useSaasState } from '../../../common/context';

const useCreateTrends = () => {
	const { general, profile } = useSaasState();
	const [loading, setLoading] = useState(false);
	const { scope } = general;

	const trend = useRequest('post', false, scope)('/create_freight_trend_subscription');

	const createTrend = async (origin, destination) => {
		try {
			setLoading(true);
			const requestData = {
				origin_port_id       : origin,
				destination_port_id  : destination,
				performed_by_user_id : profile.id,
				organization_id      : profile.organization.id,
			};

			const res = await trend.trigger({ data: requestData });

			setLoading(false);
			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);

			const { data } = res;
			toast.success('Freight Rate Trends succesfully added');
			return data;
		} catch (err) {
			toast.error(
				err?.message || 'Unable to create trend. Please try again.',
			);
			setLoading(false);
		}
	};

	return { loading, createTrend };
};

export default useCreateTrends;
