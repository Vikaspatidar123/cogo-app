import { Toast } from '@cogoport/components';

import { useTicketsRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateTicketActivity = ({
	ticketId,
	refetchTicket,
	scrollToBottom,
}) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/activity',
		authKey : 'post_tickets_activity',
		method  : 'post',
	}, { manual: false });

	const createTicketActivity = async ({ file, message }) => {
		const payload = {
			Description : message,
			Type        : 'respond',
			TicketID    : [Number(ticketId)],
			Status      : 'activity',
			Data        : { Url: [file] || [] },
		};

		try {
			await trigger({
				data: {
					...payload,
					UserType      : 'ticket_user',
					PerformedByID : profile?.id,
				},
			});

			refetchTicket();
			scrollToBottom();
		} catch (error) {
			Toast.error(error?.error);
		}
	};

	return {
		createTicketActivity,
		createLoading: loading,
	};
};

export default useCreateTicketActivity;
