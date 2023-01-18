import buyOptionsConfig from '../configurations/buy.services.config.json';
import sellOptionsConfig from '../configurations/sell.services.config.json';
import KEY_ICON_MAPPING from '../icons';

const buyControl = {
	type: 'checkbox-tiles',
	id: 'cp-lsp__onboarding__services__buyService',
	title: 'Which services would you like to BUY from Cogoport?',
	name: 'buyServices',
	multiple: true,
	labelKey: 'label',
	valueKey: 'value',
	span: 12,
	showSelectedTickIcon: true,
	itemContentDirection: 'column',
	rules: {
		required: true,
	},
};

const sellControl = {
	type: 'checkbox-tiles',
	id: 'cp-lsp__onboarding__services__sellService',
	title: 'Which services would you like to SELL from Cogoport?',
	name: 'sellServices',
	multiple: true,
	labelKey: 'label',
	valueKey: 'value',
	span: 12,
	showSelectedTickIcon: true,
	itemContentDirection: 'column',
	rules: {
		required: true,
	},
};

const getExtraBuyControlPropertyServices = () => {
	return Object.values(buyOptionsConfig).reduce(
		(previousValues, currentValue) => {
			const { key = '', label = '', value = '' } = currentValue;

			return {
				...(previousValues || {}),
				options: [...(previousValues.options || []), { label, value }],
				icons: {
					...(previousValues.icons || {}),
					[value]: KEY_ICON_MAPPING[key],
				},
			};
		},
		{},
	);
};

const getExtraSellControlPropertyServices = () => {
	return Object.values(sellOptionsConfig).reduce(
		(previousValues, currentValue) => {
			const { key = '', label = '', value = '' } = currentValue;

			return {
				...(previousValues || {}),
				options: [...(previousValues.options || []), { label, value }],
				icons: {
					...(previousValues.icons || {}),
					[value]: KEY_ICON_MAPPING[key],
				},
			};
		},
		{},
	);
};

export const getControls = ({
	values = {},
	planService = '',
	isProfile = false,
}) => {
	let controlsMapping = '';
	if (isProfile) {
		controlsMapping = {
			sell: [sellControl],
			buy: [buyControl],
			both: [buyControl],
		};
	} else {
		controlsMapping = {
			sell: [sellControl],
			buy: [buyControl],
			both: [buyControl, sellControl],
		};
	}

	if (!(planService in controlsMapping)) {
		return [];
	}

	const controls = controlsMapping[planService];

	return controls.map((control) => {
		const { name = '' } = control;

		let newControl = { ...control };

		if (['buyServices'].includes(name)) {
			newControl = {
				...newControl,
				...getExtraBuyControlPropertyServices(),
			};
		}

		if (['sellServices'].includes(name)) {
			newControl = {
				...newControl,
				...getExtraSellControlPropertyServices(),
			};
		}

		return {
			...newControl,
			value: values[name] || '',
		};
	});
};
