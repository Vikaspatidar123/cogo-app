import { useTicketsRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetTicketsUnreadCount = () => {
	const { id } = useSelector((state) => state.profile);

	const { trigger, data } = useTicketsRequest({
		url     : '/unread_count',
		method  : 'get',
		authkey : 'get_tickets_unread_count',
	}, { manual: true });

	const getUnreadTicketsCount = () => {
		try {
			trigger({
				params: {
					PerformedByID: id,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return {
		getUnreadTicketsCount,
		unreadCount: data,
	};
};

export default useGetTicketsUnreadCount;
