import { IcMAirport, IcMPort } from '@cogoport/icons-react';

const getFilterMapping = ({ transportMode, t }) => {
	const FILTER_MAPPING = {
		AIR: {
			paramsKey         : 'airport',
			prefixIcon        : <IcMAirport />,
			originPlaceholder : t('dutiesTaxesCalculator:form_transport_origin_air_placeholder'),
			destPlaceholder   : t('dutiesTaxesCalculator:form_transport_destination_air_placeholder'),
		},
		OCEAN: {
			paramsKey         : 'seaport',
			prefixIcon        : <IcMPort />,
			originPlaceholder : t('dutiesTaxesCalculator:form_transport_origin_ocean_placeholder'),
			destPlaceholder   : t('dutiesTaxesCalculator:form_transport_destination_ocean_placeholder'),
		},
	};
	return FILTER_MAPPING[transportMode];
};

export const transportationControls = ({ transportMode, t }) => {
	const { paramsKey, prefixIcon, originPlaceholder, destPlaceholder } = getFilterMapping({ transportMode, t });
	return (
		[
			{
				name        : 'originPort',
				keyName     : 'origin',
				label       : t('dutiesTaxesCalculator:form_transport_origin_label'),
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
				label       : t('dutiesTaxesCalculator:form_transport_destination_label'),
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
			{ label: 'INR', value: 'INR' },
			{ label: 'USD', value: 'USD' },
		],
		rules: { required: true },
	},
];

export const chargeControls = ({ t }) => [
	{
		name        : 'freightCharge',
		type        : 'number',
		label       : t('dutiesTaxesCalculator:form_charge_freight_field'),
		placeholder : t('dutiesTaxesCalculator:form_charge_freight_field'),
		rules       : {
			required : true,
			min      : {
				value   : 0.001,
				message : t('d:form_charge_err_msg'),
			},
		},
	},
	{
		name        : 'incoterm',
		type        : 'select',
		label       : t('d:form_charge_incoterm_label'),
		placeholder : t('d:form_charge_incoterm_placeholder'),
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
				placeholder : t('d:form_charge_incoterm_array_placeholder_1'),
				type        : 'text',
				rules       : { required: true },
			},
			{
				name        : 'value',
				placeholder : t('d:form_charge_incoterm_array_placeholder_2'),
				type        : 'number',
				rules       : {
					required : true,
					min      : {
						value   : 0.001,
						message : t('d:form_charge_err_msg'),
					},
				},
			},
		],
	},
];
