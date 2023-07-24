import { startCase } from '@cogoport/utils';

import { COMMODITY_NAME_MAPPING } from '@/packages/forms/constants/commodities';

const DEFAULT_COMMODITY_NAME = 'General';

/**
 * Get the name of the commodity based on the given commodity code.
 * @param {string} commodity - The commodity code to find the name for.
 * @returns {string} The name of the commodity or 'General' if not found.
 */

const getCommodityName = (commodity) => {
	if (!commodity) return DEFAULT_COMMODITY_NAME;

	const commodityData = COMMODITY_NAME_MAPPING[commodity];

	return commodityData?.name || startCase(commodity);
};

export default getCommodityName;
