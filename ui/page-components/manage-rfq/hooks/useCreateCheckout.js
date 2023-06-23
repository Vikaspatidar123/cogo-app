import { Toast } from '@cogoport/components';
import { useState } from 'react';

import flattenErrorToString from '../helpers/getApiErrorString';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useCreateCheckout = ({ searchId, selectedCardId }) => {
	const { push } = useRouter();

	const [loading, setLoading] = useState(false);

	const [{ data: resp }, trigger] = useRequest({
		method : 'post',
		url    : '/create_rfq_checkout',
	}, { manual: true });

	const handleCreateCheckout = async () => {
		setLoading(true);
		const data = {
			rfq_search_id : searchId,
			selected_card : selectedCardId,
		};
		try {
			if (selectedCardId && searchId) {
				const res = await trigger({ data });
				push('/checkout/[checkout_id]', `/checkout/${res?.data?.id}`);
			} else {
				Toast.error('Please Select Rate Card');
			}
		} catch (e) {
			Toast.error(flattenErrorToString(e));
		}
		setLoading(false);
	};

	return {
		handleCreateCheckout,
		loading,
		resp,
	};
};

export default useCreateCheckout;
