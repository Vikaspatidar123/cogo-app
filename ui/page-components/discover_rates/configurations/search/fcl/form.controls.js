import CONTAINER_SIZES from '@/ui/commons/constants/globals';
const formControls = () => [
	{
		label: 'Origin Port',
		name: 'origin_port_id',
		placeholder: 'Search via port name/code',
		includedInOptions: false,
		type: 'location-select',
		optionsListKey: 'locations',
		grouped: ['country'],
		params: { filters: { type: ['seaport', 'country'] } },
		rules: { required: 'Origin Port is required' },
	},
	{
		label: 'Destination Port',
		name: 'destination_port_id',
		placeholder: 'Search via port name/code',
		includedInOptions: false,
		type: 'location-select',
		optionsListKey: 'locations',
		grouped: ['country'],
		params: { filters: { type: ['seaport', 'country'] } },
		rules: { required: 'Destination Port is required' },
	},
	{
		name: 'containers',
		type: 'fieldArray',
		showButtons: true,
		buttonText: 'Add Containers',
		value: [
			{
				containers_count: 1,
				container_size: '20',
				container_type_commodity: {
					container_type: 'standard',
					commodity: 'general',
				},
				cargo_weight_per_container: 18,
			},
		],
		controls: [
			{
				label: 'Containers Count',
				name: 'containers_count',
				type: 'number',
				span: 12,
				value: 1,
				rules: { min: 1, max: 10000, required: 'Containers count is required' },
			},
			{
				label: 'Container Size',
				name: 'container_size',
				type: 'pills',
				span: 12,
				options: CONTAINER_SIZES,
				rules: { required: 'Containers size is required' },
			},
			{
				label: 'Container Type',
				name: 'container_type_commodity',
				type: 'container_type-commodity',
				span: 12,
				controlFields: {
					container_type: {
						label: 'Container Type',
						name: 'container_type',
						type: 'pills',
						optionsListKey: 'container-types',
					},
					commodity: {
						label: 'Select Commodity',
						name: 'commodity',
						type: 'pills',
					},
				},
				rules: { required: 'Containers type & commodity is required' },
			},
			{
				label: 'Cargo Weight per Container',
				subLabel: '(in metric tonnes)',
				name: 'cargo_weight_per_container',
				placeholder: 'between 0 to 30 metric tonnes',
				type: 'number',
				span: 12,
				value: 18,
				rules: { min: 0.1, max: 30, required: 'Cargo Weight is required' },
			},
		],
	},
	{
		label: '',
		name: 'inco_term',
		type: 'inco-terms-select',
		selectType: 'pills',
		style: { control: { width: '200px' } },
		rules: { required: 'Inco-term is required' },
	},
];

export default formControls;
