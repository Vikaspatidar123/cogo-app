const getTradeControls = (partner) => [
	{
		id: 'cp-lsp__onboarding__organizationDetails__trade_bodies',
		label: 'Trade Body',
		name: 'trade_bodies',
		type: 'checkbox-tiles',
		multiple: true,
		autoCloseMenu: false,
		span: 12,
		rules: {
			required: true,
		},
		value: partner.trade_bodies,
		options: [
			{
				label: 'WCA',
				value: 'wca',
			},
			{
				label: 'FNC',
				value: 'fnc',
			},
			{
				label: 'JC TRANS',
				value: 'jc_trans',
			},
			{
				label: 'FIEO',
				value: 'fieo',
			},
			{
				label: 'Others',
				value: 'others',
			},
		],
	},
];

export default getTradeControls;
