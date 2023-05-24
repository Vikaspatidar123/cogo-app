import { format } from '@cogoport/utils';

import {
	incotermMaping,
	containerTypeMaping,
	containerSizeMaping,
} from '../common/Maping';

const cargoHandler = (type) => {
	if (type === 'import') {
		return 'delivery_from_dock';
	}
	return 'stuffing_at_factory';
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

	const tradeType = () => {
		const isImport = ['FOB', 'EXW', 'FCA', 'FAS'].includes(incoterm);
		return isImport ? 'import' : 'export';
	};
	const createPayload = () => {
		if (activeTab === 'OCEAN') {
			if (serviceType === 'FCL_FREIGHT') {
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
							container_type             : containerTypeMaping[containerType],
							commodity                  : 'general',
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
							container_type       : containerTypeMaping[containerType],
							commodity            : null,
							containers_count     : containerCount,
							bls_count            : 1,
							status               : 'active',
							trade_type           : tradeType(),
							// cargo_handling_type: 'stuffing_at_factory',
							cargo_handling_type  : cargoHandler(tradeType()),
							cargo_value,
							cargo_value_currency : currency,
						},
					],
					fcl_customs_services_attributes: [
						{
							port_id             : originId,
							container_size      : containerSizeMaping[containerSize],
							container_type      : containerTypeMaping[containerType],
							commodity           : null,
							containers_count    : containerCount,
							bls_count           : 1,
							status              : 'active',
							trade_type          : tradeType(),
							// cargo_handling_type: 'stuffing_at_dock',
							cargo_handling_type : cargoHandler(tradeType()),
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
							commodity           : 'general',
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
							commodity      : 'general',
							location_id    : originId,
							packages_count : 1,
							status         : 'active',
							trade_type     : tradeType(incoterm),
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
						cargo_clearance_date   : format(expiryDate, 'yyyy-MM-dd'),
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

				air_customs_services: [
					{
						airport_id     : originId,
						commodity      : 'all_commodities',
						packages_count : Number.parseInt(quantity, 10) || 1,
						status         : 'active',
						trade_type     : tradeType(incoterm),
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
