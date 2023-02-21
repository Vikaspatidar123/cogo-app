import { isEmpty } from '@cogoport/utils';

import patterns from '@/ui/commons/configurations/patterns';

const translationKey =	'common:components.addInvoicingParty.utils.controls.pocControls';

const getControls = ({ t }) => [
	{
		name  : 'name',
		label : t(`${translationKey}.name.label`),
		type  : 'text',
		style : {
			flexBasis: '25%',
		},
		rules: { required: true },
	},
	{
		name  : 'email',
		label : t(`${translationKey}.email.label`),
		type  : 'email',
		style : {
			flexBasis: '25%',
		},
		rules: {
			required : t(`${translationKey}.email.rules.required`),
			pattern  : {
				value   : patterns.EMAIL,
				message : t(`${translationKey}.email.rules.pattern.message`),
			},
		},
	},
	{
		name      : 'mobile_number',
		label     : t(`${translationKey}.mobile_number.label`),
		type      : 'mobile-number-select',
		codeKey   : 'mobile_country_code',
		numberKey : 'mobile_number',
		style     : {
			flexBasis: '25%',
		},
		rules: {
			required : true,
			validate : (value) => (value.mobile_country_code && value.mobile_number
				? undefined
				: t(`${translationKey}.mobile_number.rules.validate`)),
		},
	},
];

const getPocControlsValues = ({ values: valuesProps, t }) => {
	const values = valuesProps || {};

	const controls = getControls({ t });

	const valuesHash = {};
	controls.forEach((control) => {
		const { name: controlName } = control;

		valuesHash[controlName] = values[controlName];

		if (controlName === 'mobile_number') {
			const { mobile_country_code, mobile_number } = values;

			valuesHash[controlName] = {
				mobile_country_code,
				mobile_number,
			};
		}

		if (controlName === 'alternate_mobile_number') {
			const { alternate_mobile_number_country_code, alternate_mobile_number } =				values;

			valuesHash[controlName] = {
				mobile_country_code : alternate_mobile_number_country_code,
				mobile_number       : alternate_mobile_number,
			};
		}
	});

	return valuesHash;
};

export const getPocControlsFieldArray = ({ values: valuesProps = {}, t }) => {
	const pocControlsFieldArray = [
		{
			name  : 'poc_details',
			type  : 'fieldArray',
			label : t(
				'common:components.addInvoicingParty.utils.controls.pocControlsFieldArray.label',
			),
			value: [
				{
					name                    : '',
					email                   : '',
					mobile_number           : {},
					alternate_mobile_number : {},
				},
			],
			controls: getControls({ t }),
		},
	];

	const values = valuesProps || {};

	return pocControlsFieldArray.map((control) => {
		const { name: controlName } = control;

		if (controlName === 'poc_details') {
			if (!isEmpty(values[controlName])) {
				return {
					...control,
					value: (values[controlName] || []).map((value) => getPocControlsValues(value)),
				};
			}
		}

		return { ...control, value: values[controlName] || '' };
	});
};

export const getPocControls = ({ values: valuesProps, t }) => {
	const values = valuesProps || {};

	const controls = getControls({ t });

	const pocValues = getPocControlsValues({ values, t });

	return controls.map((control) => {
		const { name: controlName } = control;

		return { ...control, value: pocValues[controlName] || '' };
	});
};
