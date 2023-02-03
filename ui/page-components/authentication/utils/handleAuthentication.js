/* eslint-disable prefer-destructuring */

import { deleteCookie, isEmpty } from '@cogoport/utils';

import getorganizationApi from '../hooks/getOrganisation';
import getUserData from '../hooks/getUserData';

import getCookie from '@/commons/utils/getCookie';
import { setProfileStoreState } from '@/packages/store/store/profile';
import Router from "next/router";
// const redirect = ({ isServer, res, path }) => {
//     if (isServer) {
//         window.location.href = path
//     }
//     // } else {
//     window.location.href = path
//     // }
// };
const redirect = ({ isServer, res, path }) => {
    if (isServer) {
        res.redirect(path);
    } else {
        console.log(path, 'path')
        Router.replace('/');
    }
};
const getOrganization = async (req, query) => {
    let data = {};
    const { response } = await getorganizationApi({ req, query });
    if (!isEmpty(response)) {
        data = response.data;
    }
    return data;
};

const handleAuthentication = async ({
    asPath,
    store,
    res,
    req,
    query,
    pathPrefix,
    pathname,
    isServer
}) => {
    let asPrefix;

    let user_data = null;
    const token = getCookie('cogo-app-token', { req });
    const { general, asPrefix: pre } = store.getState() || {};
    const {
        query: storeQuery,
    } = general || {};
    // user_data = await getUserData({
    //     store,
    //     isServer,
    //     req,
    // });
    // const allStrings = asPath?.split('/');
    // const actual_org_id = allStrings?.[1];
    const allStrings = asPath?.split('/');
    const actual_org_id = allStrings?.[2];
    // if (isEmpty(query || {})) {
    //     redirect({ isServer, path: asPrefix })
    // }
    // for short urls
    if (token) {
        user_data = await getUserData({
            store,
            req,
            isServer,
        });
    }
    if (isEmpty(user_data)) {
        // if (!isServer) {
        //     deleteCookie('cogo-app-token', null, { req });
        // }
        asPrefix = `/login`;
        return { asPrefix };
    }

    if (
        (user_data.organizations || []).length === 0 ||
        user_data.name === null
    ) {
        asPrefix = '/app/get-started';
        return { asPrefix };
    }


    // Redirect old paths to branch id

    const current_org = user_data?.organizations.find(
        (org) => org?.id === actual_org_id,
    );
    if (allStrings?.[3] === 'importer-exporter' && current_org) {
        const branch_id = current_org?.branches?.[0]?.id;

        asPrefix = `/app/${actual_org_id}/${branch_id}/${allStrings?.[3]}`;

        const restPath = allStrings.filter((item, i) => i > 3).join('/');

        redirect({ isServer, res, path: `${asPrefix}/${restPath}` });
        return {
            asPrefix,
            query: {
                org_id: actual_org_id,
                account_type: allStrings?.[3],
                branch_id,
            },
        };
    }

    const { org_id, branch_id } = query || storeQuery || {};
    let current_organization = user_data?.organizations.find(
        (org) => org.id === org_id,
    );
    if ((user_data?.organization || {}).id === current_organization?.id) {
        current_organization = user_data?.organization;
    }
    if (org_id || user_data?.organizations?.[0]?.id) {
        const id = org_id || user_data?.organizations?.[0]?.id;
        asPrefix = `/${id}/dashboard`;
    }
    if (org_id && isEmpty(current_organization || {})) {
        const getOrgResponse = await getOrganization(req, query);
        if (!isEmpty(getOrgResponse)) {
            const actualBranches = (user_data.organizations || []).find(
                (org) => org?.id === getOrgResponse.id,
            )?.branches;
            current_organization = {
                ...getOrgResponse,
                branches: actualBranches || getOrgResponse.branches,
                allBranches: getOrgResponse.branches,
            };
        }
    }
    const current_branch = (current_organization?.branches || []).find(
        (branch) => branch.id === branch_id,
    ) || current_organization?.branches?.[0];
    await store.dispatch(
        setProfileStoreState({
            ...user_data,
            asPrefix,
            organization_set: !isEmpty(current_organization) || org_id || user_data?.organizations?.[0]?.id,
            organization: current_organization,
            branch: current_branch,

        }),
    );

    return { asPrefix };
};

export default handleAuthentication;
