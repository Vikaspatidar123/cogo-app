const getFrtConfig = ({ t }) => [
	{
		name        : 'origin',
		type        : 'async_select',
		asyncKey    : 'locations',
		initialCall : true,
		placeholder : t('frt:form_origin_placeholder'),
		params      : { filters: { type: ['seaport'] } },
		rules       : { required: t('frt:origin_rule_text') },
	},
	{ type: 'anchor' },
	{
		name        : 'destination',
		type        : 'async_select',
		asyncKey    : 'locations',
		initialCall : true,
		placeholder : t('frt:form_destination_placeholder'),
		params      : { filters: { type: ['seaport'] } },
		rules       : { required: t('frt:destination_rule_text') },
	},
];

export default getFrtConfig;
