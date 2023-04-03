import { AirServicesDetails, FCLServicesDetails, LCLServicesDetails }
	from '@/ui/page-components/discover_rates/configurations';

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
		// services : fclIncotermsMapping,
		detail: FCLServicesDetails,
	},
	lcl_freight: {
		// services : lclIncotermsMapping,
		detail: LCLServicesDetails,
	},
	air_freight: {
		// services : airIncotermsMapping,
		detail: AirServicesDetails,
	},
	// fcl_customs: {
	// 	services : fclCustomsMapping,
	// 	detail   : fclCustomsDetails,
	// },
	// lcl_customs: {
	// 	services : lclCustomsMapping,
	// 	detail   : lclCustomsDetails,
	// },
	// air_customs: {
	// 	services : airCustomsMapping,
	// 	detail   : airCustomsDetails,
	// },
	// fcl_freight_local: {
	// 	services : fclLocalsMapping,
	// 	detail   : fclLocalsDetails,
	// },
	// lcl_freight_local: {
	// 	services : lclLocalsMapping,
	// 	detail   : lclLocalsDetails,
	// },
	// air_freight_local: {
	// 	services : airLocalsMapping,
	// 	detail   : airLocalsDetails,
	// },
};
