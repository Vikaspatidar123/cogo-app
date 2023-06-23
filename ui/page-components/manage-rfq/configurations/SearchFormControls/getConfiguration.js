import AIRControlsAdvanced from './air-controls-advanced';
import AIRServices from './air-services';
import AIRServicesDetails from './air-services-details';
import FCLControlsAdvanced from './fcl-controls-advanced';
import FCLServices from './fcl-services';
import FCLServicesDetails from './fcl-services-details';
import LCLControlsAdvanced from './lcl-controls-advanced';
import LCLServices from './lcl-services';
import LCLServicesDetails from './lcl-services-details';

const getConfiguration = (type, mode, isChannelPartner = false) => {
	const configs = {
		fcl_freight_services            : FCLServices,
		'fcl_freight_service-details'   : FCLServicesDetails,
		'fcl_freight_advanced-controls' : FCLControlsAdvanced(),
		lcl_freight_services            : LCLServices,
		'lcl_freight_service-details'   : LCLServicesDetails,
		'lcl_freight_advanced-controls' : LCLControlsAdvanced(isChannelPartner),
		air_freight_services            : AIRServices,
		'air_freight_service-details'   : AIRServicesDetails,
		'air_freight_advanced-controls' : AIRControlsAdvanced(isChannelPartner),
	};

	return configs[`${mode}_${type}`] || [];
};

export default getConfiguration;
