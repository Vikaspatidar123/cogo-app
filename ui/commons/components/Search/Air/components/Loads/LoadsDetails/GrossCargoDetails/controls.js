const PACKAGE_TYPE_OPTIONS = [
	{
		label : 'Pallet',
		value : 'pallet',
	},
	{
		label : 'Box',
		value : 'box',
	},
	{
		label : 'Crate',
		value : 'crate',
	},
	{
		label : 'Loose',
		value : 'loose',
	},
];

const getControls = ({ showFilledValues = {} }) => [
	{
		name        : 'total_quantity',
		type        : 'number',
		label       : ' Total Quantity',
		span        : 4,
		size        : 'sm',
		value       : showFilledValues?.gross?.total_quantity,
		style       : { width: '100px' },
		placeholder : '0',
		rules       : {
			min      : 1,
			required : true,
		},
	},
	{
		name        : 'gross_volume',
		type        : 'number',
		label       : 'Gross Volume',
		span        : 4,
		size        : 'sm',
		value       : showFilledValues?.gross?.gross_volume,
		style       : { width: '100px' },
		placeholder : '0',
		rules       : {
			min      : 0.000001,
			required : true,
		},
	},
	{
		name    : 'volume_unit',
		label   : 'Unit',
		span    : 4,
		size    : 'sm',
		type    : 'select',
		style   : { width: '100px' },
		options : [
			{
				label : 'CBM',
				value : 'cbm',
			},
			{
				label : 'CC',
				value : 'cc',
			},
			{
				label : 'CFT',
				value : 'cft',
			},
		],
		value : showFilledValues?.gross?.volume_unit || 'cbm',
		rules : {
			required: true,
		},
	},
	{
		name        : 'total_weight',
		type        : 'number',
		label       : 'Total Weight',
		span        : 4,
		size        : 'sm',
		placeholder : '0',
		value       : showFilledValues?.gross?.total_weight,
		style       : { width: '100px' },
		rules       : {
			min      : 1,
			required : true,
		},
	},
	{
		name    : 'weight_unit',
		label   : 'Unit',
		span    : 4,
		size    : 'sm',
		type    : 'select',
		style   : { width: '100px' },
		options : [
			{
				label : 'KG',
				value : 'kg',
			},
			{
				label : 'LB',
				value : 'lb',
			},
		],
		value : showFilledValues?.gross?.weight_unit || 'kg',
		rules : {
			required: true,
		},
	},
	{
		name        : 'package_type',
		type        : 'select',
		label       : 'Packages type',
		size        : 'sm',
		style       : { width: '120px' },
		options     : PACKAGE_TYPE_OPTIONS,
		value       : showFilledValues?.gross?.package_type || 'box',
		placeholder : 'Select',
		rules       : {
			required: true,
		},
	},
	{
		name    : 'stackability',
		type    : 'checkbox',
		size    : 'sm',
		label   : 'Stackable',
		options : [{ value: 'stackable', label: 'Stackable' }],
		value   : ['non_stackable', ''].includes(
			showFilledValues?.gross?.stackability,
		)
			? false
			: 'stackable',
	},
	{
		name            : 'packing_list',
		showProgress    : true,
		onlyURLOnChange : true,
		accept          : 'image, pdf, docx, csv',
		label           : 'Upload Documents',
		drag            : true,
		height          : 50,
		showOptional    : true,
		value           : showFilledValues?.gross?.packing_list,
	},
];

export default getControls;
