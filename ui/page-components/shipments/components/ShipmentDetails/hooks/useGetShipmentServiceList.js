import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetShipmentServiceList = (allParams) => {
	const { ...params } = allParams || {};
	const [{ loading, data: listServices }, trigger] = useRequest({
		url    : 'list_shipment_services',
		method : 'get',
	}, { manual: true });

	const getList = async () => {
		await trigger({
			params: {
				filters: {
					shipment_id : params?.shipment_id,
					status      : ['active', 'pending', 'inactive'],
				},
				service_stakeholder_required   : true,
				collection_party_data_required : true,
				page_limit                     : 10,
			},
		});
	};

	useEffect(() => {
		getList();
	}, [params?.shipment_id]);

	return {
		loading,
		listServices,
		refetch: getList,
	};
};

export default useGetShipmentServiceList;
