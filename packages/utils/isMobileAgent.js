const isMobile = (userAgent) => {
	try {
		const isAndroid = Boolean(userAgent.match(/Android/i));
		const isIos = Boolean(userAgent.match(/iphone|iPad|iPod/i));
		const isOpera = Boolean(userAgent.match(/Opera Mini/i));
		const isWindows = Boolean(userAgent.match(/IEMobile/i));

		return Boolean(isAndroid || isIos || isOpera || isWindows);
	} catch (e) {
		console.log(e);
	}
	return false;
};

module.exports = isMobile;
