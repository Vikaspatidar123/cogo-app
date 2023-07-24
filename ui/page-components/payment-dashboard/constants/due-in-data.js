const DueInData = ({ statsList = {} }) => [
	{
		id: 'NOT DUE',
		label: 'NOT DUE',
		value: statsList.amount_not_due || 0,
		sub_label: 'NOT DUE',
	},
	{
		id: '1-30 DAYS',
		label: '1-30 DAYS',
		value: statsList.amount_1_30 || 0,
		sub_label: '1-30 DAYS',
	},
	{
		id: '31-60 DAYS',
		label: '31-60 DAYS',
		value: statsList.amount_31_60 || 0,
		sub_label: '31-60 DAYS',
	},
	{
		id: '61-90 DAYS',
		label: '61-90 DAYS',
		value: statsList.amount_61_90 || 0,
		sub_label: '61-90 DAYS',
	},
	{
		id: '91-180 DAYS',
		label: '91-180 DAYS',
		value: statsList.amount_91_180 || 0,
		sub_label: '91-180 DAYS',
	},
	{
		id: '181-365 DAYS',
		label: '181-365 DAYS',
		value: statsList.amount_181_365 || 0,
		sub_label: '181-365 DAYS',
	},
	{
		id: '365+ DAYS',
		label: '365+ DAYS',
		value: statsList.amount_365 || 0,
		sub_label: '365+ DAYS',
	},
];

export default DueInData;
