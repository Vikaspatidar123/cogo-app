import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

function useDeleteTracker({
	type = 'delete',

	saasSubscriptionId,
	setTrackers,

}) {
	const [{ loading }, trigger] = useRequest({
		url    : 'deactivate_saas_container_subscription',
		method : 'post',
	}, { manual: true });

	const disableTracker = async () => {
		let requestData = {};

		if (type === 'delete') {
			requestData = {
				status                         : 'canceled',
				saas_container_subscription_id : saasSubscriptionId,
				cancellation_reason            : 'user_cancelled',
			};
		} else {
			requestData = {
				status                         : 'completed',
				saas_container_subscription_id : saasSubscriptionId,
				cancellation_reason            : 'shipment_is_completed',
			};
		}

		try {
			await trigger({ data: requestData });

			setTrackers((prevTrackers) => ({
				...prevTrackers,
				list: (prevTrackers?.list || []).filter((item) => item.id !== saasSubscriptionId),
			}));
		} catch (err) {
			Toast.error('Unable to delete this tracker. Please try again.');
		}
	};

	return {
		loading,
		disableTracker,
	};
}

export default useDeleteTracker;
