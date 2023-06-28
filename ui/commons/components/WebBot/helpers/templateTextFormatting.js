import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const urlRegex = new RegExp(GLOBAL_CONSTANTS.regex.website_url);
const endWithStarSpace = new RegExp(
	GLOBAL_CONSTANTS.regex.ends_with_star_space_regex,
);
const endWithStarChar = new RegExp(GLOBAL_CONSTANTS.regex.ends_with_star_char);

const replaceStarSpace = (txt = '') => txt
	.split(endWithStarSpace)
	.map((str, i) => {
		if (i === 0) {
			return ` <strong>${str.substring(0, txt.length - 1)}</strong> `;
		}
		return str;
	})
	.join('');

const replaceStarChar = (txt = '') => {
	if (txt.match(/\*/g).length === 1) {
		return txt
			.split('*')
			.map((str, i) => {
				if (i === 0) {
					return ` <strong>${str.substring(0, txt.length - 1)}</strong>`;
				}
				return str;
			})
			.join('');
	}
	return txt;
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
		? `<a href=${part} target="_blank">${part} </a>`
		: `${part} `))
	.join(' ');

const renderText = (txt = '') => {
	let newTxt = renderURLText(txt);
	newTxt = renderBoldText(newTxt);
	return newTxt;
};
export default renderText;
