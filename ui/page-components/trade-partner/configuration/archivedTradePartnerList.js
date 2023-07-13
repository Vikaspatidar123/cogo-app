const getArchivedPartnerListConfig = ({ t }) => ({
	fields: [
		{
			key   : 'displayName',
			label : t('tradePartner:archived_list_config_label_1'),
		},
		{
			key   : 'totalQuotes',
			label : t('tradePartner:archived_list_config_label_2'),
		},

		{
			key   : 'expiredQuotes',
			label : t('tradePartner:archived_list_config_label_3'),
		},
		{
			key   : 'totalAmount',
			label : 'Total Amount',
			func  : t('tradePartner:archived_list_config_label_4'),
		},
		{
			key   : 'expiredAmount',
			label : t('tradePartner:archived_list_config_label_5'),
		},
		{
			key   : 'dot',
			label : '',
			func  : 'renderDots',
		},
	],
});

export default getArchivedPartnerListConfig;
