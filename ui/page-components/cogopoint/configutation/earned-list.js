import { IcCCogoCoin } from '@cogoport/icons-react';

const earnedList = [
	{
		key   : 'event',
		name  : 'Event',
		width : '300px',
	},

	{
		key   : 'points',
		name  : 'Points Earned',
		width : '300px',
		icon  : <IcCCogoCoin />,
	},
	{
		key   : 'point_status',
		name  : 'Status',
		width : '300px',
	},
	{
		key     : 'created_at',
		name    : 'Date',
		width   : '280px',
		sorting : true,
	},
	{
		key   : 'transaction_type',
		name  : '',
		width : '300px',
	},
];

export default earnedList;
