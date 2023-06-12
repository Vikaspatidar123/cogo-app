import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCapturePayment = () => {
	const { profile = {} } = useSelector((s) => s);

	const [{ data }, trigger] = useRequestBf({
		url     : '/saas/payment/checkout',
		authKey : 'post_saas_payment_checkout',
		method  : 'post',
	}, { manual: true });

	const capturePayment = async ({
		tokenGeneratedResponse = {},
		paymentInitiationResponse = {},
		isThreeDsEnabled = false,
	}) => {
		const { saasPaymentId } = paymentInitiationResponse || {};

		const { token } = tokenGeneratedResponse || {};
		try {
			const resp = await trigger({
				data: {
					tokenId       : token,
					saasPaymentId,
					enableThreeDS : isThreeDsEnabled,
					userId        : profile?.id,
				},
			});
			if (resp?.data) {
				window.open(resp?.data?.link, '_self');
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return { capturePayment, data };
};

export default useCapturePayment;
