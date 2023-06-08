import { Button } from '@cogoport/components';

import { useRouter } from '@/packages/next';
import { trackEvent, APP_EVENT } from '@/ui/commons/constants/analytics';
import useCreateSearch from '@/ui/page-components/discover_rates/hooks/useCreateSearch';
import formatMainServiceData from '@/ui/page-components/discover_rates/utils/format-main-service-data';

function BtnContainer({ data = {} }) {
	const { push } = useRouter();
	const { createNewSearch } = useCreateSearch({});
	const { search_type } = data;
	const formattedData = formatMainServiceData(search_type, [
		{ ...(data || {}), service_type: search_type },
	]);

	// 	container_size = '',
	// 	container_type = '',
	// 	containers_count = 0,
	// 	destination_port_id = '',
	// 	destination_airport_id = '',
	// 	origin_port_id = '',
	// 	origin_airport_id = '',
	// 	search_type = 'FCL_FREIGHT',
	// 	inco_term = '',
	// 	volume = 0,
	// 	weight = 0,
	// 	packages_count = 0,
	// 	destination_port = '',
	// 	destination_airport = '',
	// 	origin_airport = '',
	// 	origin_port = '',
	// } = data;
	const handleQuotationClick = async () => {
		const params = {
			...formattedData,
			search_type,
			status    : 'active',
			commodity : data.commodity,
		};
		const otherParams = {
			fcl_freight     : ['origin_port_id', 'destination_port_id'],
			lcl_freight     : ['origin_port_id', 'destination_port_id', 'inco_term'],
			air_freight     : ['origin_airport_id', 'destination_airport_id', 'inco_term'],
			trailer_freight : [
				'origin_location_id',
				'destination_location_id',
				'haulage_type',
				'transport_mode',
				'shipping_line_id',
			],
			ftl_freight     : ['origin_location_id', 'destination_location_id'],
			ltl_freight     : ['origin_location_id', 'destination_location_id'],
			fcl_customs     : ['port_id'],
			lcl_customs     : ['trade_type', 'packages_count', 'location_id'],
			air_customs     : ['trade_type', 'packages_count', 'airport_id'],
			haulage_freight : [
				'origin_location_id',
				'destination_location_id',
				'haulage_type',
				'transport_mode',
				'shipping_line_id',
			],
		};
		(otherParams[search_type] || []).forEach((param) => {
			params[param] = formattedData[param];
		});
		if (params.search_type === 'fcl_freight') {
			const container_details = [];
			let size;
			let container_type;
			let count;
			let commodity;
			let weight;
			const n = params.containers.length;

			for (let i = 0; i < n; i += 1) {
				size = params.containers[i].container_size;
				container_type = params.containers[i].container_type_commodity.container_type;
				count = params.containers[i].containers_count;
				commodity = params.containers[i].container_type_commodity.commodity;
				weight = params.containers[i].cargo_weight_per_container;
				container_details.push({
					container_count : count,
					container_size  : size,
					container_type,
					commodity,
					weight,
				});
			}

			trackEvent(APP_EVENT.search_past_spot_rates, {
				type        : params.search_type,
				origin      : params.origin_port.name,
				destination : params.destination_port.name,
				containers  : container_details,
				incoterm    : params.inco_term,
			});
		} else if (params.search_type === 'lcl_freight') {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type           : params.search_type,
				origin         : params.origin_port.name,
				destination    : params.destination_port.name,
				commodity      : params.commodity,
				incoterm       : params.inco_term,
				packages_count : params.packages_count,
				weight         : params.weight,
				volume         : params.volume,
			});
		} else if (params.search_type === 'air_freight') {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type           : params.search_type,
				origin         : params.origin_airport.name,
				destination    : params.destination_airport.name,
				commodity      : params.commodity,
				incoterm       : params.inco_term,
				packages_count : params.packages_count,
				weight         : params.weight,
				volume         : params.volume,
			});
		} else if (
			params.search_type === 'trailer_freight'
      || params.search_type === 'haulage_freight'
		) {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type            : params.search_type,
				origin          : params.origin_location.name,
				destination     : params.destination_location.name,
				container_count : params.containers[0]?.containers_count,
				container_size  : params.containers[0]?.container_size,
				container_type  : params.containers[0]?.container_type,
				commodity       : params.containers[0]?.commodity,
				weight          : params.containers[0]?.cargo_weight_per_container,
			});
		} else if (params.search_type === 'ftl_freight') {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type        : params.search_type,
				origin      : params.origin_location.name,
				destination : params.destination_location.name,
				commodity   : params.commodity,
				truck_type  : params.truck_type,
				truck_count : params.trucks_count,
			});
		} else if (params.search_type === 'ltl_freight') {
			const packages_values = [];
			const n = params.packages.length;
			for (let i = 0; i < n; i += 1) {
				const details = params.packages[i];
				const x = details.packing_type;
				const { length } = details.dimensions;
				const { width } = details.dimensions;
				const depth = details.dimensions.height;
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
			}
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type         : params.search_type,
				origin       : params.origin_location.name,
				destination  : params.destination_location.name,
				commodity    : params.commodity,
				total_weight : params.weight,
				packages     : packages_values,
			});
		} else if (params.search_type === 'fcl_customs') {
			const container_details = [];
			let size;
			let container_type;
			let count;
			let commodity;
			let weight;
			const n = params.containers.length;
			for (let i = 0; i < n; i += 1) {
				size = params.containers[i].container_size;
				container_type = params.containers[i].container_type_commodity.container_type;
				count = params.containers[i].containers_count;
				commodity = params.containers[i].container_type_commodity.commodity;
				weight = params.containers[i].cargo_weight_per_container;
				container_details.push({
					container_count : count,
					container_size  : size,
					container_type,
					commodity,
					weight,
				});
			}
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type        : params.search_type,
				location    : params.location,
				custom_type : params.custom_type,
				containers  : container_details,
			});
		} else if (
			params.search_type === 'lcl_customs'
      || params.search_type === 'air_customs'
		) {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type           : params.search_type,
				location       : params.location,
				custom_type    : params.custom_type,
				commodity      : params.commodity,
				packages_count : params.packages_count,
				weight         : params.weight,
				volume         : params.volume,
			});
		}
		const postData = await createNewSearch(params, search_type);
		if (!postData.error) {
			push(postData.href, postData.as);
		}
	};
	return (
		<Button
			onClick={() => handleQuotationClick()}
			size="sm"
			themeType="accent"
		>
			Book
		</Button>
	);
}

export default BtnContainer;
