export const getFilterOption = ({ t }) => [
	{
		label : t('orderHistory:filter_service_type_tec'),
		value : 'SCREENING',
	},
	{
		label : t('orderHistory:filter_service_type_dt'),
		value : 'DUTIES',
	},
	{
		label : t('orderHistory:filter_service_type_doc'),
		value : 'DOCUMENTS',
	},
	{
		label : t('orderHistory:filter_service_type_control'),
		value : 'CONTROLS',
	},
];
