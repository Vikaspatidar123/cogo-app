import { Toast } from '@cogoport/components';

import filterServiceMapping from '../configurations/common/filter-service-mapping.json';
import serviceMappings from '../configurations/common/service-mappings.json';

// import { getRequest } from '.';
import { useRequest } from '@/packages/request';

const useListShipmentServices = ({ filterValues, otherParams = {} }) => {
	const {
		serial_id,
		global_state,
		service_type,
		service_provider_id,
		color_code,
		bl_number,
		agent_id,
		...rest
	} = filterValues || {};
	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipment_services',
		method : 'get',
	}, { manual: true });

	const getshipment = async () => {
		try {
			const filters = {
				filters: {
					[filterServiceMapping[service_type]]: service_type
						? { ...rest }
						: undefined,
					shipment     : { serial_id, state: global_state || undefined },
					service_provider_id,
					color_code,
					agent_id,
					bl_detail    : { bl_number },
					service_type : service_type ? serviceMappings[service_type] : undefined,
				},
				...otherParams,
			};
			const response = await trigger({
				params: filters,
			});
			// if (response?.hasError) return;
			return response;
		} catch (error) {
			console.log(error);
		}
	};

	return { loading, getshipment };
};

export default useListShipmentServices;
