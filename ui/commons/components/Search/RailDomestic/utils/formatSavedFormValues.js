import { isEmpty } from '@cogoport/utils';

const formatSavedFormValues = ({ searchData }) => {
	if (isEmpty(searchData)) {
		return {};
	}

	const { detail } = searchData;

	const {
		origin_location,
		destination_location,
		cargo_readiness_date,
		cargo_value,
		container_load_type,
		container_load_sub_type,
		cargo_description,
		service_details,
	} = detail;

	return {
		routeSearch: {
			origin_location_id      : origin_location?.id,
			destination_location_id : destination_location?.id,
		},
		cargoAndLoadDetailsContent: {
			cargoDetails: {
				cargo_readiness_date,
				cargo_value,
				container_load_type,
				container_load_sub_type,
				cargo_description,
			},
			cargoContainersDetails: Object.values(service_details).reduce(
				(pv, cv) => {
					const { service_type } = cv;
					if (service_type !== 'rail_domestic_freight') {
						return pv;
					}

					const {
						id,
						container_size,
						container_type,
						cargo_weight_per_container,
						containers_count,
						commodity,
						commodity_subtype,
						packing_type,
					} = cv;

					const obj = {
						id,
						container_size,
						container_type,
						cargo_weight_per_container,
						container_count           : containers_count,
						commodity_type            : commodity,
						commodity_subtype,
						packaging_type            : packing_type,
						is_door_pickup            : '',
						is_door_pickup_data       : null,
						is_doorstep_delivery      : '',
						is_doorstep_delivery_data : null,
					};

					return [...pv, obj];
				},
				[],
			),
		},
	};
};

export default formatSavedFormValues;
