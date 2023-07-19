import GLOBAL_CONSTANTS from '../constants/globals';

const ITERATOR = 1;

function rangeOfChars(start, stop) {
	const startCharCode = start.charCodeAt(GLOBAL_CONSTANTS.zeroth_index);
	const endCharCode = stop.charCodeAt(GLOBAL_CONSTANTS.zeroth_index);

	const result = [];

	for (let charCode = startCharCode; charCode <= endCharCode; charCode += ITERATOR) {
		result.push(String.fromCharCode(charCode));
	}

	return result;
}

const getValidPasswordMapping = ({ t }) => ({
	lowercase: {
		characters : rangeOfChars('a', 'z'),
		message    : t('common:password_validator_rule_message_1'),
	},
	uppercase: {
		characters : rangeOfChars('A', 'Z'),
		message    : t('common:password_validator_rule_message_2'),
	},
	digit: {
		characters : rangeOfChars('0', '9'),
		message    : t('common:password_validator_rule_message_3'),
	},
	special: {
		characters : '!@#$%^&*'.split(''),
		message    : t('common:password_validator_rule_message_4'),
	},
	minLength: {
		length  : 8,
		message : t('common:password_validator_rule_message_5'),
	},
});

export default getValidPasswordMapping;
