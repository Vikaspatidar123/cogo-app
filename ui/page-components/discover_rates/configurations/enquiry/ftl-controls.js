// import getGeoConstants from '@cogo/globalization/constants/geo';

// const geo = getGeoConstants();

const ftlControls = () => [
	{
		name   : 'free_detention_hours',
		label  : 'Detention free time',
		type   : 'number',
		suffix : <div style={{
			fontSize : '12px',
			color    : '#828282',
		}}
		>
			days
           </div>,
	},
	{
		name        : 'address',
		label       : 'Address',
		type        : 'text',
		placeholder : 'Type address',
		rules       : {
			required: true,
		},
	},
	{
		name           : 'preferred_freight_rate_currency',
		label          : 'Currency',
		type           : 'select',
		optionsListKey : 'currencies',
		// value: geo.country.currency.code,
	},
	{
		name  : 'preferred_freight_rate',
		label : 'Indicative basic freight per truck*',
		type  : 'number',
		rules : {
			required: true,
		},
	},
	{
		name  : 'negotiation_remarks',
		label : 'Comments to procurement',
		type  : 'text',
	},
	// {
	// 	name: 'expected_cargo_pick_up_date',
	// 	label: 'Expected Cargo pickup Date',
	// 	type: 'datepicker',
	// 	span: 6,
	// 	rules: { required: 'Required' },
	// },
	// {
	// 	name: 'packages',
	// 	type: 'fieldArray',
	// 	showButtons: true,
	// 	label: 'Choose Package Information',
	// 	buttonText: 'Add More Packages',
	// 	controls: [
	// 		{
	// 			label: 'Type',
	// 			name: 'packing_type',
	// 			placeholder: 'Select',
	// 			type: 'pills',
	// 			caret: true,
	// 			options: [
	// 				{ label: 'Pallet', value: 'pallet' },
	// 				{ label: 'Box', value: 'box' },
	// 			],
	// 			span: 3,
	// 			rules: { required: 'Required' },
	// 		},
	// 		{
	// 			name: 'dimensions',
	// 			label: 'Dimensions',
	// 			type: 'input-group',
	// 			watch: true,
	// 			subLabel: 'CM',
	// 			span: 5,
	// 			inputControls: [
	// 				{
	// 					name: 'length',
	// 					type: 'number',
	// 					placeholder: 'L',
	// 				},
	// 				{
	// 					name: 'width',
	// 					type: 'number',
	// 					placeholder: 'W',
	// 				},
	// 				{
	// 					name: 'height',
	// 					type: 'number',
	// 					placeholder: 'H',
	// 				},
	// 			],
	// 			rules: { required: 'Required', inputType: 'group' },
	// 		},
	// 		{
	// 			label: 'Count',
	// 			name: 'packages_count',
	// 			placeholder: '(min 1, max 10000)',
	// 			type: 'number',
	// 			style: { padding: '0px 2px' },
	// 			span: 2,
	// 			rules: { required: 'Required', min: 1, max: 10000 },
	// 		},
	// 	],
	// },
	{
		label     : 'Commodity detail',
		name      : 'commodity_description',
		type      : 'text',
		span      : 6,
		show      : true,
		rules     : { required: 'Required', minLength: 5 },
		condition : { trade_type: ['export'] },
	},
	{
		name      : 'cargo_stacking_type',
		label     : 'Cargo stacking type',
		type      : 'pills',
		condition : { trade_type: 'export' },
		options   : [
			{ label: 'Stackable', value: 'stackable' },
			{ label: 'Non stackable', value: 'non_stackable' },
		],
	},
	{
		label     : 'Commodity detail',
		name      : 'commodity_description',
		type      : 'text',
		span      : 6,
		show      : true,
		rules     : { required: 'This is required' },
		condition : {
			cargo_handling_type : ['destuffing_at_dock'],
			trade_type          : ['import'],
		},
	},
	{
		name      : 'cargo_stacking_type',
		label     : 'Cargo stacking type',
		type      : 'pills',
		condition : {
			cargo_handling_type : ['destuffing_at_dock'],
			trade_type          : ['import'],
		},
		options: [
			{ label: 'Stackable', value: 'stackable' },
			{ label: 'Non stackable', value: 'non_stackable' },
		],
	},
	// {
	// 	name: 'packing_list',
	// 	span: 12,
	// 	type: 'file',
	// 	themeType: 'secondary',
	// 	onlyURLOnChange: true,
	// 	drag: true,
	// 	uploadIcon: 'ic-upload',
	// 	label: 'Upload Packaging list',
	// 	accept:
	// 		'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	// 	uploadType: 'aws',
	// 	rules: { required: 'document is required' },
	// },
];
export default ftlControls;
