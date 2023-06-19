/* eslint-disable no-undef */
const processString = (str = '') => {
	if (str.length > 0) {
		return str;
	}
	return null;
};

const loadScript = (url) => new Promise((resolve, reject) => {
	const script = window.document.createElement('script');
	script.src = url;
	script.async = true;

	script.addEventListener('load', () => resolve(script), false);
	script.addEventListener('error', () => reject(script), false);

	if (typeof window !== 'undefined') window.document.body.appendChild(script);
});

export { processString, loadScript };
