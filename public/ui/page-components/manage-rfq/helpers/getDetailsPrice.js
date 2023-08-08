import { startCase } from '@cogoport/utils';

const SERVICE_MAPPING = [
	'destination_detention',
	'destination_demurrage',
	'origin_demurrage',
	'origin_detention',
];

const SERVICES = ['air_freight', 'fcl_freight', 'lcl_freight'];
const OCEAN_SERVICES = ['fcl_freight', 'lcl_freight'];
const LCL_AIR_SERVICES = ['air_freight', 'lcl_freight'];

const getDetailsFeatures = ({ detail = {}, ratesBreakdown = {} }) => {
	const features = [];
	const addFeature = ({ value, label }) => {
		if (value || value === 0) {
			features.push(label.replace('{{value}}', value));
		}
	};

	if (ratesBreakdown?.service_type === 'fcl_freight') {
		SERVICE_MAPPING.forEach((key) => {
			addFeature({
				value : ratesBreakdown?.[key]?.free_limit,
				label : `{{value}} free ${startCase(key)} days`,
			});
		});
	}

	if (SERVICES.includes(ratesBreakdown?.service_type)) {
		addFeature({
			value : ratesBreakdown?.transit_time,
			label : `Transit Time - {{value}} ${OCEAN_SERVICES.includes(ratesBreakdown.service_type)
				? 'Days'
				: 'Hours'
			}`,
		});
	}

	if (ratesBreakdown.service_type === 'air_freight') {
		addFeature({
			value : detail?.chargeable_weight,
			label : 'Chargeable weight - {{value}} kgs',
		});
	}

	if (LCL_AIR_SERVICES.includes(ratesBreakdown.service_type)) {
		addFeature({
			value : ratesBreakdown.origin_storage?.free_limit,
			label : '{{value}} free origin storage hours',
		});

		addFeature({
			value : ratesBreakdown.destination_storage?.free_limit,
			label : `{{value}} free destination storage ${
				ratesBreakdown.service_type === 'air_freight' ? 'hours' : 'days'
			}`,
		});
	}

	addFeature({
		value : ratesBreakdown?.operation_type,
		label : 'Operation Type - {{value}}',
	});

	return features;
};

export default getDetailsFeatures;
