import COMMODITY_TYPE_MAPPING from '../configurations/SearchFormControls/air-commodity-mapping';

import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';

const getCommoditySubTypeoptions = ({
	originPort = {},
	destinationPort = {},
	commodityType = '',
}) => {
	const { use_domestic_transport: origin } = getCountrySpecificData({
		country_code : originPort?.country_code,
		accessorType : 'navigations',
		accessor     : 'manage_rfq',
	});

	const { use_domestic_transport: destination } = getCountrySpecificData({
		country_code : destinationPort?.country_code,
		accessorType : 'navigations',
		accessor     : 'manage_rfq',
	});

	if (commodityType !== '') {
		if (origin && destination) {
			return COMMODITY_TYPE_MAPPING?.domestic_transport?.[commodityType];
		}
		return COMMODITY_TYPE_MAPPING?.international_freight?.[commodityType];
	}

	return [];
};

export default getCommoditySubTypeoptions;
