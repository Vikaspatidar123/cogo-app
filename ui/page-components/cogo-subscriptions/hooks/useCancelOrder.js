import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCancelOrder = ({ checkoutResponse = {} }) => {
	const { profile } = useSelector((s) => s);

	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/cancel_saas_subscription',
			method : 'post',
		},
		{ manual: true },
	);

	const cancelOrder = async () => {
		try {
			await trigger({
				data: {
					saas_subscription_customer_id : '',
					checkout_id                   : checkoutResponse?.id,
					performed_by_id               : profile?.id,
					performed_by_type             : 'user',
				},
			});
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	};

	return { cancelOrder, data, loading };
};

export default useCancelOrder;
