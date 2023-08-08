/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const CHECK_LOADING_COUNT = 1;
const WAIT_TIME = 3 * 1000;
const PAINTING_TIME = 10;

const wait = (time) => new Promise((res) => {
	setTimeout(() => {
		res();
	}, time);
});
const useVerifyRazor = () => {
	const { query } = useRouter();
	const [apiTries, setApiTries] = useState(0);
	const [loading, setLoading] = useState(false);
	const { saas_checkout_id = '', checkout_id = '' } = query || {};
	const requestData = { saas_checkout_id: saas_checkout_id || checkout_id };

	const [{ data }, trigger] = useRequest({
		url    : '/saas_user_subscription_status',
		method : 'get',
	}, { manual: true });

	const verifyRazor = async () => {
		try {
			await trigger({
				params: {
					...requestData,
				},
			});
			return data;
		} catch (err) {
			console.error(err);
			return null;
		}
	};
	const checkPaymentStatus = async (payload) => {
		if (apiTries < CHECK_LOADING_COUNT) setLoading(true);
		await verifyRazor(payload);
		await wait(WAIT_TIME);
		setApiTries((pre) => pre + 1);
	};
	useEffect(() => {
		if (query?.saas_checkout_id || query?.checkout_id) {
			checkPaymentStatus(requestData);
		} else setLoading(false);
	}, [query]);
	useEffect(() => {
		if (data?.status !== 'active' && apiTries < PAINTING_TIME && loading) {
			try {
				checkPaymentStatus(requestData);
			} catch (err) {
				Toast.error(err?.data);
			}
		}
	}, [apiTries]);

	return {
		razorLoading    : loading,
		verifyRazor,
		setRazorLoading : setLoading,
		paymentStatus   : data,
		apiTries,
	};
};

export default useVerifyRazor;
