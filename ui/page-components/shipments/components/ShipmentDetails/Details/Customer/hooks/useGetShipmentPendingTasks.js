import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import useGetFiniteList from '@/ui/page-components/shipments/hooks/useGetFiniteList';

const useGetShipmentPendingTasks = (shipment_type = '') => {
	const { authorizationparameters, query } = useSelector(
		({ general, profile }) => ({
			authorizationparameters : profile?.authorizationparameters,
			query                   : general.query,
		}),
	);
	const [{ loading:apiLoading }, trigger] = useRequest({
		url    : 'list_shipment_pending_tasks',
		method : 'get',
	}, { manual: true });

	const listAPi = () => trigger({
		params: {
			// eslint-disable-next-line no-use-before-define
			page,
			page_limit : 100,
			sort_type  : 'asc',
			filters    : {
				shipment_id : query?.id,
				shipment_type,
				status      : 'pending',
			},
		},
	});
	const {
		loading,
		page,
		filters,
		list: { data, total },
		hookSetters,
		refetch,
	} = useGetFiniteList(listAPi, {
		authorizationparameters,
	});
	useEffect(() => {
		listAPi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id]);

	return {
		tasks   : data || [],
		page,
		loading : loading || apiLoading,
		refetch,
		hookSetters,
		total,
		filters,
	};
};

export default useGetShipmentPendingTasks;
