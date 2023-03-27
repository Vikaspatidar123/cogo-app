import COMMODITY_MAPPING from '@cogo/commons/constants/COMMODITY_MAPPING';
import CONTAINER_SIZE_MAPPING from '@cogo/commons/constants/CONTAINER_SIZE_MAPPING';
import CONTAINER_TYPE_MAPPING from '@cogo/commons/constants/CONTAINER_TYPE_MAPPING';
import SEARCH_TYPE_MAPPING from '@cogo/commons/constants/SEARCH_TYPE_MAPPING';
import TRUCK_TYPE_MAPPING from '@cogo/commons/constants/TRUCK_TYPE_MAPPING';
import incotermsArray from '@cogo/smart-components/constants/inco-terms.json';
import startCase from '@cogo/utils/startCase';

const SERVICE_ATTRIBUTES = {
	fcl_freight: [
		'containers_count',
		'container_type',
		'container_size',
		'commodity',
		'cargo_weight_per_container',
		'inco_term',
		'trade_type',
	],
	lcl_freight: [
		'commodity',
		'trade_type',
		'inco_term',
		'packages_count',
		'volume',
		'weight',
	],
	air_freight: [
		'commodity',
		'trade_type',
		'inco_term',
		'packages_count',
		'volume',
		'weight',
	],
	trailer_freight: [
		'containers_count',
		'container_type',
		'container_size',
		'commodity',
	],
	ftl_freight: ['commodity', 'truck_type', 'trucks_count'],
	ltl_freight: ['commodity', 'weight'],
	fcl_customs: [
		'trade_type',
		'containers_count',
		'container_type',
		'container_size',
		'commodity',
		'cargo_handling_type',
	],
	lcl_customs: [
		'commodity',
		'trade_type',
		'packages_count',
		'volume',
		'weight',
	],
	air_customs: [
		'commodity',
		'trade_type',
		'packages_count',
		'volume',
		'weight',
	],
	haulage_freight: [
		'containers_count',
		'container_type',
		'container_size',
		'commodity',
		'cargo_weight_per_container',
	],
	fcl_cfs: [
		'trade_type',
		'containers_count',
		'container_type',
		'container_size',
		'commodity',
		'cargo_handling_type',
	],
};

const singleLocationSearchTypes = ['fcl_customs', 'lcl_customs', 'air_customs'];

const getDetail = (key, newDetail, detail) => {
	if (newDetail[key]) {
		if (key === 'container_size') {
			return CONTAINER_SIZE_MAPPING[newDetail[key]];
		}
		if (key === 'container_type') {
			return CONTAINER_TYPE_MAPPING[newDetail[key]];
		}
		if (key === 'commodity') {
			return COMMODITY_MAPPING[newDetail[key]];
		}
		if (key === 'inco_term') {
			return (newDetail[key] || '').toUpperCase();
		}
		if (key === 'cargo_handling_type') {
			return startCase(newDetail[key] || '');
		}
		if (key === 'truck_type') {
			return TRUCK_TYPE_MAPPING[newDetail[key]];
		}
		return newDetail[key] || detail[key];
	}
	return '';
};

const getSearchDetails = (detail) => {
	const { search_type } = detail || {};

	const newDetail = Object.values(detail.service_details || {}).find(
		(service) => service?.service_type === search_type,
	);

	/* location attributes */
	const location = { origin: null, destination: null };
	if (search_type === 'fcl_freight' || search_type === 'lcl_freight') {
		location.origin = newDetail?.origin_port;
		location.destination = newDetail?.destination_port;
	} else if (search_type === 'air_freight') {
		location.origin = newDetail?.origin_airport;
		location.destination = newDetail?.destination_airport;
	} else {
		location.origin =
			newDetail?.origin_location ||
			newDetail?.port ||
			newDetail?.airport ||
			newDetail?.location;
		location.destination = newDetail?.destination_location;
	}

	const { tradeType } =
		incotermsArray.find(
			(incoterm) => incoterm.value === newDetail?.inco_term,
		) || {};
	const singleLocationAttributes = {
		location: location?.origin?.display_name || location?.origin?.name,
	};
	const doubleLocationAttributes = {
		origin_location: location?.origin?.display_name || location?.origin?.name,
		destination_location:
			location?.destination?.display_name || location?.destination?.name,
		trade_type: tradeType ? startCase(tradeType) : undefined,
	};
	const locationAttributes = singleLocationSearchTypes.includes(search_type)
		? singleLocationAttributes
		: doubleLocationAttributes;

	/* other attributes for search */
	const searchSpecificAttributes = {
		user_company:
			detail?.importer_exporter?.business_name ||
			detail?.importer_exporter?.short_name,
		shipment_mode: SEARCH_TYPE_MAPPING[search_type],
	};
	const serviceDetails = Object.values(detail?.service_details || {})
		.map((item) => {
			const service_type = item?.service_type;
			const serviceAttributesToCatch = SERVICE_ATTRIBUTES[service_type] || [];
			let dataAttributes = `${startCase(service_type)}: \n`;
			serviceAttributesToCatch.forEach((key) => {
				dataAttributes += `${startCase(key)} - ${getDetail(
					key,
					item,
					detail,
				)}\n`;
			});
			return dataAttributes;
		})
		.join('\n');

	const searchDetail = Object.keys(searchSpecificAttributes)
		.map((key) => `${startCase(key)} - ${searchSpecificAttributes[key]}\n`)
		.join('\n');

	const locationDetails = Object.keys(locationAttributes)
		.map((key) => `${startCase(key)} - ${locationAttributes[key]}\n`)
		.join('\n');

	return searchDetail + locationDetails + serviceDetails;
};
export default getSearchDetails;
