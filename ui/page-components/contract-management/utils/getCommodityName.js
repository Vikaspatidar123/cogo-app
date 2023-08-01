import { startCase } from '@cogoport/utils';

import { COMMODITY_NAME_MAPPING } from '@/packages/forms/constants/commodities';

const DEFAULT_COMMODITY_NAME = 'General';

const getCommodityName = (commodity) => {
	if (!commodity) return DEFAULT_COMMODITY_NAME;

	const commodityData = COMMODITY_NAME_MAPPING[`${commodity}`];

	return commodityData?.name || startCase(commodity);
};

export default getCommodityName;
