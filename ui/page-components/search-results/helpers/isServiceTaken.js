const serviceMappings = {
	fcl_freight: {
		import_transportation: ['trailer_freight', 'ftl_freight'],
		export_transportation: ['trailer_freight', 'ftl_freight'],
	},
	air_freight: {
		import_transportation: ['ltl_freight', 'ftl_freight'],
		export_transportation: ['ltl_freight', 'ftl_freight'],
	},
	lcl_freight: {
		import_transportation: ['ltl_freight', 'ftl_freight'],
		export_transportation: ['ltl_freight', 'ftl_freight'],
	},
};

const isServiceTaken = (service, data) => {
	const { search_type, service_details } = data || {};
	let services = [];
	let trade_type = null;
	if (service.split('_').includes('import')) {
		services = serviceMappings[search_type][service] || [
			service.split('import_')[1],
		];
		trade_type = 'import';
	} else if (service.split('_').includes('export')) {
		services = serviceMappings[search_type][service] || [
			service.split('export_')[1],
		];
		trade_type = 'export';
	} else {
		services = [service];
	}

	const serviceRelated = Object.values(service_details || {}).find(
		(serviceItem) =>
			services.includes(serviceItem?.service_type) &&
			(!trade_type || trade_type === serviceItem.trade_type),
	);

	return !!serviceRelated;
};
export default isServiceTaken;
