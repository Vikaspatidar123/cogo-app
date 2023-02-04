
import { isEmpty } from '@cogoport/utils';
import getorganizationApi from '../hooks/getOrganisation';
import getUserData from '../hooks/getUserData';
import { getCookie } from '@/packages/request/getCookieFromCtx';
import { setProfileStoreState } from '@/packages/store/store/profile';

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
    isServer,
}) => {
    let asPrefix;

    let user_data = null;

    const token = getCookie('cogo-app-token', { req });
    const allStrings = asPath?.split('/');
    const actual_org_id = allStrings?.[1];
    // for short urls
    const { org_id, branch_id } = query || {};
    const isUnauthenticated = org_id || branch_id
    if (token) {
        user_data = await getUserData({
            store,
            req,
            isServer,
        });
    } else {
        asPrefix = '/login';
        return { asPrefix };
    }

    if (isEmpty(user_data || {})) {
        asPrefix = '/login';
    }

    if (
        (user_data?.organizations || [])?.length === 0
        || user_data?.name === null
    ) {
        asPrefix = '/get-started';
        return { asPrefix };
    }

    const current_org = user_data?.organizations.find(
        (org) => org?.id === actual_org_id,
    );

    if (current_org) {
        const branch_id = current_org?.branches?.[0]?.id;
        console.log(branch_id, 'branch_id')
        asPrefix = `/${actual_org_id}/${branch_id}/dashboard`;
    }

    let current_organization = user_data?.organizations.find(
        (org) => org.id === org_id,
    );
    if ((user_data?.organization || {}).id === current_organization?.id) {
        current_organization = user_data?.organization;
    }


    if (isEmpty(current_organization) || asPath.includes('/select-account')) {
        const org = user_data.organizations[0];
        const orgBranchId = user_data.organizations[0]?.branches?.[0]?.id;
        console.log(orgBranchId, 'orgBranchIdorgBranchId')
        const isContractCreated = org?.is_contract_created;
        const asPrefix = `/${org?.id}/${orgBranchId}/dashboard`;
        return {
            asPrefix,
            query: {
                org_id: org?.id,
                branch_id: orgBranchId,
            },
        };
    }




    if (isEmpty(current_organization?.country || {})) {
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
    // if (current_branch) {
    //     const id = org_id || user_data?.organizations?.[0]?.id;
    //     asPrefix = `/${id}/${current_branch?.id}/dashboard`;
    // } 

    await store.dispatch(
        setProfileStoreState({
            ...user_data,
            asPrefix,
            organization_set: !isEmpty(current_organization),
            organization: current_organization,
            branch: current_branch,

        }),
    );

    return { asPrefix };
};

export default handleAuthentication;
