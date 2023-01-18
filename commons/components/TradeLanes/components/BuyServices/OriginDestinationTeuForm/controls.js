import getLocationConfig from '../../../utils/listLocationConfig';

const TEU_VALUE_MAPPING = {
	buyServices: [
		{ value: '0-50', label: '0-50' },
		{ value: '50-100', label: '50-100' },
		{ value: '100-500', label: '100-500' },
		{ value: '500-1000', label: '500-1000' },
		{ value: '1000+', label: 'over 1000+' },
	],
};

const getControls = ({ serviceType, frieghtType }) => {
	let UNITS = 'shipments';
	if (frieghtType === 'air_freight') {
		UNITS = 'kgs';
	} else if (frieghtType === 'fcl_freight') {
		UNITS = 'containers';
	}

	return [
		{
			name: 'origin',
			label: 'Origin',
			defaultOptions: true,
			type: 'location-select',
			placeholder: 'Origin Trade Lane',
			optionsListKey: 'locations',
			isClearable: true,
			params: {
				filters: { type: getLocationConfig(frieghtType) },
			},
			grouped: ['city', 'country'],
			span: 6,
			rules: {
				required: true,
			},
		},
		{
			name: 'destination',
			label: 'Destination',
			defaultOptions: true,
			type: 'location-select',
			placeholder: 'Destination Trade Lane',
			optionsListKey: 'locations',
			params: { filters: { type: getLocationConfig(frieghtType) } },
			grouped: ['city', 'country'],
			span: 6,
			rules: {
				required: true,
			},
		},
		{
			name: 'teu',
			label: `Total ${UNITS} per month`,
			placeholder: UNITS,
			type: 'select',
			span: 6,
			style: {
				menu: {
					right: 0,
					background: 'white',
					boxShadow: '0 4px 80px rgba(0, 0, 0, 0.15)',
					borderRadius: 10,
					zIndex: 99999000,
				},
			},
			options: TEU_VALUE_MAPPING[serviceType],
			rules: {
				required: 'Required',
			},
		},
	];
};

export default getControls;
