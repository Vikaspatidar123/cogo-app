import OriginDestinationTeuForm from './BuyServices/OriginDestinationTeuForm';
import RegionTruckTypeForm from './BuyServices/RegionTruckTypeForm';
import RegionServiceForm from './BuyServices/RegionServiceForm';
import FclCfsForm from './BuyServices/FclCfsForm';

import OriginDestinationForm from './SellServices/OriginDestinationTeuForm';
import RegionTypeForm from './SellServices/RegionTruckTypeForm';
import RegionServicesForm from './SellServices/RegionServiceForm';
import FclCfsTypeForm from './SellServices/FclCfsForm';

const FREIGHT_COMPONENT_MAPPING = {
	buyServices: {
		fcl_freight: OriginDestinationTeuForm,
		lcl_freight: OriginDestinationTeuForm,
		air_freight: OriginDestinationTeuForm,
		ftl_freight: RegionTruckTypeForm,
		ltl_freight: RegionTruckTypeForm,
		trailer_freight: RegionTruckTypeForm,
		haulage_freight: RegionTruckTypeForm,
		fcl_customs: RegionServiceForm,
		lcl_customs: RegionServiceForm,
		air_customs: RegionServiceForm,
		fcl_cfs: FclCfsForm,
	},
	sellServices: {
		fcl_freight: OriginDestinationForm,
		lcl_freight: OriginDestinationForm,
		air_freight: OriginDestinationForm,
		ftl_freight: RegionTypeForm,
		ltl_freight: RegionTypeForm,
		trailer_freight: RegionTypeForm,
		haulage_freight: RegionTypeForm,
		fcl_customs: RegionServicesForm,
		lcl_customs: RegionServicesForm,
		air_customs: RegionServicesForm,
		fcl_cfs: FclCfsTypeForm,
	},
};

export default FREIGHT_COMPONENT_MAPPING;
