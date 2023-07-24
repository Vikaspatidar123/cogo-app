import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCancelSubscription = () => {
	const { profile } = useSelector((state) => state);

	const { organization = {}, id = '' } = profile || {};

	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/saas_create_callback_for_cancel_subscription',
		},
		{ manual: true, autoCancel: false },
	);

	const cancelSubscription = () => {
		try {
			trigger({
				data: {
					organization_id : organization?.id,
					performed_by_id : id,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};
	return { cancelSubscription, loading };
};

export default useCancelSubscription;
