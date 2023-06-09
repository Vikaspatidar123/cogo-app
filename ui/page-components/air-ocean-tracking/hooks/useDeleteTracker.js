import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const MAPPING = {
	ocean: {
		URL                 : '/deactivate_saas_container_subscription',
		SUBSCRIPTION_ID_KEY : 'saas_container_subscription_id',
	},
	air: {
		URL                 : '/deactivate_saas_air_subscription',
		SUBSCRIPTION_ID_KEY : 'saas_air_subscription_id',
	},
};

const useDeleteTracker = ({ name = '', id = '', closeHandler, activeTab }) => {
	const { URL, SUBSCRIPTION_ID_KEY } = MAPPING?.[activeTab] || {};
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : URL,
	}, { manual: true });

	const getPayload = () => {
		if (name === 'delete') {
			return {
				status                : 'canceled',
				[SUBSCRIPTION_ID_KEY] : id,
				cancellation_reason   : 'user_cancelled',
			};
		}
		return {
			status                : 'completed',
			[SUBSCRIPTION_ID_KEY] : id,
			cancellation_reason   : 'shipment_is_completed',
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
