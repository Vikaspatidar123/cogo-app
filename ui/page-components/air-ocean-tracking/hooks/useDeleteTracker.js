import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useDeleteTracker = ({ name = '', id = '', closeHandler }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/deactivate_saas_container_subscription',
	}, { manual: true });

	const getPayload = () => {
		if (name === 'delete') {
			return {
				status                         : 'canceled',
				saas_container_subscription_id : id,
				cancellation_reason            : 'user_cancelled',
			};
		}
		return {
			status                         : 'completed',
			saas_container_subscription_id : id,
			cancellation_reason            : 'shipment_is_completed',
		};
	};

	const deleteArchiveHandler = async () => {
		try {
			const payload = getPayload();
			const resp = await	trigger({
				data: payload,
			});

			if (resp.data?.result) {
				Toast.success(`Successfully ${name} tracker`);
				closeHandler();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading, deleteArchiveHandler,
	};
};

export default useDeleteTracker;
