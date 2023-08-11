import { IcMAirport, IcMPort } from '@cogoport/icons-react';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getFilterMapping = ({ t, transportMode }) => {
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

export const productControls = ({ t }) => [
	{
		name : 'productName',
		type : 'hidden',
	},
	{
		name        : 'hsCode',
		type        : 'number',
		label       : t('dutiesTaxesCalculator:form_product_controls_hscode_label'),
		placeholder : t('dutiesTaxesCalculator:form_product_controls_hscode_placeholder'),
		rules       : {
			required  : t('dutiesTaxesCalculator:form_product_controls_hscode_error'),
			minLength : {
				value   : 6,
				message : t('dutiesTaxesCalculator:form_product_controls_hscode_error_minlength'),
			},
		},
	},
	{
		name        : 'consignmentValue',
		type        : 'number',
		placeholder : t('dutiesTaxesCalculator:form_product_controls_value_placeholder'),
		label       : t('dutiesTaxesCalculator:form_product_controls_value_label'),
		rules       : {
			required : true,
			min      : {
				value   : 0.001,
				message : t('dutiesTaxesCalculator:form_product_controls_error_min'),
			},
			maxLength: {
				value   : 10,
				message : t('dutiesTaxesCalculator:form_product_controls_error_maxlength'),
			},
		},
	},
	{
		name        : 'quantity',
		type        : 'number',
		placeholder : '0',
		label       : t('dutiesTaxesCalculator:form_product_controls_quantity_label'),
		rules       : {
			required : true,
			min      : {
				value   : 0.1,
				message : t('dutiesTaxesCalculator:form_product_controls_error_min'),
			},
			maxLength: {
				value   : 10,
				message : t('dutiesTaxesCalculator:form_product_controls_error_maxlength'),
			},
		},
	},
	{
		name    : 'currency',
		type    : 'select',
		label   : t('dutiesTaxesCalculator:form_product_controls_currency_label'),
		options : [
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.VND,
			GLOBAL_CONSTANTS.currency_code.SGD,
			GLOBAL_CONSTANTS.currency_code.THB,
			GLOBAL_CONSTANTS.currency_code.IDR,
			GLOBAL_CONSTANTS.currency_code.CNY,
		].map((currencyCode) => ({
			label : currencyCode,
			value : currencyCode,
		})),
		rules: { required: true },
	},
];

export const chargeControls = ({ t }) => [
	{
		name        : 'freightCharge',
		type        : 'number',
		label       : t('dutiesTaxesCalculator:form_charge_controls_freight_field'),
		placeholder : t('dutiesTaxesCalculator:form_charge_controls_freight_field'),
		rules       : {
			required : true,
			min      : {
				value   : 0.001,
				message : t('dutiesTaxesCalculator:form_charge_controls_err_msg'),
			},
		},
	},
	{
		name        : 'incoterm',
		type        : 'select',
		label       : t('dutiesTaxesCalculator:form_charge_controls_incoterm_label'),
		placeholder : t('dutiesTaxesCalculator:form_charge_controls_incoterm_placeholder'),
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
				placeholder : t('dutiesTaxesCalculator:form_charge_controls_incoterm_array_placeholder_1'),
				type        : 'text',
				rules       : { required: true },
			},
			{
				name        : 'value',
				placeholder : t('dutiesTaxesCalculator:form_charge_controls_incoterm_array_placeholder_2'),
				type        : 'number',
				rules       : {
					required : true,
					min      : {
						value   : 0.001,
						message : t('dutiesTaxesCalculator:form_charge_controls_err_msg'),
					},
				},
			},
		],
	},
];
