import getLocationConfig from '../../../../utils/listLocationConfig';
import getTypeConfig from './typeConfig';

const getControls = ({ frieghtType = '' }) => {
	const controls = [
		{
			name: 'select_state',
			label: 'Select Locations',
			type: 'location-select',
			placeholder: 'Select Region',
			optionsListKey: 'locations',
			isClearable: true,
			params: { filters: { type: getLocationConfig(frieghtType) } },
			span: 10,
			rules: {
				required: true,
			},
			multiple: true,
			autoCloseMenu: false,
		},
		{
			name: 'truck_type',
			label: 'Select carrier types',
			placeholder: 'Carriers',
			type: 'select',
			options: getTypeConfig(frieghtType),
			multiple: true,
			autoCloseMenu: false,
			span: 10,
			rules: {
				required: true,
			},
		},
	];

	return controls;
};

export default getControls;
