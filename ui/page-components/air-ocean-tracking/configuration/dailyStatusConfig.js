const dailyStatusConfig = [
	{
		key   : 'name',
		title : 'Name',
		func  : 'renderName',
		width : '20%',
	},
	{
		key   : 'schedule',
		title : 'Schedule',
		func  : 'renderEdit',
		width : '35%',
	},
	{
		key   : 'shipments',
		title : 'Shipments',
		func  : 'renderEdit',
		width : '15%',

	},
	{
		key   : 'report_update',
		title : 'Last Sent',
		func  : 'renderDate',
		width : '15%',

	},
	{
		key   : 'status',
		title : 'Status',
		func  : 'renderStatus',
		width : '10%',

	},
];

export default dailyStatusConfig;
