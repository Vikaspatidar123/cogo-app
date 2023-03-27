import fclIncotermsMapping from '@cogo/app-search/configurations/search/fcl/services/mapping.json';
import lclIncotermsMapping from '@cogo/app-search/configurations/search/lcl/services/mapping.json';
import airIncotermsMapping from '@cogo/app-search/configurations/search/air/services/mapping.json';

import fclServiceDetails from '@cogo/app-search/configurations/search/fcl/services/details.json';
import lclServiceDetails from '@cogo/app-search/configurations/search/lcl/services/details.json';
import airServiceDetails from '@cogo/app-search/configurations/search/air/services/details.json';

import fclCustomsMapping from '@cogo/app-search/configurations/search/domestic/fcl-customs/mapping.json';
import lclCustomsMapping from '@cogo/app-search/configurations/search/domestic/lcl-customs/mapping.json';
import airCustomsMapping from '@cogo/app-search/configurations/search/domestic/air-customs/mapping.json';

import fclCustomsDetails from '@cogo/app-search/configurations/search/domestic/fcl-customs/details.json';
import lclCustomsDetails from '@cogo/app-search/configurations/search/domestic/lcl-customs/details.json';
import airCustomsDetails from '@cogo/app-search/configurations/search/domestic/air-customs/details.json';

import fclLocalsMapping from '@cogo/app-search/configurations/search/domestic/fcl-locals/mapping.json';
import lclLocalsMapping from '@cogo/app-search/configurations/search/domestic/lcl-locals/mapping.json';
import airLocalsMapping from '@cogo/app-search/configurations/search/domestic/air-locals/mapping.json';

import fclLocalsDetails from '@cogo/app-search/configurations/search/domestic/fcl-locals/details.json';
import lclLocalsDetails from '@cogo/app-search/configurations/search/domestic/lcl-locals/details.json';
import airLocalsDetails from '@cogo/app-search/configurations/search/domestic/air-locals/details.json';

const Police = () => (
	<img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Police.svg"
		alt="police"
	/>
);

const Hangar = () => (
	<img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Hangar.svg"
		alt="hangar"
	/>
);

const Weight = () => (
	<img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/weight.svg"
		alt="weight"
	/>
);

const Wave = () => (
	<img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-wave.svg"
		alt="wave"
	/>
);

const Circle = () => (
	<img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-circle.svg"
		alt="circle"
	/>
);

export const defaultAddedServices = {
	ltl_freight: ['ltl_freight'],
	ftl_freight: ['ftl_freight'],
	trailer_freight: ['trailer_freight'],
	haulage_freight: ['haulage_freight'],
	fcl_customs: ['fcl_customs'],
	lcl_customs: ['lcl_customs'],
	air_customs: ['air_customs'],
};

export const defaultIcons = {
	origin_ftl_freight: Police,
	trailer_freight: Hangar,
	fcl_customs: Police,
	fcl_cfs: Hangar,
	vgm: Weight,
	igm: Weight,
	fumigation: Wave,
	dummy: Circle,
};

export const nonRemovableServices = [
	'fcl_freight',
	'fcl_freight_local',
	'lcl_freight',
	'lcl_freight_local',
	'air_freight',
];

export const nonRemovableServicesAir = [
	'air_freight',
	'terminal_inbound',
	'terminal_outbound',
];

export const serviceMappings = {
	fcl_freight: {
		services: fclIncotermsMapping,
		detail: fclServiceDetails,
	},
	lcl_freight: {
		services: lclIncotermsMapping,
		detail: lclServiceDetails,
	},
	air_freight: {
		services: airIncotermsMapping,
		detail: airServiceDetails,
	},
	fcl_customs: {
		services: fclCustomsMapping,
		detail: fclCustomsDetails,
	},
	lcl_customs: {
		services: lclCustomsMapping,
		detail: lclCustomsDetails,
	},
	air_customs: {
		services: airCustomsMapping,
		detail: airCustomsDetails,
	},
	fcl_freight_local: {
		services: fclLocalsMapping,
		detail: fclLocalsDetails,
	},
	lcl_freight_local: {
		services: lclLocalsMapping,
		detail: lclLocalsDetails,
	},
	air_freight_local: {
		services: airLocalsMapping,
		detail: airLocalsDetails,
	},
};
