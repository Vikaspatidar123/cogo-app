import { getCookie } from '@cogoport/utils';

const COUNTRY_CODE_LOCALE = {
	VN      : 'vi-VN',
	CN      : 'zh-CN',
	ID      : 'id-ID',
	TH      : 'th-TH',
	SG      : 'en-SG',
	default : 'en-US',
};

const TYPE = {
	decimal: {
		style: 'decimal',
	},
};

const getOptions = ({ formatType }) => {
	if (!Array.isArray(formatType)) {
		return TYPE[formatType] || {};
	}

	let options = {};
	formatType.forEach((_) => {
		options = {
			...options,
			...(TYPE[_] || {}),
		};
	});

	return options;
};

const getFormattedCurrency = ({ amount, formatType }) => {
	let COUNTRY_CODE;
	if (typeof document !== 'undefined') {
		COUNTRY_CODE = getCookie('location');
	}

	const locale = COUNTRY_CODE_LOCALE[COUNTRY_CODE] || COUNTRY_CODE_LOCALE.default;

	return Intl.NumberFormat(
		locale,
		getOptions({ formatType }),
	).format(amount);
};

export default getFormattedCurrency;
