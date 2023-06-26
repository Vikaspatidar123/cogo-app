import { Toast } from '@cogoport/components';

import { STATUS_CHANGE_PAYLOAD } from '../constants';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateTicketActivity = ({
	refreshTickets = () => {},
	refetchTicket = () => {},
}) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useRequestBf({
		url     : '/activity',
		authKey : 'post_tickets_activity',
		method  : 'post',
		scope   : 'cogocare',
	}, { manual: false });

	const updateTicketActivity = async ({ status = '', id = '' }) => {
		const currentStatus = status?.toLowerCase() === 'resolve' ? 'resolve' : 'notresolved';

		try {
			await trigger({
				data: {
					...STATUS_CHANGE_PAYLOAD?.[currentStatus],
					UserType      : 'ticket_user',
					PerformedByID : profile?.id,
					TicketID      : [Number(id)],
				},
			});
			Toast.success('Ticket Status Updated Successfully!');
			refreshTickets();
			refetchTicket();
		} catch (e) {
			Toast.error(e?.error || 'something went wrong');
		}
	};

	return {
		updateTicketActivity,
		updateLoading: loading,
	};
};

export default useUpdateTicketActivity;
