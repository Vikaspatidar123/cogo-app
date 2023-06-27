const getServicesByType = ({ servicesArray = [], services = {} }) => servicesArray.map((service) => (
	Object.values(services || {}).find(
		(item) => item.service_type === service,
	) || {}
));

export default getServicesByType;
