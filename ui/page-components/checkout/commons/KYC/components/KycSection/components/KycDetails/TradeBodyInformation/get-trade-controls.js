const getTradeControls = (channelPartnerDetails) => [
	{
		id            : 'cp-lsp__onboarding__organizationDetails__trade_bodies',
		label         : 'Trade Body',
		name          : 'trade_bodies',
		type          : 'checkbox-tiles',
		multiple      : true,
		autoCloseMenu : false,
		span          : 12,
		rules         : {
			required: true,
		},
		value   : channelPartnerDetails.trade_bodies,
		options : [
			{
				label : 'WCA',
				value : 'wca',
			},
			{
				label : 'FNC',
				value : 'fnc',
			},
			{
				label : 'JC TRANS',
				value : 'jc_trans',
			},
			{
				label : 'FIEO',
				value : 'fieo',
			},
			{
				label : 'NAP',
				value : 'nap',
			},
			{
				label : 'Others',
				value : 'others',
			},
		],
	},
];

export default getTradeControls;
