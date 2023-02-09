import redirections from './redirections';

import redirect from '@/commons/utils/redirect';

const findurl = async ({
    item, isServer, res, org_id, branch_id,
}) => {
    const configs = redirections(item);
    console.log(configs, 'configs');
    if (configs?.href?.includes('/v2')) {
        const replaceHref = configs?.href?.replace('/v2', '');
        const replaceAs = configs?.as?.replace('/v2', '');
        await redirect({
            isServer,
            res,
            path: `/v2/${org_id}/${branch_id}${replaceHref || replaceAs}`,
        });
    } else {
        redirect({
            isServer,
            res,
            path: `/app/${org_id}/${branch_id}/importer-exporter${configs?.href || configs?.as}`,
        });
    }
};
export default findurl;
