/* eslint-disable no-empty-pattern */
import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useVerifyRazor = () => {
	const [loading, setLoading] = useState(false);

	const [{}, trigger] = useRequest({
		url    : '/saas_user_subscription_status',
		method : 'get',
	}, { manual: true });

	const verifyRazor = async (requestData) => {
		try {
			const resp = await trigger({
				params: {
					...requestData,
				},
			});
			const { data } = resp;
			return data;
		} catch (err) {
			Toast.error(err?.errors || "Couldn't verify payment. Please try again.");
			return null;
		}
	};

	return { razorLoading: loading, verifyRazor, setRazorLoading: setLoading };
};

export default useVerifyRazor;
