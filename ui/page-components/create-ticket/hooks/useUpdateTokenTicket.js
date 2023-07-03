import { Toast } from '@cogoport/components';
import { useState } from 'react';

import formatPayload from '../utils/format-payload';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateTokenTicket = () => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { token } = query || {};

	const [showSuccessPage, setShowSuccessPage] = useState(false);

	const [{ loading }, trigger] = useRequestBf({
		url     : 'tickets/token_ticket',
		method  : 'put',
		authKey : 'put_tickets_token_ticket',
		scope   : 'cogocare',
	}, { manual: true });

	const updateTokenTicket = async ({
		val = {},
		selectedInvoices = {},
		selectedpayments = [],
	}) => {
		const { payload = {} } = formatPayload({
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
