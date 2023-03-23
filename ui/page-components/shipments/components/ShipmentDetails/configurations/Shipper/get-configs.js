import listDetailsFclFreight from './list-details-fcl-freight.json';
import listDetailsLclFreight from './list-details-lcl-freight.json';
import listDetailsAirFeight from './list-details-air-freight.json';
import listDetailsTrailer from './list-details-trailer-freight.json';
import listDetailsFTL from './list-details-ftl-freight.json';
import listDetailsLTL from './list-details-ltl-freight.json';
import listDetailsFCLHaulage from './list-detail-haulage-freight.json';
import listDetailsFclCustoms from './list-detail-fcl-customs.json';
import listDetailsLclCustoms from './list-detail-lcl-customs.json';
import listDetailsAirCustoms from './list-detail-air-customs.json';

const getConfigs = (shipment_type) => {
	const configs = {
		fcl_freight: listDetailsFclFreight,
		lcl_freight: listDetailsLclFreight,
		air_freight: listDetailsAirFeight,
		ltl_freight: listDetailsLTL,
		ftl_freight: listDetailsFTL,
		trailer_freight: listDetailsTrailer,
		haulage_freight: listDetailsFCLHaulage,
		fcl_customs: listDetailsFclCustoms,
		lcl_customs: listDetailsLclCustoms,
		air_customs: listDetailsAirCustoms,
	};
	return configs[shipment_type] || listDetailsFclFreight;
};

export default getConfigs;
