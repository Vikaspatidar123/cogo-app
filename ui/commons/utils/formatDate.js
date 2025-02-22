import { format } from '@cogoport/utils';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const formatTypeFunMapping = {
	date({ date, dateFormat, utcInput }) {
		let formatDate = 'dd/MM/yyyy';
		if (dateFormat in GLOBAL_CONSTANTS.formats.date) {
			formatDate = dateFormat;
		}
		return format(date, formatDate, null, utcInput);
	},
	time({ date, timeFormat, utcInput }) {
		let formatTime = 'hh:mm aaa';
		if (timeFormat in GLOBAL_CONSTANTS.formats.time) {
			formatTime = timeFormat;
		}

		return format(date, formatTime, null, utcInput);
	},
	dateTime({ date, timeFormat, dateFormat, separator = ' | ' }) {
		const formattedDate = this.date({ date, dateFormat });
		const formattedTime = this.time({ date, timeFormat });

		return `${formattedDate}${separator}${formattedTime}`;
	},
};

/**
 *  @typedef {Object}             [arguments]
 *  @property {date}     		  [date]
 *  @property {String}            [formatType - date|time|dateTime]
 *  @property {String}            [dateFormat]
 *  @property {String}            [timeFormat]
 *  @property {String}            [separator]
 *  @property {Boolean}           [utcInput]
 *  @property {Boolean}           [showIsoFormat]
 */
const formatDate = (params) => {
	const { date, formatType } = params;
	if (!date) {
		return null;
	}

	let type = 'date';
	if (formatType in formatTypeFunMapping) {
		type = formatType;
	}

	return formatTypeFunMapping[type](params);
};

export default formatDate;
