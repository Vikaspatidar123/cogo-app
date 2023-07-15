const getFrtConfig = ({ t }) => [
	{
		name        : 'origin',
		type        : 'async_select',
		asyncKey    : 'locations',
		initialCall : true,
		placeholder : t('frt:form_origin_placeholder'),
		params      : { filters: { type: ['seaport'] } },
		rules       : { required: 'Please enter value' },
	},
	{ type: 'anchor' },
	{
		name        : 'destination',
		type        : 'async_select',
		asyncKey    : 'locations',
		initialCall : true,
		placeholder : t('frt:form_destination_placeholder'),
		params      : { filters: { type: ['seaport'] } },
		rules       : { required: 'Please enter value' },
	},
];

export default getFrtConfig;
