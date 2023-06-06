const { isEmpty } = require('@cogoport/utils');

export const checkMobileInput = (obj = {}) => (
	obj.mobile_number

		&& !isEmpty(obj.mobile_number)

		&& 'number' in obj.mobile_number

		&& obj.mobile_number.number !== ''

		&& 'country_code' in obj.mobile_number

		&& obj.mobile_number.country_code !== ''
);
