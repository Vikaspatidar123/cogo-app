import airServicesControls from '../configuration/air/services/controls.json';
import airServices from '../configuration/air/services/list.json';
import airCustomsServicesControls from '../configuration/air-customs/services/controls.json';
import airCustomsServices from '../configuration/air-customs/services/list.json';
import fclServicesControls from '../configuration/fcl/services/controls.json';
import fclServices from '../configuration/fcl/services/list.json';
import fclCustomsServicesControls from '../configuration/fcl-customs/services/controls.json';
import fclCustomsServices from '../configuration/fcl-customs/services/list.json';
import ftlLocalServicesControls from '../configuration/fcl-locals/services/controls.json';
import ftlLocalServices from '../configuration/fcl-locals/services/list.json';
import ftlServicesControls from '../configuration/ftl/services/controls.json';
import ftlServices from '../configuration/ftl/services/list.json';
import haulageServicesControls from '../configuration/haulage/services/controls.json';
import haulageServices from '../configuration/haulage/services/list.json';
import lclServicesControls from '../configuration/lcl/services/controls.json';
import lclServices from '../configuration/lcl/services/list.json';
import lclCustomsServicesControls from '../configuration/lcl-customs/services/controls.json';
import lclCustomsServices from '../configuration/lcl-customs/services/list.json';
import ltlServicesControls from '../configuration/ltl/services/controls.json';
import ltlServices from '../configuration/ltl/services/list.json';
import trailerServicesControls from '../configuration/trailer/services/controls.json';
import trailerServices from '../configuration/trailer/services/list.json';

const serviceMap = {
	fcl_freight: {
		services : fclServices,
		controls : fclServicesControls,
	},
	lcl_freight: {
		services : lclServices,
		controls : lclServicesControls,
	},
	air_freight: {
		services : airServices,
		controls : airServicesControls,
	},
	ftl_freight: {
		services : ftlServices,
		controls : ftlServicesControls,
	},
	ltl_freight: {
		services : ltlServices,
		controls : ltlServicesControls,
	},
	trailer_freight: {
		services : trailerServices,
		controls : trailerServicesControls,
	},
	haulage_freight: {
		services : haulageServices,
		controls : haulageServicesControls,
	},
	fcl_freight_local: {
		services : ftlLocalServices,
		controls : ftlLocalServicesControls,
	},
	fcl_customs: {
		services : fclCustomsServices,
		controls : fclCustomsServicesControls,
	},
	lcl_customs: {
		services : lclCustomsServices,
		controls : lclCustomsServicesControls,
	},
	air_customs: {
		services : airCustomsServices,
		controls : airCustomsServicesControls,
	},
};

const configureService = (type) => {
	const { services, controls } = serviceMap[type];

	return services.map((service) => {
		const serviceUpdated = { ...service };
		serviceUpdated.controls = [];

		controls.forEach((control) => {
			if (control.condition?.services?.find((s) => s === service.name)) {
				serviceUpdated.controls.push(control);
			}
		});

		return serviceUpdated;
	});
};

const getSearchFormConfig = (mode) => {
	switch (mode) {
		case 'fcl_freight':
			return configureService('fcl_freight');
		case 'lcl_freight':
			return configureService('lcl_freight');
		case 'air_freight':
			return configureService('air_freight');
		case 'ftl_freight':
			return configureService('ftl_freight');
		case 'ltl_freight':
			return configureService('ltl_freight');
		case 'trailer_freight':
			return configureService('trailer_freight');
		case 'haulage_freight':
			return configureService('haulage_freight');
		case 'fcl_freight_local':
			return configureService('fcl_freight_local');
		case 'fcl_customs':
			return configureService('fcl_customs');
		case 'lcl_customs':
			return configureService('lcl_customs');
		case 'air_customs':
			return configureService('air_customs');
		default:
			return [];
	}
};

export default getSearchFormConfig;
