import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { STATUS_CHANGE_PAYLOAD } from '../constants';

import { useTicketsRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const translationKey = 'common:components_header_tickets_api';

const useUpdateTicketActivity = ({
	refreshTickets = () => {},
	refetchTicket = () => {},
}) => {
	const { t } = useTranslation(['common']);

	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/activity',
		authKey : 'post_tickets_activity',
		method  : 'post',
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
			Toast.success(t(`${translationKey}_status_update`));
			refreshTickets();
			refetchTicket();
		} catch (e) {
			Toast.error(e?.error || t(`${translationKey}_error`));
		}
	};

	return {
		updateTicketActivity,
		updateLoading: loading,
	};
};

export default useUpdateTicketActivity;
