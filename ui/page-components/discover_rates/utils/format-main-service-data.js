import { isEmpty } from '@cogoport/utils';

import airControls from '../configurations/search/air/form.controls';
import airCustoms from '../configurations/search/domestic/air-customs/form.controls';
import fclCustoms from '../configurations/search/domestic/fcl-customs/form.controls';
import fclLocalControls from '../configurations/search/domestic/fcl-locals/form.controls';
import ftlControls from '../configurations/search/domestic/ftl/form.controls';
import haulageControls from '../configurations/search/domestic/haulage-freight/form.controls';
import lclCustoms from '../configurations/search/domestic/lcl-customs/form.controls';
import ltlControls from '../configurations/search/domestic/ltl/form.controls';
import railControls from '../configurations/search/domestic/rail-domestic/form.controls';
import trailersControls from '../configurations/search/domestic/trailer/form.controls';
import fclControls from '../configurations/search/fcl/form.controls';
import lclControls from '../configurations/search/lcl/form.controls';

const containerModes = [
	'fcl_freight',
	'trailer_freight',
	'haulage_freight',
	'fcl_customs',
	'fcl_freight_local',
	'rail_domestic_freight',
];

const allCommodityModes = [
	'trailer_freight',
	'ftl_freight',
	'ltl_freight',
	'haulage_freight',
	'fcl_customs',
	'air_customs',
];

const handleCommodity = ({ mode = '', commodity = '' }) => {
	let value = null;
	if (allCommodityModes.includes(mode) && isEmpty(commodity)) {
		value = 'all_commodity';
	} else {
		value = commodity;
	}
	return value;
};

const formatMainServiceData = (mode, services) => {
	const mainServices =		services.filter((service) => service?.service_type === mode) || [];
	const singleService = mainServices[0] || {};
	const data = {};
	if (containerModes.includes(mode)) {
		const controls = {
			fcl_freight           : fclControls(),
			trailer_freight       : trailersControls,
			haulage_freight       : haulageControls,
			fcl_customs           : fclCustoms(),
			fcl_freight_local     : fclLocalControls(),
			rail_domestic_freight : railControls,
		};
		(controls[mode] || []).forEach((control) => {
			if (control.name !== 'containers') {
				data[control.name] = singleService[control.name];
			} else {
				data.containers = mainServices.map((item) => ({
					containers_count : item?.containers_count,
					container_size   : item?.container_size,
					container_type   : item?.container_type,
					commodity:
						handleCommodity({ mode, commodity: item?.commodity }) || null,
					cargo_weight_per_container : item?.cargo_weight_per_container || 19,
					container_type_commodity   : {
						container_type: item?.container_type,
						commodity:
							handleCommodity({ mode, commodity: item?.commodity }) || null,
					},
				}));
			}
		});
		return { ...singleService, ...data };
	}

	const otheSearchContrls = {
		ftl_freight : ftlControls,
		lcl_freight : lclControls,
		air_freight : airControls,
		lcl_customs : lclCustoms(),
		air_customs : airCustoms(),
		ltl_freight : ltlControls,
	};

	(otheSearchContrls[mode] || []).forEach((control) => {
		if (control.name === 'commodity' && isEmpty(singleService?.commodity)) {
			data[control.name] =				handleCommodity({ mode, commodity: singleService?.commodity }) || null;
		} else if (control.name === 'packages') {
			data[control.name] = (singleService.packages || []).map((item) => ({
				...item,
				dimensions: {
					length : item?.length,
					width  : item?.width,
					height : item?.height,
				},
			}));
		} else {
			data[control.name] = singleService[control.name];
		}
	});
	return { ...singleService, ...data };
};

export default formatMainServiceData;
