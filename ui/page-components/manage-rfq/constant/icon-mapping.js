import {
	IcMTrailorFull,
	IcCFcl,
	IcMCustoms,
	IcMHaulage,
	IcMCfs,
	IcCLcl,
	IcCAir,
} from '@cogoport/icons-react';

const IconMapping = {
	fcl_freight           : <IcCFcl className="fcl-freight-icon" />,
	lcl_freight           : <IcCLcl className="lcl-freight-icon" />,
	air_freight           : <IcCAir className="air-freight-icon" />,
	import_transportation : (
		<IcMTrailorFull className="import-transportation-icon" />
	),
	export_fcl_customs     : <IcMCustoms className="export-fcl-customs-icon" />,
	import_fcl_customs     : <IcMCustoms className="import-fcl-customs-icon" />,
	import_haulage_freight : (
		<IcMHaulage className="import-haulage-freight-icon" />
	),
	export_haulage_freight: (
		<IcMHaulage className="export-haulage-freight-icon" />
	),
	export_transportation: (
		<IcMTrailorFull className="export-transportation-icon" />
	),
	import_fcl_cfs     : <IcMCfs className="import-fcl-cfs-icon" />,
	export_fcl_cfs     : <IcMCfs className="export-fcl-cfs-icon" />,
	export_lcl_customs : <IcMCustoms className="export-lcl-customs-icon" />,
	import_lcl_customs : <IcMCustoms className="import-lcl-customs-icon" />,
	import_air_customs : <IcMCustoms className="export-air-customs-icon" />,
	export_air_customs : <IcMCustoms className="import-air-customs-icon" />,
};

export default IconMapping;
