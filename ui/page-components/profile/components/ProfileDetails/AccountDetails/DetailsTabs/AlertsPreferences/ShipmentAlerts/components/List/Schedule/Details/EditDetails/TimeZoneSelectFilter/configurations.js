import TIME_ZONE from '@/ui/commons/configurations/timeZone';

const DATES = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24, 25, 26, 27, 28,
];

const DAYS = ({ t = () => {} }) => [
	{ label: t('settings:schedule_days_option_0'), value: 0 },
	{ label: t('settings:schedule_days_option_1'), value: 1 },
	{ label: t('settings:schedule_days_option_2'), value: 2 },
	{ label: t('settings:schedule_days_option_3'), value: 3 },
	{ label: t('settings:schedule_days_option_4'), value: 4 },
	{ label: t('settings:schedule_days_option_5'), value: 5 },
	{ label: t('settings:schedule_days_option_6'), value: 6 },
];

const STATUS_MAPPING = {
	daily   : ['time_zone', 'time'],
	weekly  : ['time_zone', 'time', 'days'],
	monthly : ['time_zone', 'time', 'date'],
	naver   : [],

};

export const controls = ({ t = () => {} }) => [
	{
		label   : t('settings:schedule_label_1'),
		name    : 'date',
		type    : 'select',
		options : DATES.map((item) => ({
			label : item,
			value : item,
		})),
		style: { width: '200px' },
	},
	{
		label    : t('settings:schedule_label_2'),
		name     : 'days',
		type     : 'select',
		options  : DAYS({ t }),
		style    : { width: '200px' },
		multiple : true,
	},
	{
		label   : t('settings:schedule_label_3'),
		name    : 'time_zone',
		type    : 'select',
		options : TIME_ZONE,
		style   : { width: '200px' },
	},
	{
		label : t('settings:schedule_label_4'),
		name  : 'time',
		type  : 'time_picker',
		style : { width: '200px' },
	},
];

export const getControls = ({ value, t = () => {} }) => {
	const control = controls({ t }).filter((item) => STATUS_MAPPING[value]?.includes(item.name));
	return control;
};
