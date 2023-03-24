import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateCheckout = (serviceId) => {
	const {
		query: { checkout_id },
	} = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/update_checkout_service',
		method : 'post',
	}, { manual: true });

	const updateCheckout = async (data) => {
		if (isEmpty(data) || loading) {
			return;
		}

		try {
			const params = {
				id                              : checkout_id,
				fcl_freight_services_attributes : [
					{
						id: serviceId,
						...(data || {}),
					},
				],
				service: 'fcl_freight',
			};

			await trigger({
				data: params,
			});

			Toast.success('Added Successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err.data));
		}
	};

	return {
		loading,
		updateCheckout,
	};
};

export default useUpdateCheckout;
