const getTradePartnerListConfig = ({ t }) => ({
	fields: [
		{
			key   : 'displayName',
			label : t('tradePartner:trade_partner_list_buyer_label'),
		},
		{
			key   : 'totalQuotes',
			label : t('tradePartner:trade_partner_list_total_quote_label'),
		},
		{
			key   : 'expiredQuotes',
			label : t('tradePartner:trade_partner_list_expired_quote_label'),
		},
		{
			key     : 'totalAmount',
			label   : t('tradePartner:trade_partner_list_total_amount_label'),
			func    : 'renderAmount',
			sorting : true,
		},
		{
			key   : 'expiredAmount',
			label : t('tradePartner:trade_partner_list_expired_amount_label'),
		},
		{
			key   : 'dot',
			label : '',
			func  : 'renderDots',
		},
	],
});

export default getTradePartnerListConfig;
