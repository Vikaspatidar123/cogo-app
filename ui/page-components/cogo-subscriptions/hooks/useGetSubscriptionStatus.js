import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useGetSubscriptionStatus = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/saas_get_subscription_status',
		method : 'get',
	}, { manual: true });
	const getSubscriptionStatus = async ({ checkoutResponse }) => {
		const { checkout_id } = checkoutResponse || {};
		try {
			await trigger({
				params: {
					saas_checkout_id: checkout_id,
				},
			});
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return {
		getSubscriptionStatus,
		subscriptionStatusLoading : loading,
		subscriptionsStatusData   : data,
	};
};

export default useGetSubscriptionStatus;
