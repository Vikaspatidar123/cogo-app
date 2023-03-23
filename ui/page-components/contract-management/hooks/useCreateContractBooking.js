import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useCreateContractBooking = () => {
	const { push } = useRouter();

	const [{ loading, data }, trigger] = useRequest({
		url    : '/create_contract_checkout',
		method : 'post',
	}, { manual: true });

	const createBooking = async (payload) => {
		const { data: payloadData, ...rest } = payload || {};

		try {
			const res = await trigger({
				data: {
					...rest,
					data: {
						...payloadData,
						shipping_line_id: payloadData?.shipping_line_id || undefined,
						cargo_weight_per_container:
							payloadData?.cargo_weight_per_container || undefined,
					},
				},
			});

			push(
				'/checkout/[checkout_id]?checkoutType=contract',
				`/checkout/${res.data?.id}?checkoutType=contract`,
			);
		} catch (error) {
			if (error?.error?.message) {
				Toast.error(error?.error?.message);
			} else {
				Toast.error(getApiErrorString(error?.data));
			}
		}
	};

	return {
		data,
		loading,
		createBooking,
	};
};

export default useCreateContractBooking;
