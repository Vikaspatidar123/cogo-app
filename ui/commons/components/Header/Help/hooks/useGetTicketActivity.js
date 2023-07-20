import { useEffect, useState, useCallback } from 'react';

import { ACTIVITY_STATUS } from '../constants';

import { useTicketsRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const useGetTicketActivity = ({ ticketId }) => {
	const { profile } = useSelector((state) => state);

	const [listData, setListData] = useState({
		items       : [],
		page        : GLOBAL_CONSTANTS.zeroth_index,
		total_pages : GLOBAL_CONSTANTS.zeroth_index,
	});

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/activities',
		authKey : 'get_tickets_activities',
		method  : 'get',
	}, { manual: false });

	const getTicketActivity = useCallback(async (pagination) => {
		try {
			const res = await trigger({
				params: {
					TicketID : Number(ticketId),
					page     : pagination,
					UserID   : profile?.id,
					Types    : ACTIVITY_STATUS.join(','),
				},
			});

			const {
				items = [],
				total_pages = GLOBAL_CONSTANTS.zeroth_index,
				page = GLOBAL_CONSTANTS.zeroth_index,
				last = false,
			} = res?.data || {};

			setListData((prev) => ({
				items: [...(prev.items || []), ...(items || [])],
				page,
				total_pages,
				last,
			}));
		} catch (error) {
			console.error(error);
		}
	}, [profile?.id, ticketId, trigger]);

	useEffect(() => {
		if (ticketId) {
			setListData({
				items       : [],
				page        : GLOBAL_CONSTANTS.zeroth_index,
				total_pages : GLOBAL_CONSTANTS.zeroth_index,
			});
			getTicketActivity(GLOBAL_CONSTANTS.zeroth_index);
		}
	}, [getTicketActivity, ticketId]);

	return {
		getTicketActivity,
		listData,
		setListData,
		chatLoading: loading,
	};
};

export default useGetTicketActivity;
