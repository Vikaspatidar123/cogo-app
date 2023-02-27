const saas = {
	app_saas_trader_eligibility_check: [
		{
			api         : 'saas_get_user_quota_usage',
			access_type : 'private',
		},
		{
			api         : 'get_saas_bill_status',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api         : 'get_saas_trade_engine_service_rates',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api          : 'list_locations',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api         : 'get_saas_trade_engine',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api         : 'post_saas_payment',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api         : 'post_saas_trade_engine',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api         : 'post_saas_trade_engine_screening_draft',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api         : 'get_saas_bill_product_codes',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
	],
};
export default saas;
