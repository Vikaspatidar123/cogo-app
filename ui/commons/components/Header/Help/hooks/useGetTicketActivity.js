import { useEffect, useState } from 'react';

import { ACTIVITY_STATUS } from '../constants';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetTicketActivity = ({ ticketId }) => {
	const { profile } = useSelector((state) => state);

	const [listData, setListData] = useState({
		items       : [],
		page        : 0,
		total_pages : 0,
	});

	const [{ loading }, trigger] = useRequestBf({
		url     : '/activities',
		authKey : 'get_tickets_activities',
		method  : 'get',
		scope   : 'cogocare',
	}, { manual: false });

	const getTicketActivity = async (pagination) => {
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
				total_pages = 0,
				page = 0,
				last = false,
			} = res?.data || {};

			setListData((prev) => ({
				items: [...(prev.items || []), ...(items || [])],
				page,
				total_pages,
				last,
			}));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (ticketId) {
			setListData({
				items       : [],
				page        : 0,
				total_pages : 0,
			});
			getTicketActivity(0);
		}
	}, [ticketId]);

	return {
		getTicketActivity,
		listData,
		setListData,
		chatLoading: loading,
	};
};

export default useGetTicketActivity;
