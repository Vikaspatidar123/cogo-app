import { Toast } from '@cogoport/components';
import { useState } from 'react';

import FormatPayload from '../utils/format-payload';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateTokenTicket = () => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { token } = query || {};

	const [showSuccessPage, setShowSuccessPage] = useState(false);

	// const { trigger, loading } = useRequest(
	// 	'put',
	// 	false,
	// 	'cogocare',
	// )('/token_ticket');
	const [{ loading }, trigger] = useRequest({
		url    : '/token_ticket',
		method : 'put',
	}, { manual: true });

	const updateTokenTicket = async ({
		val = {},
		selectedInvoices = {},
		selectedpayments = [],
	}) => {
		const { payload = {} } = FormatPayload({
			val,
			selectedInvoices,
			selectedpayments,
		});
		try {
			await trigger({
				data: { TicketToken: token, ...payload },
			});
			setShowSuccessPage(true);
		} catch (error) {
			Toast.error(error?.error);
		}
	};

	return {
		loading,
		updateTokenTicket,
		showSuccessPage,
	};
};

export default useUpdateTokenTicket;
