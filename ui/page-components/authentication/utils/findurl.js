import redirections from './redirections';

import redirect from '@/ui/commons/utils/redirect';

const findurl = async ({
	item, isServer, res, org_id, branch_id, redirectPath,
}) => {
	const configs = redirections(item);
	console.log(redirectPath, 'redirectPath');
	if (redirectPath) {
		console.log(redirectPath, 'redirectPathredirectPath');
		window.location.href = redirectPath;
	}
	if (configs?.href?.includes('/v2')) {
		const replaceHref = configs?.href?.replace('/v2', '');
		const replaceAs = configs?.as?.replace('/v2', '');
		const path = `/v2/${org_id}/${branch_id}${replaceHref || replaceAs}`;
		await redirect({
			isServer,
			res,
			path,
		});
		return { path };
	}
	const path = `/app/${org_id}/${branch_id}/importer-exporter${configs?.href || configs?.as}`;
	redirect({
		isServer,
		res,
		path,
	});
	return { path };
};
export default findurl;
