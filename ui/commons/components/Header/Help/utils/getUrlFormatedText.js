import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const UrlRegex = new RegExp(GLOBAL_CONSTANTS.regex.website_url);

const getUrlFormatedText = (txt = '') => (txt.split(' ') || [])
	.map((part) => (UrlRegex.test(part)
		? `<a href=${part} target="_blank">${part} </a>`
		: `${part} `))
	.join(' ');

export default getUrlFormatedText;
