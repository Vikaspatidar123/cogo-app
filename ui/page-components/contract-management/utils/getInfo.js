import { startCase, upperCase } from '@cogoport/utils';

const dataObject = [
	{ key: 'Container', value: 'container_size' },
	{ key: 'Container Count', value: 'containers_count' },
	{ key: 'Container Type', value: 'container_type' },
	{ key: 'Commodity', value: 'commodity' },
	{ key: 'Inco Term', value: 'inco_term' },
	{ key: 'Trucks Count', value: 'trucks_count' },
	{ key: 'Trade Type', value: 'trade_type' },
	{ key: 'No of Packages', value: 'packages_count' },
	{ key: 'Volume', value: 'volume' },
	{ key: 'Total Weight', value: 'weight' },
	{ key: 'Haulage Type', value: 'haulage_type' },
	{ key: 'Transport Mode', value: 'transport_mode' },
	{ key: 'Cargo Wt Per Container', value: 'cargo_weight_per_container' },
];

const dataFormat = (item, data) => {
	const mapping = {
		container_size             : `${data[item.value]} FT`,
		containers_count           : `${data[item.value]} Container`,
		inco_term                  : `${upperCase(data[item.value])}`,
		volume                     : `${data[item.value]} cbm`,
		weight                     : `${data[item.value]} kg`,
		cargo_weight_per_container : `${data[item.value]} MT`,
		packages_count             : `${data[item.value]} pkg`,
		default                    : startCase(data[item.value]),
	};

	return ({
		valueKey  : item.key,
		value     : item.value,
		valueText : mapping[item.value] || mapping.default,
	});
};

const getInfo = (data = {}) => {
	const finalData = [];

	(dataObject || []).forEach((item) => {
		if (data && data[item.value]) {
			finalData.push(dataFormat(item, data));
		}
	});

	return finalData;
};

export default getInfo;
