import COMMODITY_TYPE_MAPPING from '../configurations/SearchFormControls/air-commodity-mapping';

import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';

const getCommoditySubTypeoptions = ({
	originPort = {},
	destinationPort = {},
	commodityType = '',
}) => {
	const { is_country_india: isOriginIndia } = getCountrySpecificData({
		country_code : originPort?.country_code,
		accessorType : 'navigations',
		accessor     : 'common',
	});

	const { is_country_india: isDestinationIndia } = getCountrySpecificData({
		country_code : destinationPort?.country_code,
		accessorType : 'navigations',
		accessor     : 'common',
	});

	if (commodityType !== '') {
		if (isOriginIndia && isDestinationIndia
		) {
			return COMMODITY_TYPE_MAPPING?.domestic_transport?.[commodityType];
		}
		return COMMODITY_TYPE_MAPPING?.international_freight?.[commodityType];
	}

	return [];
};

export default getCommoditySubTypeoptions;
