import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useUpdateCreditRequestPromotion = ({
	setAction = () => {},
	getCreditRequestResponse = {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/update_credit_request_promotion',
	}, {
		autoCancel: false,
	});

	const updateCreditPromotion = useCallback(async ({ type, coupon }) => {
		try {
			await trigger({
				data: {
					credit_request_id : getCreditRequestResponse?.id,
					promotion_id      : coupon?.id,
					status            : type === 'applied' ? 'active' : 'inactive',
				},
			});
			setAction(type);
		} catch (e) {
			setAction('removed');
			console.log(e);
		}
	}, [getCreditRequestResponse?.id, setAction, trigger]);

	return { updateCreditPromotion, loading, data };
};

export default useUpdateCreditRequestPromotion;
