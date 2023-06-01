import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateCheckout = ({ serviceId, refetch, type = '' }) => {
	const {
		query: { checkout_id },
	} = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/update_checkout_service',
		method : 'post',
	}, { manual: true });
	console.log(serviceId, 'serviceId');
	const updateCheckout = async (data) => {
		if (isEmpty(data) || loading) {
			return;
		}
		try {
			const params = {
				id: checkout_id,
				...(type === 'cargo_insurance'
					? {
						cargo_insurance_services_attributes: [
							{ id: serviceId, ...(data || {}) },
						],
					}
					: {
						fcl_freight_services_attributes: [
							{
								id: serviceId,
								...(data || {}),
							},
						],
					}),

				service: type === 'cargo_insurance' ? 'cargo_insurance' : 'fcl_freight',
			};
			await trigger({
				data: params,
			});

			Toast.success(
				type === 'cargo_insurance'
					? 'Cargo Insurance Deleted Successfully'
					: 'Added Successfully',
			);

			refetch();
		} catch (err) {
			console.log(err, 'err');
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		loading,
		updateCheckout,
	};
};

export default useUpdateCheckout;
