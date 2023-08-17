import filterServiceMapping from '../configurations/common/filter-service-mapping.json';

import { useRequest } from '@/packages/request';

const useListShipmentList = ({ currentTab }) => {
	const apiName = currentTab === 'shipper_consignee' ? 'list_shipments_for_shipper_consignee' : 'list_shipments';

	const [{ loading }, trigger] = useRequest({
		url    : apiName,
		method : 'get',
	}, { manual: true });

	const getPayloadData = (filterValues, otherParams) => {
		const {
			invoice_type,
			serial_id,
			global_state,
			importer_exporter_id,
			consignee_shipper_id,
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
				consignee_shipper_id,
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

		return filters;
	};

	const getshipment = async (filterValues, otherParams = {}) => {
		const filters = getPayloadData(filterValues, otherParams);

		try {
			const response = await trigger({
				params: filters,
			});
			return response;
		} catch (error) {
			return null;
		}
	};

	return { loading, getshipment };
};

export default useListShipmentList;
