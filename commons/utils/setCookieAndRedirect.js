import { setCookie } from '@cogoport/utils';

const setCookieAndRedirect = (token, ctx, redirectPath = undefined) => {
	const { res, isServer } = ctx || {};
	setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token, 2000, ctx);

	if (isServer) {
		res.redirect(redirectPath || '/app');
	} else {
		window.location.href = redirectPath || '/app';
	}
};

export default setCookieAndRedirect;
