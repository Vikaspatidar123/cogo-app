/* eslint-disable no-undef */
import { Router } from '@/packages/next';

const redirect = ({
	isServer, res, path, hardRedirect, locale,
}) => {
	if (isServer) {
		res.writeHead(302, {
			Location: path,
		});
		res.end();
	} else if (hardRedirect) {
		window.location.href = path;
	} else {
		Router.push(path, path, { locale });
	}
};

export default redirect;
