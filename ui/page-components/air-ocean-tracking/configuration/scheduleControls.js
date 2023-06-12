const freqOptions = [
	{ name: 'daily', value: 'daily', label: 'Daily' }, { name: 'weekly', value: 'weekly', label: 'Weekly' },
];

const weekOption = [
	{ name: 'sunday', value: 'sunday', label: 'Sunday' }, { name: 'monday', value: 'monday', label: 'Monday' },
	{ name: 'tuesday', value: 'tuesday', label: 'Tuesday' },
	{ name: 'wednesday', value: 'wednesday', label: 'Wednesday' },
	{ name: 'thursday', value: 'thursday', label: 'Thursday' }, { name: 'friday', value: 'friday', label: 'Friday' },
	{ name: 'saturady', value: 'saturady', label: 'Saturday' },
];

const TIME_ARRAY = [...Array(24).keys()].reduce((acc, curr) => {
	const hour = curr;
	const minutes = ['00', '15', '30', '45'];
	return acc.concat(
		minutes.map((minute) => `${hour}:${minute}`),
	);
}, []);

const TIME_OPTIONS = TIME_ARRAY.map((item) => ({
	label: item, value: item,
}));

const scheduleControls = ({ watchFrequency }) => [
	{
		name       : 'frequency',
		label      : 'Select Frequency',
		type       : 'radio',
		options    : freqOptions,
		radioGroup : true,
		rules      : { required: 'Please select a frequency' },
	},
	{
		name       : 'day',
		label      : 'Add Schedule',
		type       : 'radio',
		options    : weekOption,
		show       : watchFrequency === 'weekly',
		radioGroup : true,
		rules      : { required: 'Please select a day' },
	},
	{
		name            : 'time',
		label           : 'At',
		type            : 'time_picker',
		radioGroup      : true,
		use12hourformat : true,
		options         : TIME_OPTIONS,
		rules           : { required: 'Please select time' },
	},
];

export default scheduleControls;
