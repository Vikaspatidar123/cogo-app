import COMMODITY_TYPE_MAPPING from '../configurations/SearchFormControls/air-commodity-mapping';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const INDIA_COUNTRY_CODE = GLOBAL_CONSTANTS.country_code.IN;

const getCommoditySubTypeoptions = ({
	originPort = {},
	destinationPort = {},
	commodityType = '',
}) => {
	if (commodityType !== '') {
		if (
			originPort?.country_code === INDIA_COUNTRY_CODE
			&& destinationPort?.country_code === INDIA_COUNTRY_CODE
		) {
			return COMMODITY_TYPE_MAPPING?.domestic_transport?.[commodityType];
		}
		return COMMODITY_TYPE_MAPPING?.international_freight?.[commodityType];
	}

	return [];
};

export default getCommoditySubTypeoptions;
