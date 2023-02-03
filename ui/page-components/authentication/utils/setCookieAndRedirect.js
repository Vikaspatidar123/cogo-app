import { setCookie } from '@cogoport/utils';

const setCookieAndRedirect = (token, ctx, redirectPath = undefined) => {
	const { res, isServer } = ctx || {};
	setCookie('cogo-auth-token', token, 2000, ctx);

	if (isServer) {
		res.redirect(redirectPath || '/app');
	} else {
		window.location.href = redirectPath || '/app';
	}
};

export default setCookieAndRedirect;
