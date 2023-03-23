import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useGetContractShipmentData = ({ isExistingManual = false }) => {
	const [pagination, setPagination] = useState(1);

	const api = isExistingManual
		? '/list_organization_trade_requirement_drafts'
		: '/get_contract_service_shipment_data';

	const [{ loading, data }, trigger] = useRequest({
		url    : { api },
		method : 'post',
	}, { manual: true });

	const getShipmentPlans = async (id, type) => {
		try {
			await trigger({
				params: {
					id           : !isExistingManual ? id : undefined,
					service_type : !isExistingManual ? type : undefined,
					page         : pagination,
					filters      : isExistingManual
						? { booking_type: 'contract', source_id: id }
						: undefined,
				},
			});
		} catch (error) {
			console.log(error, 'err');
		}
	};

	return {
		loading,
		shipmentPlanData : data?.data || [],
		requestData      : data?.list || [],
		getShipmentPlans,
		setPagination,
	};
};

export default useGetContractShipmentData;
