import optionsConfig from './card-config.json';
import KEY_ICON_MAPPING from '../icons';

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

const getControls = () => {
	return controls.map((control) => {
		const { name = '' } = control;

		let newControl = { ...control };

		if (name === 'specializedService') {
			newControl = {
				...newControl,
				...getExtraControlPropertySpecializedServices(),
			};
		}

		return newControl;
	});
};

export default getControls;
