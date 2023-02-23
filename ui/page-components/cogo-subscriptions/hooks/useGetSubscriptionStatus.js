import { useRequest, useScope } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';

const useGetSubscriptionStatus = () => {
	const { scope } = useScope();
	const { trigger, loading, data } = useRequest(
		'get',
		false,
		scope,
	)('/saas_get_subscription_status');
	const getSubscriptionStatus = async ({ checkoutResponse }) => {
		const { checkout_id } = checkoutResponse || {};
		try {
			await trigger({
				params: {
					saas_checkout_id: checkout_id,
				},
			});
		} catch (error) {
			toast.error(error?.message);
		}
	};
	return {
		getSubscriptionStatus,
		subscriptionStatusLoading: loading,
		subscriptionsStatusData: data,
	};
};

export default useGetSubscriptionStatus;
