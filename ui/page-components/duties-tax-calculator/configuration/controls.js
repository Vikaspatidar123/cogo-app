import { IcMAirport, IcMPort } from '@cogoport/icons-react';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const FILTER_MAPPING = {
	AIR: {
		paramsKey         : 'airport',
		prefixIcon        : <IcMAirport />,
		originPlaceholder : 'Select Origin',
		destPlaceholder   : 'Select Destination',
	},
	OCEAN: {
		paramsKey         : 'seaport',
		prefixIcon        : <IcMPort />,
		originPlaceholder : 'Select Origin Port',
		destPlaceholder   : 'Select Destination Port',
	},
};

export const transportationControls = ({ transportMode }) => {
	const { paramsKey, prefixIcon, originPlaceholder, destPlaceholder } = FILTER_MAPPING[transportMode];
	return (
		[
			{
				name        : 'originPort',
				keyName     : 'origin',
				label       : 'Origin Country',
				placeholder : originPlaceholder,
				params      : { filters: { type: paramsKey } },
				type        : 'async_select',
				initialCall : true,
				labelKey    : 'display_name',
				asyncKey    : 'locations',
				prefix      : prefixIcon,
				rules       : { required: true },
			},
			{
				name        : 'destinationPort',
				keyName     : 'destination',
				label       : 'Destination Country',
				placeholder : destPlaceholder,
				params      : { filters: { type: paramsKey } },
				type        : 'async_select',
				initialCall : true,
				labelKey    : 'display_name',
				asyncKey    : 'locations',
				prefix      : prefixIcon,
				rules       : { required: true },
			},
		]
	);
};

export const productControls = [
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
		options : [
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.VND,
		].map((currencyCode) => ({
			label : currencyCode,
			value : currencyCode,
		})),
		rules: { required: true },
	},
];

export const chargeControls = [
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
