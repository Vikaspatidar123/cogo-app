import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const urlRegex = new RegExp(GLOBAL_CONSTANTS.patterns.WEBSITE_URL);
const endWithStarSpace = new RegExp(
	GLOBAL_CONSTANTS.patterns.ENDS_WITH_STAR_SPACE,
);
const endWithStarChar = new RegExp(GLOBAL_CONSTANTS.patterns.ENDS_WITH_STAR_CHAR);

const TO_BE_BOLD_TEXT_INDEX = 0;

const replaceStarSpace = (txt = '') => txt
	.split(endWithStarSpace)
	.map((str, i) => {
		if (i === 0) {
			return ` <strong key={${str}}>${str.substring(0, txt.length - 1)}</strong> `;
		}
		return str;
	})
	.join('');

const replaceStarChar = (txt = '') => {
	if (txt.match(GLOBAL_CONSTANTS.patterns.ASTERISK).length !== 1) {
		return txt;
	}
	return txt
		.split('*')
		.map((str, i) => {
			if (i === TO_BE_BOLD_TEXT_INDEX) {
				return ` <strong key={${str}}>${str.substring(0, txt.length - 1)}</strong>`;
			}
			return str;
		})
		.join('');
};

const addStrongTag = (txt = '') => {
	const boldText = ` ${txt} `
		.split(' *')
		.map((part, index) => {
			if (index === 0) return part;
			if (endWithStarSpace.test(part)) {
				return replaceStarSpace(part);
			}
			if (endWithStarChar.test(part)) {
				return replaceStarChar(part);
			}
			return ` *${part}`;
		})
		.join('');
	return boldText.substring(1, boldText.length - 1);
};

const renderBoldText = (txt = '') => (txt?.split('<br>') || []).map((part) => addStrongTag(part)).join('<br>');

const renderURLText = (txt = '') => (txt?.split(' ') || [])
	.map((part) => (urlRegex.test(part)
		? `<a href=${part} target="_blank" key={${part}}>${part} </a>`
		: `${part} `))
	.join(' ');

const renderText = (txt = '') => {
	let newTxt = renderURLText(txt);
	newTxt = renderBoldText(newTxt);
	return newTxt;
};
export default renderText;
