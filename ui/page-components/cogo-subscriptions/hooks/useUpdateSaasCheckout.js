import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useUpdateSaasCheckout = ({ checkoutResponse }) => {
	const [couponCode, setCouponCode] = useState({});

	const [{ loading, data }, trigger] = useRequest({
		url    : '/update_saas_checkout',
		method : 'post',
	}, { manual: true });

	const applyPromoCode = async ({ item, value }) => {
		const { id } = item || {};
		try {
			await trigger({
				data: {
					promotion_id     : value === 'apply' ? id : '',
					saas_checkout_id : checkoutResponse?.checkout_id,
				},
			});
		} catch (error) {
			setCouponCode({});
			Toast.error('Could not apply coupon.Sorry for the inconvenience');
		}
	};

	return {
		applyPromoCode,
		applyCouponLoading : loading,
		promoCodeData      : data,
		setCouponCode,
		couponCode,
	};
};

export default useUpdateSaasCheckout;
