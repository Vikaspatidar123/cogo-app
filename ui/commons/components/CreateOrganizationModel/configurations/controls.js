import { useState } from 'react';

export const useGetControls = ({ checked, setCityState }) => {
	const [country, setCountry] = useState();

	const addAddressControls = [
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
			label       : 'Country',
			name        : 'country_id',
			type        : 'country_select',
			placeholder : 'Enter Country',
			rules       : { required: 'required *' },
			valueKey    : 'id',
			params      : {
				filters: {
					type: 'country',
				},
			},
			span: 6,
		},
		{
			label       : 'Pincode',
			name        : 'pincode',
			type        : 'async_select',
			placeholder : 'Enter Pincode',
			rules       : { required: 'required *' },
			span        : 6,
			params      : { filters: { type: ['pincode'] } },
			asyncKey    : 'locations',
			valueKey    : 'postal_code',
			labelKey    : 'display_name',
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
			span        : 6,
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
			type        : 'email',
			placeholder : 'Enter Email Id',
			span        : 6,
		},
		{
			label       : 'Phone Number',
			name        : 'phoneNumber',
			type        : 'mobile_number',
			placeholder : 'Enter Phone Number',
			span        : 6,
		},
	];

	return (addAddressControls || []).map((control) => {
		if (control.name === 'country_ids') {
			return {
				...control,
				handleChange: (e) => {
					console.log(e, 'country');
					setCountry(e);
				},
			};
		}
		if (control.name === 'tax_number') {
			return {
				...control,
				rules: {
					required: checked,
				},
			};
		}
		if (control.name === 'pincode') {
			return {
				...control,
				params: {
					filters: {
						type       : 'pincode',
						country_id : country?.id,
					},
					includes: {
						country                 : '',
						region                  : '',
						city                    : '',
						default_params_required : true,
					},
				},
				handleChange: (e) => {
					setCityState({
						city  : e?.city?.name,
						state : e?.region?.name,
					});
				},
			};
		}
		return {
			...control,
		};
	});
};
