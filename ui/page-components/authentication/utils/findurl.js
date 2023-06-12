/* eslint-disable no-undef */
import redirections from './redirections';

import redirect from '@/ui/commons/utils/redirect';

const findurl = async ({ item, isServer, res, org_id, branch_id }) => {
	const configs = redirections(item);

	const path = `/${org_id}/${branch_id}${configs?.href || configs?.as}`;

	await redirect({
		isServer,
		res,
		path,
	});
	return { path };
};
export default findurl;
