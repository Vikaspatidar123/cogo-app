import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useUpdateCreditRequestPromotion = ({
	setAction = () => {},
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
			setAction(type);
		} catch (e) {
			setAction('removed');
			console.error(e);
		}
	}, [getCreditRequestResponse?.id, setAction, trigger]);

	return { updateCreditPromotion, loading, data };
};

export default useUpdateCreditRequestPromotion;
