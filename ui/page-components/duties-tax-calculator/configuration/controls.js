import { IcMAirport, IcMPort } from '@cogoport/icons-react';

export const transportationControls = ({ transportMode }) => [
	{
		name             : 'originPort',
		label            : 'Origin Country',
		placeholder      : transportMode === 'AIR' ? 'Select Origin' : 'Select Origin Port',
		type             : 'select',
		prefix           : transportMode === 'AIR' ? <IcMAirport /> : <IcMPort />,
		rules            : { required: true },
		noOptionsMessage : 'Type to search...',
	},
	{
		name        : 'destinationPort',
		label       : 'Destination Country',
		placeholder :
				transportMode === 'AIR' ? 'Select Destination' : 'Select Destination Port',
		type             : 'select',
		prefix           : transportMode === 'AIR' ? <IcMAirport /> : <IcMPort />,
		rules            : { required: true },
		noOptionsMessage : 'Type to search...',
	},
];

export const productControls = ({ organization }) => [
	{
		name : 'productName',
		type : 'hidden',
	},
	{
		name        : 'hsCode',
		type        : 'number',
		label       : 'HS Code',
		placeholder : 'Search via Keywords',
		rules       : {
			required  : 'Required',
			minLength : {
				value   : 6,
				message : 'minimum 6 digit is required',
			},
		},
	},
	{
		name        : 'consignmentValue',
		type        : 'number',
		placeholder : '0.00',
		label       : 'Consignment Value',
		rules       : {
			required : true,
			min      : {
				value   : 0.001,
				message : 'Should be greater than 0',
			},
			maxLength: {
				value   : 10,
				message : 'maximum 10 digits are allowed',
			},
		},
	},
	{
		name        : 'quantity',
		type        : 'number',
		placeholder : '0',
		label       : 'Quantity (in Kgs)',
		rules       : {
			required : true,
			min      : {
				value   : 0.1,
				message : 'Should be greater than 0',
			},
			maxLength: {
				value   : 10,
				message : 'maximum 10 digits are allowed',
			},
		},
	},
	{
		name    : 'currency',
		type    : 'select',
		label   : 'Currency',
		value   : organization?.country?.currency_code,
		options : [
			{ label: 'INR', value: 'INR' },
			{ label: 'USD', value: 'USD' },
		],
		rules: { required: true },
	},
];

export const ChargeControls = [
	{
		name        : 'freightCharge',
		type        : 'number',
		label       : 'Freight Charge',
		placeholder : 'Freight Charge',
		rules       : {
			required : true,
			min      : {
				value   : 0.001,
				message : 'Should be greater than 0',
			},
		},
	},
	{
		name        : 'incoterm',
		type        : 'select',
		label       : 'Incoterm',
		placeholder : 'Select Placeholder',
		rules       : { required: true },
		value       : 'CIF',
		options     : [
			{ label: 'FOB', value: 'FOB' },
			{ label: 'EXW', value: 'EXW' },
			{ label: 'FCA', value: 'FCA' },
			{ label: 'FAS', value: 'FAS' },
			{ label: 'CIF', value: 'CIF' },
			{ label: 'CFR', value: 'CFR' },
			{ label: 'CPT', value: 'CPT' },
			{ label: 'CIP', value: 'CIP' },
			{ label: 'DAT', value: 'DAT' },
			{ label: 'DAP', value: 'DAP' },
			{ label: 'DDP', value: 'DDP' },
		],
	},
	{
		name     : 'incotermCharges',
		type     : 'fieldArray',
		controls : [
			{
				name        : 'name',
				placeholder : 'Charges',
				type        : 'text',
				rules       : { required: true },
			},
			{
				name        : 'value',
				placeholder : 'value',
				type        : 'number',
				rules       : {
					required : true,
					min      : {
						value   : 0.001,
						message : 'Should be greater than 0',
					},
				},
			},
		],
	},
];
