/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { FILTER_KEYS_MAPPING, NO_OF_TICKETS_TO_BE_SHOWED } from '../constants';

import { useDebounceQuery } from '@/packages/forms';
import { useTicketsRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const FIRST_INDEX = 1;
const REACH_BOTTOM = 20;

const useListTickets = ({
	searchValue = '',
	activeTab = '',
	listType = '',
}) => {
	const { profile } = useSelector((state) => state);
	const [pagination, setPagination] = useState(FIRST_INDEX);
	const [listData, setListData] = useState([]);

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ loading, data }, trigger] = useTicketsRequest({
		url     : '/list',
		authKey : 'get_tickets_list',
		method  : 'get',
	}, { manual: false });

	const fetchTickets = async (pageIndex) => {
		try {
			const response = await trigger({
				params: {
					Statuses      : FILTER_KEYS_MAPPING[activeTab],
					UserID        : profile?.id,
					PerformedByID : profile?.id,
					size          : NO_OF_TICKETS_TO_BE_SHOWED?.[
						listType === 'create' ? 'create' : 'default'
					],
					page    : pageIndex - FIRST_INDEX,
					QFilter : searchQuery || undefined,
				},
			});

			setListData((prev) => [...prev, ...(response?.data?.items || [])]);
			setPagination(pageIndex + FIRST_INDEX);
		} catch (error) {
			console.error('error:', error);
		}
	};

	const refreshTickets = () => {
		setListData([]);
		fetchTickets(FIRST_INDEX);
	};

	useEffect(() => {
		setListData([]);
		fetchTickets(FIRST_INDEX);
	}, [searchQuery, activeTab]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue, debounceQuery]);

	const handleScroll = ({ clientHeight, scrollTop, scrollHeight }) => {
		const shouldReachBottom = scrollHeight - (clientHeight + scrollTop) <= REACH_BOTTOM;
		const hasMoreData = pagination <= (data?.total_pages || GLOBAL_CONSTANTS.zeroth_index);
		if (shouldReachBottom && hasMoreData && !loading) {
			fetchTickets(pagination);
		}
	};

	return {
		ticketData  : listData,
		listLoading : loading,
		fetchTickets,
		handleScroll,
		refreshTickets,
	};
};

export default useListTickets;
