import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateTicketFeedback = ({ refetchTicket = () => {} }) => {
	const profile = useSelector((state) => state?.profile);

	const [{ loading }, trigger] = useRequestBf({
		url     : '/feedback',
		authKey : 'put_tickets_feedback',
		method  : 'put',
		scope   : 'cogocare',
	}, { manual: false });

	const updateTicketFeedback = async (rating = '', id = '') => {
		try {
			await trigger({
				data: {
					Rating        : rating,
					TicketId      : Number(id),
					PerformedByID : profile?.id,
				},
			});
			refetchTicket();
			Toast.success('Ticket Rating Submitted Successfully!');
		} catch (e) {
			Toast.error(e?.error || 'something went wrong');
		}
	};

	return {
		updateTicketFeedback,
		updateLoading: loading,
	};
};

export default useUpdateTicketFeedback;
