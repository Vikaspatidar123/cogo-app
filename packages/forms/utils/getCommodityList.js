import {
	COMMODITY_NAME_MAPPING,
	COMMODITY_SURCHARGE_CONTAINER_COMMODITY_MAPPINGS,
	FREIGHT_CONTAINER_COMMODITY_MAPPINGS,
	LOCAL_CONTAINER_COMMODITY_MAPPINGS,
	LCL_FRIEGHT_COMMODITIES,
	FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING,
	HAZ_CLASSES,
	AIR_LOCAL_COMMODITIES,
	AIR_FREIGHT_COMMODITIES,
	AIR_HAZARDOUS_COMMODITIES,
	FTL_COMMODITIES,
} from '../constants/commodities';

const getCommoditiesDetails = (list = [], keepAll = false, isNullValue = true) => {
	const initialCommodity = keepAll
		? [{ label: 'All commodities', value: 'all_commodity' }]
		: [];
	const restCommodities = list.map((item) => {
		const commodityMapping = COMMODITY_NAME_MAPPING[item] || {};
		return {
			label     : commodityMapping.name || 'All Commodities',
			value     : item || (isNullValue ? 'all_commodity' : null),
			is_reefer : commodityMapping.is_reefer || false,
			is_haz    : commodityMapping.is_haz || false,
		};
	});
	return [...initialCommodity, ...restCommodities];
};

const getCommodityList = (type, contType = 'standard') => {
	const containerType = contType === null || contType === undefined || contType === ''
		? 'standard'
		: contType;

	switch (type) {
		case 'all_fcl_freight':
			return getCommoditiesDetails(
				Array(
					...new Set(
						Object.values(FREIGHT_CONTAINER_COMMODITY_MAPPINGS).flat(),
					),
				),
				false,
				false,
			);
		case 'local':
			return getCommoditiesDetails(
				LOCAL_CONTAINER_COMMODITY_MAPPINGS[containerType],
				false,
				false,
			);
		case 'commodity_surcharge':
			return getCommoditiesDetails(
				COMMODITY_SURCHARGE_CONTAINER_COMMODITY_MAPPINGS[containerType],
			);
		case 'freight':
			return getCommoditiesDetails(
				FREIGHT_CONTAINER_COMMODITY_MAPPINGS[containerType],
			);
		case 'lcl_freight':
			return getCommoditiesDetails(LCL_FRIEGHT_COMMODITIES);
		case 'fcl_customs':
			return getCommoditiesDetails(
				FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING[containerType],
			);
		case 'air_freight':
			return getCommoditiesDetails(AIR_FREIGHT_COMMODITIES);
		case 'air_local':
			return getCommoditiesDetails(AIR_LOCAL_COMMODITIES);
		case 'air_customs':
			return getCommoditiesDetails(AIR_HAZARDOUS_COMMODITIES, true);
		case 'ftl_freight':
			return getCommoditiesDetails(FTL_COMMODITIES, true);
		case 'hazardous':
			return getCommoditiesDetails(HAZ_CLASSES, true);
		default:
			return getCommoditiesDetails(
				LOCAL_CONTAINER_COMMODITY_MAPPINGS[containerType],
			);
	}
};

export default getCommodityList;
