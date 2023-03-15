const saas = {
	app_saas_freight_rate_trend: [
		{
			api          : 'get_freight_trend_subscription',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'list_freight_trend_subscriptions',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'list_freight_trend_rates',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'create_freight_trend_rate',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'create_freight_trend_subscription',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'list_saas_store_quota',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
	],

	app_saas_load_container : [],
	saas_quick_quotation    : [
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
		{
			api         : 'saas_get_user_quota_usage',
			access_type : 'private',

		}],
};
export default saas;
