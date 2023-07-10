const searchFrtConfig = [
	{
		name        : 'origin',
		type        : 'async_select',
		asyncKey    : 'locations',
		initialCall : true,
		placeholder : 'Search origin port',
		params      : { filters: { type: ['seaport'] } },
		rules       : { required: 'Please enter value' },
	},
	{ type: 'anchor' },
	{
		name        : 'destination',
		type        : 'async_select',
		asyncKey    : 'locations',
		initialCall : true,
		placeholder : 'Search destination port',
		params      : { filters: { type: ['seaport'] } },
		rules       : { required: 'Please enter value' },
	},
];

export default searchFrtConfig;
