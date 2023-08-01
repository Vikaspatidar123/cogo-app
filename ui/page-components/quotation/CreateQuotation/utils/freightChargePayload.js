import {
	incotermMaping,
	containerTypeMaping,
	containerSizeMaping,
} from '../common/Maping';

import { commoditiesMapping } from '@/ui/commons/constants/commoditiesMapping';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;

const cargoHandlerMapping = {
	import : 'delivery_from_dock',
	export : 'stuffing_at_factory',
};

const getTradeType = (incoterm) => {
	const isImport = ['FOB', 'EXW', 'FCA', 'FAS'].includes(incoterm);
	return isImport ? 'import' : 'export';
};

const freightChargesPayload = ({ id, branch, allData, activeTab, cargo_value }) => {
	const formData = allData || {};
	const {
		serviceType,
		originId,
		destinationId,
		containerSize,
		containerType,
		containerCount,
		incoterm,
		quantity,
		weight,
		volume,
		packageType,
		packageHandling,
		expiryDate,
		currency,
	} = formData;

	const tradeType = getTradeType(incoterm);

	const container_type = containerTypeMaping[containerType];
	const cargoHandlingType = cargoHandlerMapping[tradeType];

	const cargoClearanceDate = formatDate({
		date       : expiryDate,
		formatDate : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	});

	const createPayload = () => {
		if (activeTab === 'OCEAN') {
			if (serviceType === 'FCL_FREIGHT') {
				const commodity = commoditiesMapping.fcl_freight[container_type][ZEROTH_INDEX];
				const payload = {
					search_type                     : serviceType.toLowerCase(),
					source                          : 'platform',
					importer_exporter_branch_id     : branch?.id,
					user_id                         : id,
					fcl_freight_services_attributes : [
						{
							origin_port_id             : originId,
							destination_port_id        : destinationId,
							container_size             : containerSizeMaping[containerSize],
							container_type,
							commodity,
							containers_count           : containerCount,
							bls_count                  : 1,
							inco_term                  : incotermMaping[incoterm],
							cargo_weight_per_container : 18,
							status                     : 'active',
						},
					],
					fcl_cfs_services_attributes: [
						{
							port_id              : originId,
							container_size       : containerSizeMaping[containerSize],
							container_type,
							commodity            : null,
							containers_count     : containerCount,
							bls_count            : 1,
							status               : 'active',
							trade_type           : tradeType,
							cargo_handling_type  : cargoHandlingType,
							cargo_value,
							cargo_value_currency : currency,
						},
					],
					fcl_customs_services_attributes: [
						{
							port_id             : originId,
							container_size      : containerSizeMaping[containerSize],
							container_type,
							commodity           : null,
							containers_count    : containerCount,
							bls_count           : 1,
							status              : 'active',
							trade_type          : tradeType,
							cargo_handling_type : cargoHandlingType,
						},
					],
				};
				return payload;
			}

			if (serviceType === 'LCL_FREIGHT') {
				const payload = {
					search_type                     : serviceType.toLowerCase(),
					source                          : 'platform',
					importer_exporter_branch_id     : branch?.id,
					user_id                         : id,
					lcl_freight_services_attributes : [
						{
							origin_port_id      : originId,
							destination_port_id : destinationId,
							commodity           : commoditiesMapping.lcl_freight[ZEROTH_INDEX],
							inco_term           : incotermMaping[incoterm],
							bls_count           : 1,
							packages_count      : quantity,
							weight,
							volume,
							status              : 'active',
						},
					],

					lcl_customs_services_attributes: [
						{
							bls_count      : 1,
							commodity      : commoditiesMapping.lcl_freight[ZEROTH_INDEX],
							location_id    : originId,
							packages_count : 1,
							status         : 'active',
							trade_type     : tradeType,
							volume,
							weight,
						},
					],
				};
				return payload;
			}
		}

		if (activeTab === 'AIR') {
			const payload = {
				search_type                     : 'air_freight',
				source                          : 'platform',
				importer_exporter_branch_id     : branch?.id,
				user_id                         : id,
				air_freight_services_attributes : [
					{
						origin_airport_id      : originId,
						destination_airport_id : destinationId,
						cargo_clearance_date   : cargoClearanceDate,
						commodity              : commoditiesMapping.air_freight[ZEROTH_INDEX],
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

				air_customs_services: [
					{
						airport_id     : originId,
						commodity      : 'all_commodities',
						packages_count : Number.parseInt(quantity, 10) || 1,
						status         : 'active',
						trade_type     : tradeType,
						volume         : volume || 1,
						weight         : +weight || 1,
					},
				],
			};
			return payload;
		}

		return {};
	};

	return createPayload();
};

export default freightChargesPayload;
