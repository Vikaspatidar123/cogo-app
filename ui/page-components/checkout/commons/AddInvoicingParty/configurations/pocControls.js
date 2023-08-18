import { isEmpty } from '@cogoport/utils';

const pocControls = [
	{
		name  : 'name',
		label : 'POC Name',
		type  : 'text',
		span  : 5.8,
		rules : { required: true },
	},
	{
		name      : 'mobile_number',
		label     : 'POC Mobile Number',
		type      : 'mobile_number',
		codeKey   : 'mobile_country_code',
		numberKey : 'mobile_number',
		span      : 5.8,
		rules     : {
			required : true,
			validate : (value) => (value.mobile_country_code && value.mobile_number
				? undefined
				: 'POC Mobile Number is Required'),
		},
	},
	{
		name      : 'alternate_mobile_number',
		label     : 'Alternate Mobile Number',
		type      : 'mobile-number-select',
		codeKey   : 'mobile_country_code',
		numberKey : 'mobile_number',
		span      : 5.8,
	},
];

const pocControlsFieldArray = [
	{
		name  : 'poc_details',
		type  : 'fieldArray',
		label : 'POC Details',
		span  : 12,
		value : [
			{
				name                    : '',
				email                   : '',
				mobile_number           : {},
				alternate_mobile_number : {},
			},
		],
		controls: pocControls,
	},
];

const getPocControlsValues = ({ values: valuesProps }) => {
	const values = valuesProps || {};

	const valuesHash = {};
	pocControls.forEach((control) => {
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

export const getPocControls = ({ values: valuesProps }) => {
	const values = valuesProps || {};

	const pocValues = getPocControlsValues({ values });

	return pocControls.map((control) => {
		const { name: controlName } = control;

		return { ...control, value: pocValues[controlName] || '' };
	});
};

export const getPocFieldArray = ({ action = '', pocValues = {} }) => {
	const values = [];
	if (action === 'create') {
		const hash = {};
		pocControls.forEach((control) => {
			hash[control.name] = '';
		});

		values[0] = hash;
	}

	return [
		{
			type     : 'fieldArray',
			name     : 'poc_details',
			label    : 'POC Details',
			controls : pocControls,
			value    : pocValues?.poc_details || values,
		},
	];
};

export const getPocControlsFieldArray = ({ values: valuesProps = {} }) => {
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
