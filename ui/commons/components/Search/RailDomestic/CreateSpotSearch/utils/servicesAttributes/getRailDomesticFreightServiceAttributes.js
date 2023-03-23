import { get, isEmpty } from '@cogoport/front/utils';
import getRailDomesticAdditionalServiceType from '../getRailDomesticAdditionalServiceType';
import RAIL_DOMESTIC_CARGO_HANDLING_COMMODITY_TYPE_MAPPING from '../../configurations/rail-domestic-cargo-handling-commodity-type-mapping.json';
import RAIL_DOMESTIC_TRAILER_CONTAINER_TYPE_MAPPING from '../../configurations/rail-domestic-trailer-container-type-mapping.json';

const CARGO_HANDLING_CONSTANTS = {
	stuffing_at_factory: 'trailer',
	delivery_from_dock: 'trailer',
	stuffing_at_dock: 'truck',
	destuffing_at_dock: 'truck',
	THROUGH_TRAILER: ['stuffing_at_factory', 'delivery_from_dock'],
	THROUGH_TRUCK: ['stuffing_at_dock', 'destuffing_at_dock'],
	STUFFING: ['stuffing_at_factory', 'stuffing_at_dock'],
	DE_STUFFING: ['delivery_from_dock', 'destuffing_at_dock'],
};

const getRailDomesticFreightServiceAttributesDetails = ({
	routeSearch,
	cargoDetails,
	cargoContainerDetails,
}) => {
	const { origin_location_id, destination_location_id } = routeSearch || {};

	const {
		container_size,
		container_type,
		cargo_weight_per_container,
		container_count,
		commodity_type,
		commodity_subtype,
		packaging_type,
		is_door_pickup,
		is_doorstep_delivery,
	} = cargoContainerDetails;

	const isDoorPickupRequired = (is_door_pickup || []).includes(true);
	const isDoorstepDeliveryRequired = (is_doorstep_delivery || []).includes(
		true,
	);

	return {
		origin_location_id,
		destination_location_id,
		...(cargoDetails || {}),
		container_size: `${container_size}`,
		container_type,
		cargo_weight_per_container: Number(cargo_weight_per_container).toFixed(2),
		containers_count: Number(container_count) || 0,
		commodity: commodity_type,
		commodity_subtype,
		packing_type: packaging_type,
		additional_service_type: getRailDomesticAdditionalServiceType({
			isDoorPickupRequired,
			isDoorstepDeliveryRequired,
		}),
		trade_type: 'domestic',
		transport_mode: 'rail',
		status: 'active',
	};
};

const getCargoHandlingServiceAttributesDetails = ({
	routeSearch,
	cargoContainerDetails,
	cargoHandlingDetails,
}) => {
	const { origin_location_id, destination_location_id } = routeSearch || {};

	const {
		container_size,
		container_type,
		cargo_weight_per_container,
		container_count,
		commodity_type,
		commodity_subtype,
	} = cargoContainerDetails;

	const { cargo_handling, location, truck_type, trucks_count } =
		cargoHandlingDetails;

	const commodity =
		get(
			RAIL_DOMESTIC_CARGO_HANDLING_COMMODITY_TYPE_MAPPING,
			`[${commodity_type}][${commodity_subtype}][${CARGO_HANDLING_CONSTANTS[cargo_handling]}]`,
		) || '';

	const {
		STUFFING: STUFFING_CARGO_HANDLING,
		DE_STUFFING: DE_STUFFING_CARGO_HANDLING,
		THROUGH_TRAILER: THROUGH_TRAILER_CARGO_HANDLING,
		THROUGH_TRUCK: THROUGH_TRUCK_CARGO_HANDLING,
	} = CARGO_HANDLING_CONSTANTS;

	return {
		...(STUFFING_CARGO_HANDLING.includes(cargo_handling) && {
			origin_location_id: location,
			destination_location_id: origin_location_id,
		}),
		...(DE_STUFFING_CARGO_HANDLING.includes(cargo_handling) && {
			origin_location_id: destination_location_id,
			destination_location_id: location,
		}),
		...(THROUGH_TRAILER_CARGO_HANDLING.includes(cargo_handling) && {
			container_size: `${container_size}`,
			container_type:
				RAIL_DOMESTIC_TRAILER_CONTAINER_TYPE_MAPPING[container_type] || '',
			cargo_weight_per_container,
			containers_count: Number(container_count) || 0,
			commodity: commodity === 'all_commodities' ? null : commodity,
			status: 'active',
			trade_type: 'domestic',
			trip_type: 'one_way',
		}),
		...(THROUGH_TRUCK_CARGO_HANDLING.includes(cargo_handling) && {
			load_selection_type: 'truck',
			truck_type,
			trucks_count,
			status: 'active',
			trade_type: 'domestic',
			trip_type: 'one_way',
		}),
	};
};

const getRailDomesticFreightServiceAttributes = ({ formValues }) => {
	const { routeSearch, cargoAndLoadDetailsContent } = formValues;

	const { cargoDetails, cargoContainersDetails } =
		cargoAndLoadDetailsContent || {};

	const servicesAttributes = {
		rail_domestic_freight: [],
		ftl_freight: [],
		trailer_freight: [],
	};

	const CARGO_HANDLING_SERVICES_ATTRIBUTES_MAPPING = {
		stuffing_at_factory: servicesAttributes.trailer_freight,
		stuffing_at_dock: servicesAttributes.ftl_freight,
		delivery_from_dock: servicesAttributes.trailer_freight,
		destuffing_at_dock: servicesAttributes.ftl_freight,
	};

	(cargoContainersDetails || []).forEach((cargoContainerDetails) => {
		const {
			is_door_pickup,
			is_door_pickup_data,
			is_doorstep_delivery,
			is_doorstep_delivery_data,
		} = cargoContainerDetails;

		const isDoorPickupRequired = (is_door_pickup || []).includes(true);
		const isDoorstepDeliveryRequired = (is_doorstep_delivery || []).includes(
			true,
		);

		servicesAttributes.rail_domestic_freight.push(
			getRailDomesticFreightServiceAttributesDetails({
				routeSearch,
				cargoDetails,
				cargoContainerDetails,
			}),
		);

		const cargoHandling = [
			isDoorPickupRequired ? is_door_pickup_data : null,
			isDoorstepDeliveryRequired ? is_doorstep_delivery_data : null,
		];
		cargoHandling.forEach((cargoHandlingDetails) => {
			if (isEmpty(cargoHandlingDetails)) {
				return;
			}

			const { cargo_handling } = cargoHandlingDetails;

			const servicesAttributesRef =
				CARGO_HANDLING_SERVICES_ATTRIBUTES_MAPPING[cargo_handling] || [];

			servicesAttributesRef.push(
				getCargoHandlingServiceAttributesDetails({
					routeSearch,
					cargoContainerDetails,
					cargoHandlingDetails,
				}),
			);
		});
	});

	return {
		...Object.entries(servicesAttributes).reduce((pv, [key, services]) => {
			return {
				...pv,
				[`${key}_services_attributes`]: !isEmpty(services)
					? services
					: undefined,
			};
		}, {}),
	};
};

export default getRailDomesticFreightServiceAttributes;
