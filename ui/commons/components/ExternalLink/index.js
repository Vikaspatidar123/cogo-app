import { snakeCase } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React from 'react';

import GLOBAL_CONSTANTS from '../../constants/globals';

function ExternalLink({ scope, label, page = 'login', section = 'public_page', className }) {
	const router = useRouter();
	const { locale, pathname } = router;

	const queryMapping = {
		utm_source : 'public_page',
		utm_medium : `${snakeCase(pathname.split('/').pop())}_${section}`,
	};

	const queryString = Object.entries(queryMapping).map((utm) => utm.join('=')).join('&');

	const condition_locale = locale === 'default' ? '' : `/${locale}`;

	const domain = GLOBAL_CONSTANTS.SCOPE_DOMAIN_MAPPING[scope] || GLOBAL_CONSTANTS.SCOPE_DOMAIN_MAPPING.app;

	const url = `${domain}${condition_locale}/${page}?${queryString}`;

	return (
		<a href={url} target="_blank" className={className} rel="noreferrer nofollow">
			{label}
		</a>
	);
}

export default ExternalLink;
