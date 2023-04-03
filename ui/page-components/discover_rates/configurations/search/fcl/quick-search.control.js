const controls = [
	{
		name        : 'containers',
		type        : 'fieldArray',
		showButtons : true,
		buttonText  : 'Add Containers',
		value       : [{
			containers_count           : 1,
			container_size             : '20',
			container_type_commodity   : { container_type: 'standard', commodity: 'general' },
			cargo_weight_per_container : 18,
		}],
		controls: [
			{
				label : 'Containers Count',
				name  : 'containers_count',
				type  : 'number',
				span  : 12,
				rules : { min: 1, max: 10000, required: 'Containers count is required' },
			},
			{
				label     : 'Container Size',
				name      : 'container_size',
				type      : 'chips',
				span      : 12,
				optionKey : 'container-sizes',
				rules     : { required: 'Containers size is required' },
			},
			{
				label         : 'Container Type',
				name          : 'container_type_commodity',
				type          : 'container_type-commodity',
				span          : 12,
				controlFields : {
					container_type: {
						label     : '',
						name      : 'container_type',
						type      : 'chips',
						optionKey : 'container-types',
					},
					commodity: {
						label          : 'Select Commodity',
						name           : 'commodity',
						type           : 'chips',
						commodity_type : 'freight',
					},
				},
				rules: { required: 'Containers type & commodity is required' },
			},
			{
				label       : 'Cargo Weight per Container',
				subLabel    : '(in metric tonnes)',
				name        : 'cargo_weight_per_container',
				placeholder : 'between 0 to 30 metric tonnes',
				type        : 'number',
				style       : { width: '80%' },
				rules       : { min: 0.1, max: 30, required: 'Cargo Weight is required' },
			},
		],

	},
	{
		label      : '',
		name       : 'inco_term',
		type       : 'inco-terms-select',
		selectType : 'chips',
		style      : { control: { width: '200px' } },
		rules      : { required: 'Incoterm is required' },
	},
];
export default controls;
