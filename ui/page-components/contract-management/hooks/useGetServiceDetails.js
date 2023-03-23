import { useState, useEffect } from 'react';

import { SERVICE_TYPE_SMALL } from '../components/ShipmentPlan/constants';
import { KEYS_MAPPING } from '../configurations/payload-key-mapping';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetServiceDetails = ({
	filterData,
	serviceType,
	techOpsServiceId,
	activeTab,
	// isTechops,
}) => {
	const [pagination, setPagination] = useState(1);
	const {
		general: { query },
	} = useSelector((state) => state);

	const { origin, destination } = filterData || {};
	console.log(serviceType, 'serviceType');
	const service = `${SERVICE_TYPE_SMALL[serviceType]}_freight`;

	const [{
		data: serviceData,
		loading: serviceLoading,
	}, trigger] = useRequest({
		url    : `/list_contract_${service}_services`,
		method : 'get',
	}, { manual: true });

	const getServiceDetails = async () => {
		const filters = {
			contract_id                                  : query.contract_id,
			[KEYS_MAPPING[serviceType]?.id?.origin]      : origin || undefined,
			[KEYS_MAPPING[serviceType]?.id?.destination] : destination || undefined,
			id                                           : techOpsServiceId || undefined,
		};

		try {
			await trigger({
				params: {
					filters,
					page                              : pagination,
					pagination_data_required          : true,
					is_contract_service_validity_data : true,
					movement_type:
						serviceType === 'air_freight' ? 'international' : undefined,
					additional_data_required: true,
				},
			});
		} catch (error) {
			console.log(error, 'err');
		}
	};

	useEffect(() => {
		if (serviceType) {
			getServiceDetails();
		}
	}, [activeTab, pagination, JSON.stringify(filterData), serviceType]);

	return {
		serviceLoading,
		serviceData,
		getServiceDetails,
		setPagination,
	};
};

export default useGetServiceDetails;
