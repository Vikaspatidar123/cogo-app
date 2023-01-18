import optionsConfig from './card-config.json';
import KEY_ICON_MAPPING from '../icons';
import getLocationConfig from '../../../../utils/listLocationConfig';

const controls = [
	{
		type: 'checkbox-tiles',
		id: 'cp-lsp__onboarding__persona__supplyService',
		title: 'Which one of these services you are specialized in?',
		name: 'specializedService',
		label: '',
		multiple: true,
		labelKey: 'label',
		valueKey: 'value',
		span: 12,
		showSelectedTickIcon: true,
		itemContentDirection: 'row',
		rules: {
			required: true,
		},
	},
	{
		name: 'select_import_region',
		label: 'In which region do you IMPORT the most?',
		type: 'location-select',
		placeholder: 'Select Import Region',
		optionsListKey: 'locations',
		isClearable: true,
		span: 11,
		multiple: true,
		rules: {
			required: true,
		},
	},
	{
		name: 'select_export_region',
		label: 'In which region do you EXPORT the most?',
		type: 'location-select',
		placeholder: 'Select Export Region',
		optionsListKey: 'locations',
		isClearable: true,
		multiple: true,
		span: 11,
		rules: {
			required: true,
		},
	},
];

const getExtraControlPropertySpecializedServices = () => {
	return Object.values(optionsConfig).reduce((previousValues, currentValue) => {
		const { key = '', label = '', value = '' } = currentValue;

		return {
			...(previousValues || {}),
			options: [...(previousValues.options || []), { label, value }],
			icons: {
				...(previousValues.icons || {}),
				[value]: KEY_ICON_MAPPING[key],
			},
		};
	}, {});
};

const getControls = ({ frieghtType = '' }) => {
	return controls.map((control) => {
		const { name = '' } = control;

		let newControl = { ...control };

		if (name === 'specializedService') {
			newControl = {
				...newControl,
				...getExtraControlPropertySpecializedServices(),
			};
		}

		if (['select_import_region', 'select_export_region'].includes(name)) {
			newControl = {
				...newControl,
				params: { filters: { type: getLocationConfig(frieghtType) } },
			};
		}

		return newControl;
	});
};

export default getControls;
