import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateCheckoutPromotion = () => {
	const {
		query: { checkout_id },
	} = useSelector(({ general }) => general);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/update_checkout_promotion',
		method : 'get',
	}, { manual: true });

	const updateCheckoutPromotion = async (promotion_id, status = 'active') => {
		const res = await trigger({
			params: { id: checkout_id, promotion_id, status },
		});

		Toast.success('Added Coupon');

		if (res.hasError) {
			Toast.warn('cannot apply discount');
			return false;
		}

		return true;
	};

	return {
		loading,
		updateCheckoutPromotion,
		data: data || {},
	};
};

export default useUpdateCheckoutPromotion;
