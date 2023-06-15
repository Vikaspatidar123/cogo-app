import { useRequest } from '@/packages/request';

const useApplyCreditRequestCouponCode = ({ getCreditRequestResponse = {}, refetch = () => {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/apply_credit_request_coupon_code',
	}, {
		manual     : true,
		autoCancel : false,
	});

	const proceedToPay = async () => {
		try {
			await trigger({
				data: {
					credit_request_id : getCreditRequestResponse?.id,
					source            : 'app',
				},
			});
			refetch();
		} catch (e) {
			console.log(e);
		}
	};

	return { proceedToPay, loading, data };
};

export default useApplyCreditRequestCouponCode;
