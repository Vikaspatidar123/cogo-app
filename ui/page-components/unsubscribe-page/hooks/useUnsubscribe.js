import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const TIMER_SETTING = 1000;

const wait = () => new Promise((res) => {
	setTimeout(() => {
		res();
	}, TIMER_SETTING);
});

const useUnsubscribe = ({
	setSubmit = () => {},
	setTimer = () => {},
	timer = 0,
	setTicket = () => {},
	ticket = '',
}) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);
	const { token } = query || {};

	const [{ loading }, trigger] = useRequest({
		url    : 'raise_subscription_cancellation_request',
		method : 'post',
	}, { manual: true });

	const timerFn = useCallback(async () => {
		await wait();
		setTimer((prev) => prev - 1);
	}, [setTimer]);

	const onSubmit = async (value = '') => {
		try {
			const response = await trigger({
				data: { token, cancellation_reason: value },
			});

			const { data } = response || {};
			setTicket(data?.ticket_number);

			Toast.success('Unsubscribe request send successfully');

			setTimer(15);
			setSubmit(true);
		} catch (error) {
			showErrorsInToast(error?.error);
		}
	};

	const copyToClipBoard = () => {
		try {
			navigator.clipboard.writeText(ticket);
			Toast.success('Successfully copied to clipboard');
		} catch (err) {
			Toast.error('Unable to copy');
		}
	};

	useEffect(() => {
		if (timer > 0) {
			timerFn();
		}
	}, [timer, timerFn]);

	return {
		onSubmit,
		copyToClipBoard,
		loading,
	};
};

export default useUnsubscribe;
