import { useState } from 'react';

import { useRequest } from '@/packages/request';
import { loadScript } from '@/ui/commons/utils';

const useApplyCreditRequestCouponCode = ({ getCreditRequestResponse = {}, refetch = () => {} }) => {
	const key = process.env.NODE_ENV === 'production' ? 'pay' : 'uat';

	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/apply_credit_coupon_code',
	}, {
		manual     : true,
		autoCancel : false,
	});

	const [buttonloading, setButtonLoading] = useState(false);

	const proceedToPay = async () => {
		try {
			const res = await trigger({
				data: {
					credit_request_id : getCreditRequestResponse?.id,
					source            : 'app',
				},
			});
			if (res?.data?.payment_data) {
				Promise.all([
					loadScript(
						`https://${key}.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.esm.js`,
					),
					loadScript(
						`https://${key}.billdesk.com/jssdk/v1/dist/billdesksdk.js`,
					),
				])
					.then(() => {
						setTimeout(() => {
							window.loadBillDeskSdk(res?.data?.payment_data?.billDeskConfig);
							setButtonLoading(false);
						}, 3000);
					})
					.catch((error) => {
						console.log(error);
					});
				return null;
			}
			refetch();
			return null;
		} catch (e) {
			console.log(e);
			return null;
		}
	};

	return { proceedToPay, loading: buttonloading || loading, data };
};

export default useApplyCreditRequestCouponCode;
