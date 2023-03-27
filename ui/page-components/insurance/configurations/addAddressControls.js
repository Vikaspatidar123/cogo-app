import { useState } from 'react';

const COUNTRY_INDIA_ID = '541d1232-58ce-4d64-83d6-556a42209eb7';

// eslint-disable-next-line max-len
const emailValidator = /^[^<>()[\]\\,;:%#^\s@"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;

const mobileValidator = /^[0-9]{10}$/;
const GstValidator = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const addAddressControls = [
	{
		label       : 'Billing Party Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Enter Billing Party Name',
		rules       : { required: 'required *' },
		span        : 6,
	},
	{
		label       : 'Address',
		name        : 'address',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : {
			required: 'required *',
		},
		span: 6,
	},
	{
		label       : 'Pincode',
		name        : 'pincode',
		type        : 'text',
		placeholder : 'Enter Pincode',
		rules       : { required: 'required *' },
		span        : 6,
	},
	{
		label       : 'Country',
		name        : 'country_id',
		type        : 'async_select',
		placeholder : 'Enter Country',
		rules       : { required: 'required *' },
		asyncKey    : 'locations',
		valueKey    : 'id',
		params      : {
			filters: {
				type: 'country',
			},
		},
		span: 6,
	},
	{
		label       : 'State',
		name        : 'state',
		type        : 'text',
		placeholder : 'Enter State',
		span        : 6,
		disabled    : true,
	},
	{
		label       : 'City',
		name        : 'city',
		type        : 'text',
		placeholder : 'Enter City',
		span        : 6,
		disabled    : true,
	},
	{
		label       : 'Tax Number',
		name        : 'tax_number',
		type        : 'text',
		placeholder : 'Enter Tax Number',
		rules       : {
			pattern: {
				value   : GstValidator,
				message : 'Invalid Tax number',
			},
		},
		span: 6,
	},

	{
		label       : 'POC Name',
		name        : 'poc_name',
		type        : 'text',
		placeholder : 'Enter POC Name',
		valueKey    : 'business_name',
		span        : 6,
	},
	{
		label       : 'Email Id',
		name        : 'email',
		type        : 'text',
		placeholder : 'Enter Email Id',
		rules       : {
			pattern: {
				value   : emailValidator,
				message : 'Invalid email address',
			},
		},
		span: 6,
	},
	{
		label       : 'Phone Number',
		name        : 'phoneNumber',
		type        : 'mobile-select',
		placeholder : 'Enter Phone Number',
		rules       : {
			pattern: {
				value   : mobileValidator,
				message : 'Invalid phone number',
			},
		},
		span: 6,
	},
];

const useGetControls = ({ checked }) => {
	const [country, setCountry] = useState();

	return (addAddressControls || []).map((control) => {
		if (control.name === 'country_id') {
			return {
				...control,
				handleChange: (e) => {
					setCountry(e);
				},
			};
		}
		if (control.name === 'tax_number') {
			return {
				...control,
				rules: {
					required : checked,
					pattern  : {
						value   : country?.id === COUNTRY_INDIA_ID ? GstValidator : '',
						message : 'Invalid Tax number',
					},
				},
			};
		}
		return {
			...control,
		};
	});
};

export default useGetControls;
