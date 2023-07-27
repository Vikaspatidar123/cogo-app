import { startCase } from '@cogoport/utils';

import getCommodityName from '../../../../../utils/getCommodityName';

const getValueProps = (props) => {
	const { service_type, serviceDetails } = props;

	const {
		commodity = '',
		container_size = '',
		containers_count = '',
		container_type = '',
		booked_containers_count = 0,
		max_containers_count = 0,
		max_volume = 0,
		booked_volume = 0,
		booked_weight = 0,
		volume = '',
		weight = 0,
		max_weight = 0,
		packages_count = 0,
		cargo_weight_per_container = 0,
		inco_term,
	} = serviceDetails || {};

	const VALUE_PROPS_MAPPING = {
		fcl_freight: {
			details: {
				container_size   : `${container_size} ft` || undefined,
				commodity        : commodity ? getCommodityName(commodity) : undefined,
				containers_count : containers_count
					? `${containers_count} Containers`
					: undefined,
				container_type             : startCase(container_type) || undefined,
				cargo_weight_per_container : cargo_weight_per_container
					? `${cargo_weight_per_container} MT`
					: undefined,
				inco_term: inco_term ? inco_term.toUpperCase() : undefined,
			},
			utilization: `${booked_containers_count || 0}/${max_containers_count}`,
		},

		lcl_freight: {
			details: {
				commodity      : commodity ? getCommodityName(commodity) : undefined,
				weight         : weight ? `${weight} kg` : undefined,
				volume         : volume ? `${volume} cbm` : undefined,
				packages_count : packages_count ? `${packages_count} pkg` : undefined,
				inco_term      : inco_term ? inco_term.toUpperCase() : undefined,
			},
			utilization: `${booked_volume || 0}/${max_volume}`,
		},

		air_freight: {
			details: {
				commodity      : commodity ? getCommodityName(commodity) : undefined,
				weight         : weight ? `${weight} kg` : undefined,
				volume         : volume ? `${volume} cbm` : undefined,
				packages_count : packages_count ? `${packages_count} pkg` : undefined,
				inco_term      : inco_term ? inco_term.toUpperCase() : undefined,
			},
			utilization: `${booked_weight || 0}/${max_weight}`,
		},
	};

	return {
		utilization : VALUE_PROPS_MAPPING[service_type].utilization,
		details     : Object.entries(VALUE_PROPS_MAPPING[service_type].details).reduce(
			(acc, [key, value]) => ({ ...acc, ...(value ? { [key]: value } : {}) }),
			{},
		),
	};
};

export default getValueProps;
