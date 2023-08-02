import TIME_ZONE from '@/ui/commons/configurations/timeZone';

const DATES = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24, 25, 26, 27, 28,
];

const DAYS = [
	{ label: 'Monday', value: 0 },
	{ label: 'Tuesday', value: 1 },
	{ label: 'Wednesday', value: 2 },
	{ label: 'Thursday', value: 3 },
	{ label: 'Friday', value: 4 },
	{ label: 'Saturday', value: 5 },
	{ label: 'Sunday', value: 6 },
];

const STATUS_MAPPING = {
	daily   : ['time_zone', 'time'],
	weekly  : ['time_zone', 'time', 'days'],
	monthly : ['time_zone', 'time', 'date'],
	naver   : [],

};

export const controls = [
	{
		label   : 'Select Date',
		name    : 'date',
		type    : 'select',
		options : DATES.map((item) => ({
			label : item,
			value : item,
		})),
		style: { width: '200px' },
	},
	{
		label    : 'Select Days',
		name     : 'days',
		type     : 'select',
		options  : DAYS,
		style    : { width: '200px' },
		multiple : true,
	},
	{
		label   : 'Select Time Zone',
		name    : 'time_zone',
		type    : 'select',
		options : TIME_ZONE,
		style   : { width: '200px' },
	},
	{
		label : 'Select Time (12 Hr Format)',
		name  : 'time',
		type  : 'time_picker',
		style : { width: '200px' },
	},
];

export const getControls = ({ value }) => {
	const control = controls.filter((item) => STATUS_MAPPING[value]?.includes(item.name));
	return control;
};
