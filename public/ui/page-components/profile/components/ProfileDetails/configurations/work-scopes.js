const getWorkScopes = ({ t }) => [
	{
		label : t('settings:work_scope_1'),
		value : 'i_am_owner',
	},
	{
		label : t('settings:work_scope_2'),
		value : 'i_am_finance_head',
	},
	{
		label : t('settings:work_scope_3'),
		value : 'i_work_in_finance',
	},
	{
		label : t('settings:work_scope_4'),
		value : 'i_work_in_marketing_and_sales',
	},
	{
		label : t('settings:work_scope_5'),
		value : 'i_work_in_procurement',
	},
	{
		label : t('settings:work_scope_6'),
		value : 'i_work_in_operations',
	},
	{
		label : t('settings:work_scope_7'),
		value : 'i_am_logistics_manager',
	},
	{
		label : t('settings:work_scope_8'),
		value : 'other',
	},
];
export default getWorkScopes;
