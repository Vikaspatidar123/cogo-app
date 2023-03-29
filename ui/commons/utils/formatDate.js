import { format } from '@cogoport/utils';

import getGeoConstants from '@/ui/commons/constants/geo';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

// const geoConstants = getGeoConstants();

const formatTypeFunMapping = {
	date({ date, dateFormat }) {
		let formatDate = 'dd/MM/yyyy';
		if (dateFormat in GLOBAL_CONSTANTS.formats.date) {
			formatDate = dateFormat;
		}

		return format(date, formatDate);
	},
	time({ date, timeFormat }) {
		let formatTime = 'hh:mm aaa';
		if (timeFormat in GLOBAL_CONSTANTS.formats.time) {
			formatTime = timeFormat;
		}

		return format(date, formatTime);
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
