const parseScheduleString = (str = '') => {
	const strSplit = str?.split?.(' ') || [];

	const prevFrequency = strSplit[0] || '';
	let prevDay = '';

	const prevTime = strSplit.slice(-1)[0] || '';

	if (prevFrequency === 'Weekly') prevDay = strSplit[2] || '';

	return { prevFrequency: prevFrequency.toLowerCase(), prevDay: prevDay.toLowerCase(), prevTime };
};

export default parseScheduleString;
