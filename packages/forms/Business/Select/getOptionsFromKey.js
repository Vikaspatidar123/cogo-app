/* eslint-disable import/no-unresolved */
import { startCase } from '@cogoport/utils';

import getCommodityList from '../../utils/getCommodityList';

import ContainerSizes from '@/packages/forms/constants/container-size.json';
import ContainerTypes from '@/packages/forms/constants/container-types.json';
import currencies from '@/packages/forms/constants/currencies';
import TruckTypes from '@/packages/forms/constants/truck-types.json';

const getOptionsFromKey = (
	key,
	{ commodityType, containerType, country_code = 'IN' },
) => {
	const data = {
		options  : null,
		valueKey : 'value',
		labelKey : 'label',
	};

	if (key === 'truck_types') {
		const applicableTrucks = TruckTypes.filter(
			(truck) => truck.country_codes.includes(country_code)
				|| truck.country_codes.includes('ALL'),
		);
		data.options = applicableTrucks.map((truck) => ({
			...truck,
			label: `${startCase(truck.type)} Body ${truck.label}`,
		}));
	} else if (key === 'currencies') {
		data.options = currencies;
	} else if (key === 'container-sizes') {
		data.options = ContainerSizes;
	} else if (key === 'container-types') {
		data.options = ContainerTypes;
	} else if (key === 'commodities') {
		data.options = getCommodityList('freight');
	}
	return data.options ? data : null;
};

export default getOptionsFromKey;
