import formatDateToString from '@cogoport/components';

import {
	containerSizeMaping,
	containerTypeMaping,
	incotermMaping,
	serviceTypeMaping,
} from '../constants/mapping';

import { useSelector } from '@/packages/store';

const spotSearchPayload = (props) => {
	const sec = Date.now();
	const millisec = 86400000 * 15 + sec;
	const defaultExpiryDate = new Date(millisec).toISOString();

	const {
		transportMode,
		serviceType,
		incoterm = 'CIF',
		originId = '',
		destinationId = '',
		containerSize = '20FT',
		containerType = 'DRY',
		containerCount = 1,
		packageType = 'BOX',
		packageHandling = 'STACKABLE',
		quantity = 1,
		weight = 1,
		volume = 1,
		expiryDate = defaultExpiryDate,
	} = props || {};

	const { profile } = useSelector((s) => s);
	const { id = '', branch = {} } = profile || {};

	if (transportMode === 'OCEAN') {
		if (serviceTypeMaping[serviceType] === 'fcl_freight') {
			const payload = {
				search_type                     : serviceTypeMaping[serviceType].toLowerCase(),
				source                          : 'platform',
				importer_exporter_branch_id     : branch?.id,
				user_id                         : id,
				fcl_freight_services_attributes : [
					{
						origin_port_id             : originId,
						destination_port_id        : destinationId,
						container_size             : containerSizeMaping[containerSize],
						container_type             : containerTypeMaping[containerType],
						commodity                  : 'general',
						containers_count           : containerCount,
						bls_count                  : 1,
						inco_term                  : incotermMaping[incoterm],
						cargo_weight_per_container : 18,
						status                     : 'active',
					},
				],
			};
			return payload;
		}

		if (serviceTypeMaping[serviceType] === 'lcl_freight') {
			const payload = {
				search_type                     : serviceTypeMaping[serviceType].toLowerCase(),
				source                          : 'platform',
				importer_exporter_branch_id     : branch?.id,
				user_id                         : id,
				lcl_freight_services_attributes : [
					{
						origin_port_id      : originId,
						destination_port_id : destinationId,
						commodity           : 'general',
						inco_term           : incotermMaping[incoterm],
						bls_count           : 1,
						packages_count      : quantity || 1,
						weight,
						volume,
						status              : 'active',
					},
				],
			};
			return payload;
		}
	}

	if (transportMode === 'AIR') {
		const payload = {
			search_type                     : 'air_freight',
			source                          : 'platform',
			importer_exporter_branch_id     : branch?.id,
			user_id                         : id,
			air_freight_services_attributes : [
				{
					origin_airport_id      : originId,
					destination_airport_id : destinationId,
					cargo_clearance_date   : formatDateToString(expiryDate),
					commodity              : 'general',
					commodity_details      : [
						{
							commodity_type: 'all',
						},
					],
					inco_term           : incotermMaping[incoterm],
					payment_type        : 'prepaid',
					packages_count      : quantity,
					weight              : weight || 1,
					volume              : volume || 1,
					status              : 'active',
					dry_ice_required    : false,
					load_selection_type : 'cargo_per_package',
					packages            : [
						{
							length         : 1,
							width          : 1,
							height         : 1,
							packages_count : Number.parseInt(quantity, 10) || 1,
							packing_type   : packageType.toLowerCase(),
							handling_type  : packageHandling.toLowerCase(),
							package_weight : +weight || 1,
						},
					],
				},
			],
		};
		return payload;
	}
	return {};
};

export default spotSearchPayload;
