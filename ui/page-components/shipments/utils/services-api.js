import serviceTypes from '../configurations/common/service-types.json';

const getApi = (type) => {
	if (type === 'shipment') {
		return { api: 'update_shipment', service_type: undefined };
	}
	const serviceType = serviceTypes[type] ? `${serviceTypes[type]}_service` : `${type}_service`;
	return { api: 'update_shipment_service', service_type: serviceType };
};
export default getApi;
