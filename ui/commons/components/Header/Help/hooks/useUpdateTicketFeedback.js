import { Toast } from '@cogoport/components';
import { useTranslation } from 'react-i18next';

import { useTicketsRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const translationKey = 'common:components_header_tickets_api';

const useUpdateTicketFeedback = ({ refetchTicket = () => {} }) => {
	const { t } = useTranslation(['common']);

	const profile = useSelector((state) => state?.profile);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/feedback',
		authKey : 'put_tickets_feedback',
		method  : 'put',
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
			Toast.success(t(`${translationKey}_rating_success`));
		} catch (e) {
			Toast.error(e?.error || t(`${translationKey}_error`));
		}
	};

	return {
		updateTicketFeedback,
		updateLoading: loading,
	};
};

export default useUpdateTicketFeedback;
