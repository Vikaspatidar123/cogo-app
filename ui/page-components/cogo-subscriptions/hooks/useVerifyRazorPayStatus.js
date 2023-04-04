import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useVerifyRazor = () => {
	const [loading, setLoading] = useState(false);

	const [{ data }, trigger] = useRequest({
		url    : '/saas_user_subscription_status',
		method : 'get',
	}, { manual: true });

	const verifyRazor = async (requestData) => {
		try {
			await trigger({
				params: {
					...requestData,
				},
			});
			return data;
		} catch (err) {
			Toast.error(err?.errors || "Couldn't verify payment. Please try again.");
			return null;
		}
	};

	return { razorLoading: loading, verifyRazor, setRazorLoading: setLoading };
};

export default useVerifyRazor;
