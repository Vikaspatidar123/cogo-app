import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useBookShipment = () => {
	const {
		query: { checkout_id },
	} = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/book_checkout',
		method : 'post',
	}, { manual: true });

	const bookShipment = async () => {
		const params = {
			id: checkout_id,
		};

		try {
			const res = await trigger({
				data: params,
			});

			if (!res.hasError) {
				return res.data?.shipment_id;
			}

			return null;
		} catch (e) {
			Toast.error(getApiErrorString(e.data));
			return null;
		}
	};

	return {
		bookShipment,
		loading,
	};
};

export default useBookShipment;
