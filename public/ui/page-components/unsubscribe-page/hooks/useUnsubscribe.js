import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect, useCallback } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const TIMER_SETTING = 1000;

const wait = () => new Promise((res) => {
	setTimeout(() => {
		res();
	}, TIMER_SETTING);
});

const getPayLoad = ({ token_value, value }) => ({ token: token_value, cancellation_reason: value });

const useUnsubscribe = ({
	setSubmit = () => { },
	setTimer = () => { },
	timer = 0,
	setTicket = () => { },
	ticket = '',
}) => {
	const { query } = useRouter();

	const { token } = query || {};
	const token_value = token.replace(/\s/g, '+');

	const { t } = useTranslation(['cancellationTicket']);

	const [{ loading }, trigger] = useRequest({
		url    : 'raise_subscription_cancellation_request',
		method : 'post',
	}, { manual: true });

	const timerFn = useCallback(async () => {
		await wait();
		setTimer((prev) => prev - 1);
	}, [setTimer]);

	const onSubmit = async (value = '') => {
		const payload = getPayLoad({ token_value, value });

		try {
			const response = await trigger({
				data: payload,
			});

			const { data } = response || {};
			setTicket(data?.ticket_number);

			Toast.success(t('cancellationTicket:unsubscribe_successfully_message'));

			setTimer(15);
			setSubmit(true);
		} catch (error) {
			showErrorsInToast(error?.error);
		}
	};

	const copyToClipBoard = () => {
		try {
			navigator.clipboard.writeText(ticket);
			Toast.success(t('cancellationTicket:successfully_message'));
		} catch (err) {
			Toast.error(t('cancellationTicket:unabel_text'));
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
