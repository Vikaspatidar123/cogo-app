import { APP_EVENT, trackEvent } from '@cogo/commons/analytics';
import COMMODITY_MAPPING from '@cogo/commons/constants/COMMODITY_MAPPING';
import CONTAINER_SIZE_MAPPING from '@cogo/commons/constants/CONTAINER_SIZE_MAPPING';
import CONTAINER_TYPE_MAPPING from '@cogo/commons/constants/CONTAINER_TYPE_MAPPING';
import SEARCH_TYPE_MAPPING from '@cogo/commons/constants/SEARCH_TYPE_MAPPING';
import TRUCK_TYPE_MAPPING from '@cogo/commons/constants/TRUCK_TYPE_MAPPING';
import startCase from '@cogo/utils/startCase';

const EVENT_ATTRIBUTES_TO_PASS = {
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
	ftl_freight : ['commodity', 'truck_type', 'trucks_count'],
	ltl_freight : ['commodity', 'weight'],
	fcl_customs : [
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
	rail_haulage: [
		'containers_count',
		'container_type',
		'container_size',
		'commodity',
		'cargo_weight_per_container',
	],
};

const triggerAnalytics = (detail, organization) => {
	const { search_type } = detail || {};
	const newDetail = Object.values(detail.service_details || {}).find(
		(service) => service?.service_type === search_type,
	);

	/* location attributes */
	const location = { origin: null, destination: null };
	if (search_type === 'lcl_freight') {
		location.origin = newDetail?.origin_port;
		location.destination = newDetail?.destination_port;
		trackEvent(APP_EVENT.search_searched_rates, {
			type           : search_type,
			origin         : location.origin.name,
			destination    : location.destination.name,
			commodity      : newDetail.commodity,
			incoterm       : newDetail.inco_term,
			packages_count : newDetail.packages_count,
			weight         : newDetail.weight,
			volume         : newDetail.volume,
		});
	} else if (search_type === 'air_freight') {
		location.origin = newDetail?.origin_airport;
		location.destination = newDetail?.destination_airport;
		trackEvent(APP_EVENT.search_searched_rates, {
			type           : search_type,
			origin         : location.origin.name,
			destination    : location.destination.name,
			commodity      : newDetail.commodity,
			incoterm       : newDetail.inco_term,
			packages_count : newDetail.packages_count,
			weight         : newDetail.weight,
			volume         : newDetail.volume,
		});
	} else if (search_type === 'trailer_freight') {
		location.origin =			newDetail?.origin_location
			|| newDetail?.port
			|| newDetail?.airport
			|| newDetail?.location;
		location.destination = newDetail?.destination_location;
		trackEvent(APP_EVENT.search_searched_rates, {
			type            : search_type,
			origin          : newDetail.origin_location.display_name,
			destination     : newDetail.destination_location.display_name,
			container_count : newDetail.containers_count,
			container_size  : newDetail.container_size,
			container_type  : newDetail.container_type,
			commodity       : newDetail.commodity,
			weight          : newDetail.cargo_weight_per_container * newDetail.containers_count,
		});
	} else if (search_type === 'ftl_freight') {
		location.origin =			newDetail?.origin_location
			|| newDetail?.port
			|| newDetail?.airport
			|| newDetail?.location;
		location.destination = newDetail?.destination_location;
		trackEvent(APP_EVENT.search_searched_rates, {
			type         : search_type,
			origin       : newDetail.origin_location.display_name,
			destination  : newDetail.destination_location.display_name,
			commodity    : newDetail.commodity,
			truck_type   : newDetail.truck_type,
			trucks_count : newDetail.trucks_count,
		});
	} else if (search_type === 'ltl_freight') {
		location.origin =			newDetail?.origin_location
			|| newDetail?.port
			|| newDetail?.airport
			|| newDetail?.location;
		location.destination = newDetail?.destination_location;
		const packages_values = [];
		newDetail.packages.forEach((details) => {
			const x = details.packing_type;
			const { length } = details;
			const { width } = details;
			const depth = details.height;
			const l = length.toString().concat('*');
			const w = width.toString().concat('*');
			const d = depth.toString();
			const y = l.concat(w).concat(d);
			const z = details.packages_count;
			packages_values.push({
				type      : x,
				dimension : y,
				count     : z,
			});
		});
		trackEvent(APP_EVENT.search_searched_rates, {
			type         : search_type,
			origin       : location.origin.display_name,
			destination  : location.destination.display_name,
			commodity    : newDetail.commodity,
			total_weight : newDetail.weight,
			packages     : packages_values,
		});
	} else if (search_type === 'haulage_freight') {
		location.origin =			newDetail?.origin_location
			|| newDetail?.port
			|| newDetail?.airport
			|| newDetail?.location;
		location.destination = newDetail?.destination_location;
		trackEvent(APP_EVENT.search_searched_rates, {
			type            : search_type,
			origin          : newDetail.origin_location.display_name,
			destination     : newDetail.destination_location.display_name,
			container_count : newDetail.containers_count,
			container_size  : newDetail.container_size,
			container_type  : newDetail.container_type,
			commodity       : newDetail.commodity,
			weight          : newDetail.cargo_weight_per_container * newDetail.containers_count,
		});
	} else if (search_type === 'lcl_customs') {
		trackEvent(APP_EVENT.search_searched_rates, {
			type           : search_type,
			location       : newDetail.location.display_name,
			commodity      : newDetail.commodity,
			custom_type    : newDetail.trade_type,
			packages_count : newDetail.packages_count,
			weight         : newDetail.weight,
			volume         : newDetail.volume,
		});
	} else if (search_type === 'air_customs') {
		trackEvent(APP_EVENT.search_searched_rates, {
			type           : search_type,
			location       : newDetail.airport.display_name,
			custom_type    : newDetail.trade_type,
			commodity      : newDetail.commodity,
			packages_count : newDetail.packages_count,
			weight         : newDetail.weight,
			volume         : newDetail.volume,
		});
	}
	/* other attributes for search */
	const searchSpecificAttributes = {
		user_company  : organization?.business_name || organization?.trade_name,
		shipment_mode : SEARCH_TYPE_MAPPING[search_type],
	};
	const attributeKeys = EVENT_ATTRIBUTES_TO_PASS[search_type] || [];
	attributeKeys.forEach((key) => {
		if (newDetail[key]) {
			if (key === 'container_size') {
				searchSpecificAttributes[key] = CONTAINER_SIZE_MAPPING[newDetail[key]];
			} else if (key === 'container_type') {
				searchSpecificAttributes[key] = CONTAINER_TYPE_MAPPING[newDetail[key]];
			} else if (key === 'commodity') {
				searchSpecificAttributes[key] = COMMODITY_MAPPING[newDetail[key]];
			} else if (key === 'inco_term') {
				searchSpecificAttributes[key] = (newDetail[key] || '').toUpperCase();
			} else if (key === 'cargo_handling_type') {
				searchSpecificAttributes[key] = startCase(newDetail[key] || '');
			} else if (key === 'truck_type') {
				searchSpecificAttributes[key] = TRUCK_TYPE_MAPPING[newDetail[key]];
			} else {
				searchSpecificAttributes[key] = newDetail[key] || detail[key];
			}
		}
	});
};
export default triggerAnalytics;
