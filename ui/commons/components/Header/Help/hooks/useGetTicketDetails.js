import { useCallback, useEffect } from 'react';

import { useTicketsRequest } from '@/packages/request';

const useGetTicketDetails = ({ ticketId }) => {
	const [{ loading, data }, trigger] = useTicketsRequest({
		url     : '/detail',
		authKey : 'get_tickets_detail',
		method  : 'get',
	}, { manual: false });

	const getTicketDetails = useCallback(async () => {
		try {
			await trigger({
				params: {
					ID: Number(ticketId),
				},
			});
		} catch (error) {
			console.error(error);
		}
	}, [ticketId, trigger]);

	useEffect(() => {
		if (ticketId) {
			getTicketDetails();
		}
	}, [getTicketDetails, ticketId]);

	return {
		getTicketDetails,
		detailsLoading : loading,
		ticketData     : data || '',
	};
};

export default useGetTicketDetails;
