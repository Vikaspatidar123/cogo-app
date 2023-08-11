import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useUpdateCreditRequestPromotion = ({
	getCreditRequestResponse = {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/update_credit_promotion',
	}, {
		autoCancel: false,
	});

	const updateCreditPromotion = useCallback(async ({ type, coupon }) => {
		try {
			await trigger({
				params: {
					credit_id    : getCreditRequestResponse?.credit_id,
					promotion_id : coupon?.id,
					status       : type === 'applied' ? 'active' : 'inactive',
				},
			});
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}, [getCreditRequestResponse?.credit_id, trigger]);

	return { updateCreditPromotion, loading, data };
};

export default useUpdateCreditRequestPromotion;
