import { useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateCheckoutCogoPoint = ({
	max_redeemable_cogopoints,
	setError,
}) => {
	const {
		query: { checkout_id },
	} = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/update_checkout',
		method : 'post',
	}, { manual: true });

	const updateCheckoutCogoPoint = useCallback(async (cogopoints) => {
		if (cogopoints > max_redeemable_cogopoints) {
			setError(`Your balance is ${max_redeemable_cogopoints} cogoPoints`);
			return false;
		}
		const params = {
			id                  : checkout_id,
			redeemed_cogopoints : parseFloat(cogopoints),
		};

		const res = await trigger({
			data: params,
		});

		if (res.hasError) {
			setError('cannot apply cogoPoints');
			return false;
		}

		return true;
	}, [checkout_id, max_redeemable_cogopoints, setError, trigger]);

	return {
		loading,
		updateCheckoutCogoPoint,
	};
};

export default useUpdateCheckoutCogoPoint;
