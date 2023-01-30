const getModifiedRoutes = ({
	href, as, organizationId = null, withPrefix,
}) => {
	const hrefPrefix = '/[org_id]';
	const asPrefix = `/${organizationId || ''}`;

	let newHref = href;
	let newAs = as;
	if (withPrefix) {
		if (!as) {
			newHref = `${asPrefix || ''}${newHref}`;
			newAs = null;
		} else {
			newHref = `${hrefPrefix || ''}${href}`;
			newAs = `${asPrefix || ''}${as}`;
		}
	}

	return { newHref, newAs };
};

export default getModifiedRoutes;
