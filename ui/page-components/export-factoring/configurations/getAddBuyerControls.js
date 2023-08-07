import data from '@/.data-store/constants/countries.json';
import patterns from '@/ui/commons/configurations/patterns';

const country_code = data?.map((x) => ({
	label : x.mobile_country_code,
	value : x.mobile_country_code,
}));

const controls = [
	{
		name        : 'company_name',
		type        : 'text',
		placeholder : 'Company Name',
		label       : 'Company Name',
		span        : 6,
		rules       : { required: 'Name is required' },
	},
	{
		name        : 'registered_number',
		label       : 'Registered Number',
		type        : 'text',
		placeholder : 'Registered Number',
		span        : 6,
	},
	{
		name        : 'credit_limit',
		type        : 'price_select',
		placeholder : 'Credit Limit',
		label       : 'Credit Limit',
		span        : 6,
		rules       : { required: 'Credit Limit is required' },
	},
	{
		name        : 'payment_term',
		label       : 'Payment Terms',
		type        : 'select',
		placeholder : 'Payment Terms',
		span        : 6,
		rules       : { required: 'This is required' },
		options     : [
			{
				label : 'Cash Against Documents',
				value : 'Cash Against Documents',
			},
			{
				label : 'Document Against Payment',
				value : 'Document Against Payment',
			},
			{
				label : 'Document Against Acceptance',
				value : 'Document Against Acceptance',
			},
			{
				label : 'Letter of Credit',
				value : 'Letter of Credit',
			},
			{
				label : 'Open Account',
				value : 'Open Account',
			},
			{
				label : 'Advance Payment',
				value : 'Advance Payment',
			},
		],
	},
	{
		name        : 'address_line_one',
		label       : 'Company Address Line-1',
		type        : 'text',
		span        : 6,
		placeholder : 'Address Line 1',
		rules       : { required: 'Address is Required' },
	},
	{
		name        : 'address_line_two',
		label       : 'Company Address Line-2',
		type        : 'text',
		span        : 6,
		placeholder : 'Address Line 2',
	},
	{
		label       : 'Pincode / Zip Code',
		name        : 'zipcode',
		type        : 'async_select',
		placeholder : 'Enter Pincode',
		rules       : { required: 'required *' },
		span        : 6,
		isClearable : true,
		params      : {
			filters: {
				type     : ['pincode'],
				includes : { country: true, region: true },
			},
		},
		asyncKey : 'locations',
		valueKey : 'postal_code',
		labelKey : 'display_name',
	},
	{
		name        : 'city',
		label       : 'City',
		type        : 'text',
		span        : 6,
		placeholder : 'City',
		rules       : { required: 'City is Required' },
	},
	{
		name        : 'state',
		label       : 'State',
		type        : 'text',
		span        : 6,
		placeholder : 'State',
	},
	{
		label          : 'Country',
		name           : 'country',
		type           : 'async_select',
		placeholder    : 'Enter Site/Entity',
		asyncKey       : 'locations',
		defaultOptions : true,
		params         : {
			filters: {
				type: ['country'],
			},
		},
		theme     : 'admin',
		className : 'primary md',
	},
	{
		name               : 'poc_details',
		type               : 'fieldArray',
		showButtons        : true,
		buttonText         : 'Add Poc',
		noDeleteButtonTill : 0,
		// value       : [{}],
		controls           : [
			{
				name        : 'name',
				type        : 'text',
				placeholder : 'Name',
				label       : 'Name',
				span        : 6,
				rules       : { required: 'Name is required' },
			},
			{
				name        : 'designation',
				type        : 'text',
				placeholder : 'Designation',
				label       : 'Designation',
				span        : 6,
				rules       : { required: 'Designation is required' },
			},
			{
				name        : 'email_id',
				label       : 'Email',
				placeholder : 'Email',
				type        : 'email',
				span        : 12,
				rules       : {
					required : true,
					pattern  : {
						value   : patterns.EMAIL,
						message : 'Email is invalid',
					},
				},
			},
			{
				name            : 'mobile_number',
				label           : 'Mobile Number',
				placeholder     : 'Enter Mobile Number',
				type            : 'mobile_number',
				isInputGroup    : true,
				showCountryName : false,
				inputType       : 'number',
				select2         : 'new',
				options         : country_code,
				rules           : {
					required : true,
					validate : (value) => (value?.country_code && value?.number ? undefined : 'Phone Number'),
				},
			},
		],
	},
];

export const getAddBuyerControls = ({
	setAddressDetail,
	setCountryData,
}) => controls.map((control) => {
	if (control.name === 'zipcode') {
		return ({
			...control,
			handleChange: (e) => setAddressDetail(e),
		});
	}
	if (control.name === 'country') {
		return ({
			...control,
			handleChange: (e) => 	setCountryData(e),
		});
	}
	return control;
});
