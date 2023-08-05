import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useServiceList = (
	shipment_data,
	primary_service,
	isChild,
	shipment_id,
) => {
	const { query, id } = useSelector(({ general, profile }) => ({
		query : general?.query,
		id    : profile?.id,
	}));

	const [{ loading: apiLoading, data }, trigger] = useRequest({
		url    : 'list_shipment_services',
		method : 'get',
	}, { manual: true });

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id : isChild ? shipment_id : query?.id,
						status      : ['active', 'pending', 'inactive'],
						ie_poc_id   : id,
					},
					service_stakeholder_required: true,
					additional_data_required:
						primary_service?.service_type === 'fcl_freight_service',
					can_edit_booking_params : true,
					page_limit              : 100,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (shipment_data?.id) {
			getList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipment_data?.id]);

	return {
		apiLoading,
		list            : data?.list || [],
		refetchServices : getList,
	};
};

export default useServiceList;
