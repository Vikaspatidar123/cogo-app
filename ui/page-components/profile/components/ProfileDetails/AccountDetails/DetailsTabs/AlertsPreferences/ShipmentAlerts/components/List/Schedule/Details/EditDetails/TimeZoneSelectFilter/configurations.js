import { formatTime } from '../../../../../../../utils';

import TIME_ZONE from '@/ui/commons/configurations/timeZone';

const DATES = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24, 25, 26, 27, 28,
];

const DAYS = ({ t = () => {} }) => [
	{ label: t('settings:schedule_days_option_6'), value: 0 },
	{ label: t('settings:schedule_days_option_0'), value: 1 },
	{ label: t('settings:schedule_days_option_1'), value: 2 },
	{ label: t('settings:schedule_days_option_2'), value: 3 },
	{ label: t('settings:schedule_days_option_3'), value: 4 },
	{ label: t('settings:schedule_days_option_4'), value: 5 },
	{ label: t('settings:schedule_days_option_5'), value: 6 },
];

const STATUS_MAPPING = {
	daily   : ['schedule_time_zone', 'schedule_time'],
	weekly  : ['schedule_time_zone', 'schedule_time', 'days'],
	monthly : ['schedule_time_zone', 'schedule_time', 'dates'],
	never   : [],

};

export const controls = ({ t = () => {}, reportData }) => [
	{
		label   : t('settings:schedule_label_1'),
		name    : 'dates',
		type    : 'select',
		options : DATES.map((item) => ({
			label : item,
			value : item,
		})),
		style    : { width: '200px' },
		multiple : true,
		value    : reportData?.days,

	},
	{
		label    : t('settings:schedule_label_2'),
		name     : 'days',
		type     : 'select',
		options  : DAYS({ t }),
		style    : { width: '200px' },
		multiple : true,
		value    : reportData?.days,
	},
	{
		label   : t('settings:schedule_label_3'),
		name    : 'schedule_time_zone',
		type    : 'select',
		options : TIME_ZONE,
		style   : { width: '200px' },
		value   : reportData?.schedule_time_zone,

	},
	{
		label : t('settings:schedule_label_4'),
		name  : 'schedule_time',
		type  : 'time_picker',
		style : { width: '200px' },
		value : formatTime(reportData?.schedule_time),
	},
];

export const getControls = ({ value, t = () => {}, reportData }) => {
	const control = controls({ t, reportData }).filter((item) => STATUS_MAPPING[value]?.includes(item.name));
	return control;
};
