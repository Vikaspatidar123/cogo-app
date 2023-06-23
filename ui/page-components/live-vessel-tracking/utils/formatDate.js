import { format } from '@cogoport/utils';

const formatDateTime = ({ date, dateFormat, timeFormat, separator = '|' }) => {
	const formattedDate = format(date, dateFormat);
	const formattedTime = format(date, timeFormat);

	return `${formattedDate} ${separator} ${formattedTime}`;
};

export default formatDateTime;
