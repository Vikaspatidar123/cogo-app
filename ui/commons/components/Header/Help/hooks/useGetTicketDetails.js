import { useCallback, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetTicketDetails = ({ ticketId }) => {
	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/detail',
		authKey : 'get_tickets_detail',
		method  : 'get',
		scope   : 'cogocare',
	}, { manual: false });

	const getTicketDetails = useCallback(async () => {
		try {
			await trigger({
				params: {
					ID: Number(ticketId),
				},
			});
		} catch (error) {
			console.log(error);
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
