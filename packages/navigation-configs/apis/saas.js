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

	app_saas_trade_partner: [
		{
			api         : 'delete_saas_organization_partner',
			access_type : 'private',
			module      : 'trade-partner',
			feature     : 'trade-partner',
		},
		{
			api         : 'get_saas_organization_partner_list',
			access_type : 'private',
			module      : 'trade-partner',
			feature     : 'trade-partner',
		},
		{
			api         : 'post_saas_organization_buyer',
			access_type : 'private',
			module      : 'trade-partner',
			feature     : 'trade-partner',
		},
		{
			api         : 'put_saas_organization',
			access_type : 'private',
			module      : 'trade-partner',
			feature     : 'trade-partner',
		},
		{
			api         : 'put_saas_organization_archive',
			access_type : 'private',
			module      : 'trade-partner',
			feature     : 'trade-partner',
		},
		{
			api         : 'put_saas_organization_unarchive',
			access_type : 'private',
			module      : 'trade-partner',
			feature     : 'trade-partner',
		},
		{
			api         : 'put_saas_organization_archive',
			access_type : 'private',
			module      : 'trade-partner',
			feature     : 'trade-partner',
		},
	],
};
export default saas;
