const { format } = require('@cogoport/utils');

const formatDateTime = ({ date, dateFormat, timeFormat, separator = '|' }) => {
	const formattedDate = format(date, dateFormat);
	const formattedTime = format(date, timeFormat);

	return `${formattedDate} ${separator} ${formattedTime}`;
};

const formatDate = ({ date, dateFormat }) => {
	if (!date) {
		return null;
	}
	return format(date, dateFormat);
};

export { formatDateTime, formatDate };
