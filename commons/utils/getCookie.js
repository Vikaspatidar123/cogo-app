const getCookie = (name, ctx) => {
	try {
		const { req } = ctx || {};
		const token = typeof window === 'undefined'
			? (((req || {}).headers || {}).cookie || '').match(new RegExp(`${name}=([^;]+)`)) || []
			: document.cookie.match(new RegExp(`${name}=([^;]+)`)) || [];
		return token[1];
	} catch (e) {
		console.log(e);
	}
};

module.exports = getCookie;
