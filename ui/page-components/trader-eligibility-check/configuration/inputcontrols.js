import { getByKey } from '@cogoport/utils';

const controls = [
	{
		label       : 'Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Name',
		rules       : { required: 'required' },
		span        : 12,
	},
	{
		label          : 'Country',
		name           : 'countryId',
		type           : 'select',
		placeholder    : 'Country',
		optionsListKey : 'country-list-with-flag',
		rules          : { required: 'required' },
		span           : 12,
	},
	{
		label       : 'Postal Code',
		name        : 'postal_code',
		type        : 'text',
		placeholder : 'Enter Postal Code',
		span        : 12,
	},
	{
		label       : 'State',
		name        : 'state',
		type        : 'text',
		placeholder : 'State',
		span        : 6,
	},
	{
		label       : 'City',
		name        : 'city',
		type        : 'text',
		placeholder : 'City',
		span        : 6,
	},
	{
		label       : 'Address',
		name        : 'address',
		type        : 'text',
		placeholder : 'Enter Address',
		span        : 12,
	},
];

const getControls = ({ setCountryDetails, formDetails }) => controls.map((control) => {
	if (control.name === 'countryId') {
		return {
			...control,
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
		value: getByKey(formDetails?.formValues, control.name) || '',
	};
});
export default getControls;
