import { format } from '@cogoport/utils';

import getGeoConstants from '@/ui/commons/constants/geo';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const geoConstants = getGeoConstants();

const formatTypeFunMapping = {
	date({ date, dateFormat, utcInput }) {
		let formatDate = geoConstants?.formats.date.default;
		if (dateFormat in GLOBAL_CONSTANTS.formats.date) {
			formatDate = dateFormat;
		}

		return format(date, formatDate, null, utcInput);
	},
	time({ date, timeFormat, utcInput }) {
		let formatTime = geoConstants?.formats.time['12hrs'];
		if (timeFormat in GLOBAL_CONSTANTS.formats.time) {
			formatTime = timeFormat;
		}

		return format(date, formatTime, null, utcInput);
	},
	dateTime({ date, timeFormat, dateFormat, separator = ' | ', utcInput }) {
		const formattedDate = this.date({ date, dateFormat, utcInput });
		const formattedTime = this.time({ date, timeFormat, utcInput });

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
	// if (showIsoFormat) {

	// 	const formattedDate = (input, formatString) => {
	// 		if (!input) {
	// 			return new Date();
	// 		}
	// 		if (input instanceof Date) {
	// 			return input;
	// 		}
	// 		if (typeof input === 'string') {
	// 			if (!formatString) {
	// 				return parseISO(input);
	// 			}
	// 			return parse(input, formatString, new Date());
	// 		}
	// 		if (typeof input === 'number') {
	// 			return nativeToDate(input);
	// 		}
	// 		throw new Error('Not a valid input type');
	// 	};
	// 	return formatISO(formattedDate(date));
	// }
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
