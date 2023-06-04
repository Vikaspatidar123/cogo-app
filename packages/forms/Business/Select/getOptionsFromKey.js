import { startCase } from '@cogoport/utils';

import ContainerSizes from '../../constants/container-size.json';
import ContainerTypes from '../../constants/container-types.json';
import currencies from '../../constants/currencies';
import TruckTypes from '../../constants/truck-types.json';
import getCommodityList from '../../utils/getCommodityList';

// eslint-disable-next-line import/no-unresolved
import countries from '@/.data-store/constants/countries.json';

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
	} else if (commodityType) {
		data.options = getCommodityList(commodityType, containerType);
	} else if (key === 'commodities') {
		data.options = getCommodityList('freight');
	} else if (key === 'countries') {
		data.options = countries;
		data.valueKey = 'id';
		data.labelKey = 'name';
	}

	return data;
};

export default getOptionsFromKey;
