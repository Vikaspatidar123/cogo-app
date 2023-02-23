import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSubscriptionActivateNow = () => {
	// const { trigger, loading } = useRequest(
	// 	'post',
	// 	false,
	// 	scope,
	// )('/subscription_activate_now');

	const [{ loading }, trigger] = useRequest({
		url    : '/subscription_activate_now',
		method : 'post',
	}, { manual: true });

	const subscriptionActivateNow = async (
		plan_pricing_id,
		setShowActivateModal,
		setShowModal,
	) => {
		try {
			await trigger({
				params: {
					plan_pricing_id,
				},
			});
			Toast.success('Plan Activated Successfully', {
				style: { background: '#ecfccb' },
			});
			setShowActivateModal(false);
			setShowModal(true);
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	};
	return {
		subscriptionActivateNow,
		activateLoading: loading,
	};
};

export default useSubscriptionActivateNow;
