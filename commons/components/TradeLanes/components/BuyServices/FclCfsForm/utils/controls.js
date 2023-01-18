import getLocationConfig from '../../../../utils/listLocationConfig';

const getControls = ({ frieghtType = '', setSelectedRegion = () => {} }) => {
	return [
		{
			name: 'select_import_region',
			label: 'In which region do you IMPORT the most?',
			type: 'location-select',
			placeholder: 'Select import Region',
			optionsListKey: 'locations',
			isClearable: true,
			handleChange: (obj) => {
				setSelectedRegion(obj);
			},
			params: { filters: { type: getLocationConfig(frieghtType) } },
			span: 7,
			rules: {
				required: true,
			},
		},
		{
			name: 'is_cfs_agent_present_for_import',
			label: 'Is CFS Agent Present?',
			placeholder: 'Click to choose',
			type: 'select',
			span: 4.8,
			style: {
				menu: {
					right: 0,
					background: 'white',
					boxShadow: '0 4px 80px rgba(0, 0, 0, 0.15)',
					borderRadius: 10,
					zIndex: 99999,
				},
			},
			options: [
				{ value: 'yes', label: 'YES' },
				{ value: 'no', label: 'NO' },
			],
			rules: {
				required: true,
			},
		},
	];
};

export default getControls;
