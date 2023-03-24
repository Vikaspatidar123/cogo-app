import { useEffect } from 'react';

import useGetFiniteList from '../../../hooks/useGetFiniteList';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetpendingTasks = ({ status = '', shipment_type = '' }) => {
	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));
	const [{ loading: apiLoading }, trigger] = useRequest({
		url    : 'list_shipment_pending_tasks',
		method : 'get',
	}, { manual: true });

	const getPendingTask = (restFilters, currentPage) => trigger({
		params: {
			filters: {
				task_type   : 'upload_document',
				status      : 'pending',
				shipment_id : query?.id,
				shipment_type,
				...(restFilters || {}),
			},
			page       : currentPage || 1,
			page_limit : 50,
		},
	});

	useEffect(() => {
		if (status === 'pending_documents') getPendingTask();
	}, [status]);

	const {
		filters,
		page,
		list: { total, data },
		hookSetters,
		refetch,
		loading,
	} = useGetFiniteList(getPendingTask);

	return {
		pendingTaskFilters    : filters,
		pendingTasks          : data,
		pendingTaskTotal      : total,
		pendingTaskLoading    : apiLoading || loading,
		pendingTaskPage       : page,
		pendingTaskHookSetter : hookSetters,
		refetch,
	};
};

export default useGetpendingTasks;
