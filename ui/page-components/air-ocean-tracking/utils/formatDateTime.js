const { format } = require('@cogoport/utils');

const formatDateTime = ({ date, formatDate, formatTime, separator = '|' }) => {
	const formattedDate = format(date, formatDate);
	const formattedTime = format(date, formatTime);

	return `${formattedDate} ${separator} ${formattedTime}`;
};

export default formatDateTime;
