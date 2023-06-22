const dashboardTableConfig = ({ type }) => [
	{
		key   : type === 'ocean' ? 'search_value' : 'airway_bill_no',
		title : 'Tracking number',
		width : '30%',
	},
	// {
	// 	key   : 'trade_lane',
	// 	title : 'Trade Lane',
	// 	width : '30%',
	// },
	{
		key   : 'current_status',
		title : 'Current Status',
		func  : type === 'ocean' ? 'renderCurrentStatus' : 'renderCurrentStatusAir',
		width : '30%',
	},
	{
		key   : 'last_modified_at',
		title : 'Last modified date',
		func  : 'renderDate',
		width : '25%',
	},
	{
		key   : 'view_more',
		title : '',
		func  : 'renderViewMore',
		width : '15%',
	},
];

export default dashboardTableConfig;
