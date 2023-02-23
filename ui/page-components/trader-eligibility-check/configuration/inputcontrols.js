import { getByKey } from '@cogoport/utils';

const controls = [
	{
		label       : 'Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Name',
		rules       : { required: 'required' },
	},
	{
		label       : 'Country',
		name        : 'countryId',
		type        : 'select',
		placeholder : 'Country',
		rules       : { required: 'required' },
	},
	{
		label       : 'Postal Code',
		name        : 'postal_code',
		type        : 'text',
		placeholder : 'Enter Postal Code',
	},
	{
		label       : 'State',
		name        : 'state',
		type        : 'text',
		placeholder : 'State',
		width       : '45%',
	},
	{
		label       : 'City',
		name        : 'city',
		type        : 'text',
		placeholder : 'City',
		width       : '45%',
	},
	{
		label       : 'Address',
		name        : 'address',
		type        : 'text',
		placeholder : 'Enter Address',
	},
];

const getControls = ({ setCountryDetails, formDetails, countryOptions }) => controls.map((control) => {
	if (control.name === 'countryId') {
		return {
			...control,
			...countryOptions,
			handleChange: (e) => {
				setCountryDetails(() => ({
					countryName : e?.display_name,
					countryCode : e?.country_code,
				}));
			},
			value: getByKey(formDetails?.formValues, control.name) || '',
		};
	}
	return {
		...control,
		...countryOptions,
		value: getByKey(formDetails?.formValues, control.name) || '',
	};
});
export default getControls;
