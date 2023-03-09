const saas = {
	saas_quick_quotation: [
		{
			api          : 'get_recommended_spot_searches',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api         : 'get_saas_quote_list',
			access_type : 'private',
		},
		{
			api         : 'get_saas_quote_summary',
			access_type : 'private',
		},
		{
			api         : 'delete_saas_quote',
			access_type : 'private',
		},

	],
};
export default saas;
