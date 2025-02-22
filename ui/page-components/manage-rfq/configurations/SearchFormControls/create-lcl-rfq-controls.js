// import getGeoConstants from '@cogo/globalization/constants/geo';

// const geo = getGeoConstants();

const lclControls = [
	{
		label     : 'Container',
		type      : 'fieldArray',
		name      : 'search_rates',
		addButton : 'Containers',
		controls  : [
			{
				inlineLabel       : 'Origin',
				name              : 'origin_port_id',
				apiKey            : 'origin_port_id',
				placeholder       : 'Type to search...',
				includedInOptions : false,
				params            : {
					filters  : { type: ['seaport', 'icd'] },
					includes : { continent_id: true },
				},
				grouped     : ['city', 'country'],
				type        : 'async_select',
				initialCall : true,
				asyncKey    : 'locations',
				rules       : { required: 'Origin Port is required' },
				span        : 4.65,
			},
			{
				inlineLabel : 'Destination',
				name        : 'destination_port_id',
				apiKey      : 'destination_port_id',
				params      : {
					filters  : { type: ['seaport', 'icd'] },
					includes : { continent_id: true },
				},
				grouped           : ['city', 'country'],
				placeholder       : 'Type to search...',
				includedInOptions : false,
				initialCall       : true,
				type              : 'async_select',
				asyncKey          : 'locations',
				rules             : { required: 'Destination Port is required' },
				span              : 4.35,
			},
			{
				name          : 'commodity',
				inlineLabel   : 'Commodity',
				type          : 'select',
				placeholder   : 'Commodity',
				commodityType : 'lcl_freight',
				optionKey     : 'commodities',
				rules         : { required: 'Commodity is required' },
				span          : 3,
			},
			{
				name        : 'inco_term',
				inlineLabel : 'Inco-Term',
				type        : 'select',
				placeholder : 'Incoterm',
				rules       : { required: 'Incoterm is required' },
				span        : 3,
			},
			{
				name        : 'additional_services',
				inlineLabel : 'Additional Services',
				span        : 3,
			},
			{
				inlineLabel : 'HS code',
				name        : 'hs_code',
				multiple    : true,
				subLabel    : 'HS Code',
				type        : 'async_select',
				initialCall : true,
				placeholder : 'Select HS Code',
				asyncKey    : 'hs_code',
				rules       : { required: 'HS code is required' },
				span        : 2,
			},
			{
				inlineLabel : 'Remarks',
				name        : 'container_remarks',
				subLabel    : 'Remarks',
				type        : 'text',
				placeholder : 'Enter remarks',
				span        : 3,
			},
			{
				type    : 'checkboxGroup',
				name    : 'is_transit_shipment',
				options : [{ label: 'Transit Shipment', value: true, name: 'Transit Shipment' }],
				span    : 2,
			},
			{
				name        : 'calculate_by',
				label       : 'Calculate By',
				type        : 'radio',
				radioGroup  : true,
				placeholder : 'Enter Gender',
				options     : [
					{ label: 'By Total weight/volume', value: 'total' },
					{ label: 'By Package Details', value: 'unit' },
				],
				rules : { required: 'Required' },
				span  : 12,
			},
			{
				label     : 'Packages',
				type      : 'fieldArray',
				name      : 'dimensions',
				addButton : 'Packages',
				controls  : [
					{
						inlineLabel : 'Packages count',
						name        : 'packages_count',
						placeholder : 'Packages count',
						subLabel    : 'packages',
						type        : 'number',
						rules       : { min: 1, max: 10000, required: 'Packages is required' },
						span        : 2.4,
					},
					{
						inlineLabel : 'Weight per package',
						name        : 'weight',
						subLabel    : 'kgs',
						type        : 'number',
						rules       : { required: 'Weight is required', min: 0.001 },
						span        : 2.4,
					},
					{
						inlineLabel : 'Length',
						name        : 'length',
						placeholder : 'Length',
						subLabel    : 'cm',
						type        : 'number',
						rules       : { min: 1, required: 'Length is required' },
						span        : 2.4,
					},
					{
						inlineLabel : 'Width',
						name        : 'width',
						placeholder : 'Width',
						subLabel    : 'cm',
						type        : 'number',
						rules       : { min: 1, required: 'Width is required' },
						span        : 2.4,
					},
					{
						inlineLabel : 'Height',
						name        : 'height',
						placeholder : 'Height',
						subLabel    : 'cm',
						type        : 'number',
						rules       : { min: 1, required: 'Height is required' },
						span        : 2.4,
					},
				],
			},
			{
				inlineLabel : 'Packages',
				type        : 'fieldArray',
				addButton   : 'Packages',
				name        : 'containers',
				controls    : [
					{
						inlineLabel : 'Packages count',
						name        : 'packages_count',
						placeholder : 'Packages count',
						subLabel    : 'packages',
						type        : 'number',
						rules       : { min: 1, max: 10000, required: 'Packages is required' },
						span        : 3,
					},
					{
						inlineLabel : 'Gross Weight',
						name        : 'weight',
						subLabel    : 'kgs',
						type        : 'number',
						rules       : { required: 'Gross Weight is required', min: 0.000000001 },
						span        : 3,
					},
					{
						inlineLabel : 'Total Volume',
						name        : 'volume',
						subLabel    : 'cbm',
						type        : 'number',
						rules       : { required: 'Total Volume is required', min: 0.0000000001 },
						span        : 3,
					},
				],
			},
			{
				label    : 'Additional Remarks',
				type     : 'fieldArray',
				name     : 'remarks',
				controls : [
					{
						name        : 'price',
						inlineLabel : 'Indicative Price',
						placeholder : 'Price',
						type        : 'price_select',
						span        : 3,
						rules       : {
							validate: (value) => ((value.price === 0 ? 0 : value.price || 1) <= 0
								? 'Price should be greater than 0.'
								: undefined),
						},
					},
				],
			},
			{
				name         : 'shipping_frequency',
				label        : 'Tentative Shipping Plan (Optional)',
				inlineLabel  : 'Please Select Tentative Shipment Frequency.This will help us bring better rates',
				showOptional : false,
				type         : 'radiogroup',
				options      : [
					{ name: '3 Days', label: '3 Days', value: '3' },
					{ name: '7 Days', label: '7 Days', value: '7' },
					{ name: '15 Days', label: '15 Days', value: '15' },
					{ name: 'Other', label: 'Other', value: 'other' },
				],
				span: 6,
			},
			{
				name        : 'custom_shipping_frequency',
				type        : 'number',
				size        : 'sm',
				placeholder : 'Enter No. of Days',
				span        : 2,
				rules       : {
					required: 'No of Days is Required or else Select Default frequencies',
				},
			},
		],
	},
];

export default lclControls;
