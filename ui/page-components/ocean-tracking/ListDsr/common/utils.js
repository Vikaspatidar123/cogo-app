const parseScheduleString = (str = '') => {
	const strSplit = str?.split?.(' ') || [];
	const frequency = strSplit[0] || '';
	let day = '';
	const time = strSplit.slice(-1)[0] || '';
	if (frequency === 'Weekly') {
		day = strSplit[2];
	}
	return [frequency, day, time];
};

const constructScheduleString = (frequency = '', day = '', time = '') => {
	let str = frequency;
	if (frequency === 'Weekly') {
		str += ` on ${day}`;
	}
	str += ` at ${time}`;
	return str;
};

export { parseScheduleString, constructScheduleString };
