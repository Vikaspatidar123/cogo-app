import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import filterServiceMapping from '../configurations/common/filter-service-mapping.json';

// import { getRequest } from '.';
import { useRequest } from '@/packages/request';

const useListShipmentList = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipments',
		method : 'get',
	}, { manual: true });
	const getshipment = async (filterValues, otherParams = {}) => {
		const {
			invoice_type,
			serial_id,
			global_state,
			importer_exporter_id,
			color_code,
			partner_id,
			bl_number,
			shipment_type,
			is_all_services_allocated,
			outSideServiceFilters = {},
			q,
			container_number,
			agent_id,
			...rest
		} = filterValues || {};
		console.log(filterValues, 'filterValues', otherParams);

		try {
			const filters = {
				filters: {
					q,
					container_number,
					[filterServiceMapping[shipment_type]]: shipment_type
						? { ...rest }
						: undefined,
					serial_id,
					state     : global_state,
					importer_exporter_id,
					partner_id,
					shipment_type,
					color_code,
					is_all_services_allocated,
					agent_id,
					...outSideServiceFilters,
					bl_detail : { bl_number },
				},
				...otherParams,
			};
			if (invoice_type === 'proforma_invoice') {
				filters.filters.proforma_invoice = true;
			}
			if (invoice_type === 'sales_invoice') {
				filters.filters.sales_invoice = true;
			}
			const response = await trigger({
				params: filters,
			});
			// if (response?.hasError) return;
			console.log(response, 'response');
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	return { loading, getshipment };
};

export default useListShipmentList;
