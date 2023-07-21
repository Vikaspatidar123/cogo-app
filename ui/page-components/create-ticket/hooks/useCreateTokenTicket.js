import { useCallback, useEffect } from 'react';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';

let isTicketNotUtlilized = false;

const getPayload = ({ query }) => {
	const { token = '', source = '', agent_id = '', type = '' } = query || {};

	return {
		TicketToken    : token,
		Type           : type,
		Source         : source || 'client',
		NotifyCustomer : true,
		ReviewerUserId : agent_id || undefined,
	};
};

const useCreateTokenTicket = () => {
	const { query, push } = useRouter();

	const { token = '', source = '', type = '' } = query || {};

	const [{ data, loading }, trigger] = useRequestBf({
		url     : 'token_ticket',
		method  : 'post',
		scope   : 'cogocare',
		authKey : 'post_tickets_token_ticket',
		data    : { TicketToken: token, Type: type, Source: source || 'client' },
	}, { manual: false });

	const pushToDetailsPage = useCallback(() => {
		push('/ticket-details/[token]', `/ticket-details/${token}`, false);
	}, [push, token]);

	const createTokenTicket = useCallback(async () => {
		const res = await trigger({
			data: getPayload({ query }),
		});

		if (res?.data) {
			const { Status = '' } = res?.data || {};
			if (Status === 'utilized' && token) {
				pushToDetailsPage();
			}
			isTicketNotUtlilized = Status !== 'utilized' || false;
		}
	}, [pushToDetailsPage, query, token, trigger]);

	useEffect(() => {
		createTokenTicket();
	}, [createTokenTicket]);

	return {
		loading,
		createTokenTicket,
		Status: data?.Status,
		isTicketNotUtlilized,
	};
};

export default useCreateTokenTicket;
