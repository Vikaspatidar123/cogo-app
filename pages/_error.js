import { number } from 'prop-types';
import React from 'react';

import { Error404 } from '@/ui/page-components/layout';

function Error({ statusCode }) {
	if (statusCode === 404) {
		return <Error404 />;
	}
	return <>helklp</>;
}

Error.getInitialProps = ({
	res, err, pathname, asPath,
}) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

	console.log(`An error ${statusCode} occurred on server ${pathname} ${asPath}`);
	return { statusCode, pathname, asPath };
};

Error.propTypes = { statusCode: number.isRequired };

export default Error;
