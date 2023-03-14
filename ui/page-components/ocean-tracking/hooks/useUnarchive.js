import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

function useUnarchive({

	saasSubscriptionId,

}) {
	const [{ loading }, trigger] = useRequest({
		url    : 'unarchive_saas_container_subscription',
		method : 'post',
	}, { manual: true });

	const disableTracker = async () => {
		let requestData = {};
		requestData = {
			status                         : 'active',
			saas_container_subscription_id : saasSubscriptionId,
		};

		try {
			const res = await trigger({ data: requestData });
			const { hasError, data } = res || {};
			Toast.error(data?.message);
			if (hasError) throw new Error();

			console.log(res, 'res');
		} catch (err) {
			Toast.error(err?.data?.message);
		}
	};

	return {
		loading,
		disableTracker,
	};
}

export default useUnarchive;
