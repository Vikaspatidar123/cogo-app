/* eslint-disable max-len */
import airServiceDetails from '@/ui/page-components/discover_rates/configurations/search/air/services/details.json';
import airIncotermsMapping from '@/ui/page-components/discover_rates/configurations/search/air/services/mapping.json';
import airCustomsDetails from '@/ui/page-components/discover_rates/configurations/search/domestic/air-customs/details.json';
import airCustomsMapping from '@/ui/page-components/discover_rates/configurations/search/domestic/air-customs/mapping.json';
import airLocalsDetails from '@/ui/page-components/discover_rates/configurations/search/domestic/air-locals/details.json';
import airLocalsMapping from '@/ui/page-components/discover_rates/configurations/search/domestic/air-locals/mapping.json';
import fclCustomsDetails from '@/ui/page-components/discover_rates/configurations/search/domestic/fcl-customs/details.json';
import fclCustomsMapping from '@/ui/page-components/discover_rates/configurations/search/domestic/fcl-customs/mapping.json';
import fclLocalsDetails from '@/ui/page-components/discover_rates/configurations/search/domestic/fcl-locals/details.json';
import fclLocalsMapping from '@/ui/page-components/discover_rates/configurations/search/domestic/fcl-locals/mapping.json';
import lclCustomsDetails from '@/ui/page-components/discover_rates/configurations/search/domestic/lcl-customs/details.json';
import lclCustomsMapping from '@/ui/page-components/discover_rates/configurations/search/domestic/lcl-customs/mapping.json';
import lclLocalsDetails from '@/ui/page-components/discover_rates/configurations/search/domestic/lcl-locals/details.json';
import lclLocalsMapping from '@/ui/page-components/discover_rates/configurations/search/domestic/lcl-locals/mapping.json';
import fclServiceDetails from '@/ui/page-components/discover_rates/configurations/search/fcl/services/details.json';
import fclIncotermsMapping from '@/ui/page-components/discover_rates/configurations/search/fcl/services/mapping.json';
import lclServiceDetails from '@/ui/page-components/discover_rates/configurations/search/lcl/services/details.json';
import lclIncotermsMapping from '@/ui/page-components/discover_rates/configurations/search/lcl/services/mapping.json';

function Police() {
	return (
		<img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Police.svg"
			alt="police"
		/>
	);
}

function Hangar() {
	return (
		<img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Hangar.svg"
			alt="hangar"
		/>
	);
}

function Weight() {
	return (
		<img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/weight.svg"
			alt="weight"
		/>
	);
}

function Wave() {
	return (
		<img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-wave.svg"
			alt="wave"
		/>
	);
}

function Circle() {
	return (
		<img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-circle.svg"
			alt="circle"
		/>
	);
}

export const defaultAddedServices = {
	ltl_freight     : ['ltl_freight'],
	ftl_freight     : ['ftl_freight'],
	trailer_freight : ['trailer_freight'],
	haulage_freight : ['haulage_freight'],
	fcl_customs     : ['fcl_customs'],
	lcl_customs     : ['lcl_customs'],
	air_customs     : ['air_customs'],
};

export const defaultIcons = {
	origin_ftl_freight : Police,
	trailer_freight    : Hangar,
	fcl_customs        : Police,
	fcl_cfs            : Hangar,
	vgm                : Weight,
	igm                : Weight,
	fumigation         : Wave,
	dummy              : Circle,
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
		services : fclIncotermsMapping,
		detail   : fclServiceDetails,
	},
	lcl_freight: {
		services : lclIncotermsMapping,
		detail   : lclServiceDetails,
	},
	air_freight: {
		services : airIncotermsMapping,
		detail   : airServiceDetails,
	},
	fcl_customs: {
		services : fclCustomsMapping,
		detail   : fclCustomsDetails,
	},
	lcl_customs: {
		services : lclCustomsMapping,
		detail   : lclCustomsDetails,
	},
	air_customs: {
		services : airCustomsMapping,
		detail   : airCustomsDetails,
	},
	fcl_freight_local: {
		services : fclLocalsMapping,
		detail   : fclLocalsDetails,
	},
	lcl_freight_local: {
		services : lclLocalsMapping,
		detail   : lclLocalsDetails,
	},
	air_freight_local: {
		services : airLocalsMapping,
		detail   : airLocalsDetails,
	},
};
