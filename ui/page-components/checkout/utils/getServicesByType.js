const getServicesByType = ({ serviceArray, services }) => serviceArray.map((service) => (
	Object.values(services || {}).find(
		(item) => item.service_type === service,
	) || {}
));

export default getServicesByType;
