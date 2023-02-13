import { isEmpty, deleteCookie } from '@cogoport/utils';

import getorganizationApi from '../hooks/getOrganisation';
import getUserData from '../hooks/getUserData';

import findurl from './findurl';

import redirect from '@/commons/utils/redirect';
import projectNavigationMappings from '@/packages/navigation-configs/config/navigation-mapping';
import PUBLIC_PATHS from '@/packages/navigation-configs/config/public-paths';
import getAuthParam from '@/packages/request/helpers/get-auth-params';
import { getCookie } from '@/packages/request/helpers/getCookieFromCtx';
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
	req,
	query,
	isServer,
	routeConfig,
	pathname,
	res,
}) => {
	let asPrefix = '';
	let user_data = null;
	if (!routeConfig || (asPath || '').includes('_next')) {
		return { asPrefix };
	}
	const { routes, accountTypeConfig } = routeConfig || {};
	const valid_account_types = (routes[asPath] || {}).account_types
		|| (routes[pathname] || {}).account_types;

	if (
		valid_account_types
		&& valid_account_types.includes(accountTypeConfig.public_route.prefix)
	) {
		return { asPrefix };
	}

	// for short urls
	if (asPath.includes('/url/')) {
		return { asPrefix };
	}
	if (PUBLIC_PATHS.includes(asPath) || PUBLIC_PATHS.includes(pathname)) {
		return { asPrefix };
	}
	const isUnauthenticated = PUBLIC_PATHS.includes(asPath) || PUBLIC_PATHS.includes(pathname);
	const token = getCookie('cogo-auth-token', { req });
	// for short urls
	if (token) {
		user_data = await getUserData({
			store,
			isServer,
			req,
			routeConfig,
			pathname,
		});
	} else {
		if (isUnauthenticated) {
			return { asPrefix };
		}
		redirect({ isServer, res, path: `/v2/login?redirectPath=${asPath}` });
		return { asPrefix };
	}

	if (isEmpty(user_data)) {
		if (!isServer) {
			deleteCookie('cogo-auth-token', null, { req });
		}

		if (isUnauthenticated) {
			return { asPrefix };
		}
		redirect({ isServer, res, path: `/v2/login?redirectPath=${asPath}` });
		return { asPrefix };
	}

	if (isUnauthenticated) {
		if (
			(user_data.organizations || []).length === 0
			|| user_data.name === null
		) {
			redirect({ isServer, res, path: '/v2/get-started' });
			return { asPrefix };
		}
		const org = user_data.organizations[0];
		const branch = org?.branches?.[0];

		const newPath = `/v2/${org?.id}/${branch?.id}`;

		redirect({
			isServer,
			res,
			path: newPath,
		});
		return { asPrefix };
	}

	//  || asPath.includes('/kyc')
	if (asPath.includes('/get-started')) {
		return { asPrefix };
	}

	// Redirect old paths to branch id
	const allStrings = asPath?.split('/');
	const actual_org_id = allStrings?.[1];
	const current_org = user_data?.organizations.find(
		(org) => org?.id === actual_org_id,
	);
	if (!allStrings?.[3] && !isEmpty(user_data)) {
		const branch_id = current_org?.branches?.[0]?.id || user_data?.organizations?.[0]?.branches?.[0]?.id;
		const org_id = user_data?.organizations?.[0]?.id;
		asPrefix = `/v2/${org_id}/${branch_id}/dashboard`;
		findurl({
			item: user_data, asPrefix, isServer, res, org_id, branch_id,
		});
		return {
			asPrefix,
			query: {
				org_id,
				branch_id,
			},
		};
	}

	// For 404 and error pages - pathname is _error
	if (pathname.includes('/404')) {
		const asPathArr = asPath.split('/') || [];
		const reqPath = asPathArr.filter((item, i) => i < 5).join('/');
		const errOrgId = asPathArr.length > 2 ? asPathArr[2] : null;
		const current_organization = user_data.organizations.find(
			(org) => org.id === errOrgId,
		);
		const org = user_data.organizations[0] || {};
		const orgId = org.id;
		const orgBranchId = org?.branches?.[0]?.id;
		if (isEmpty(current_organization)) {
			asPrefix = `/v2/${orgId}/${orgBranchId}/dashboard`;
			// findurl({
			// 	item: user_data, asPrefix, isServer, res, org_id: orgId, branch_id: orgBranchId,
			// });
			return {
				asPrefix,
				query: {
					org_id: orgId,
					branch_id: orgBranchId,
				},
			};
		}

		return {
			asPrefix: reqPath,
			query:
				asPathArr.length >= 5
					? {
						org_id: asPathArr[2],
						branch_id: asPathArr[3],
					}
					: {},
		};
	}
	const { org_id, branch_id } = query || {};
	let current_organization = user_data.organizations.find(
		(org) => org.id === org_id,
	);
	const org = user_data.organizations[0];
	const orgBranchId = user_data.organizations[0]?.branches?.[0]?.id;
	if (isEmpty(current_organization) || asPath.includes('/v2/select-account')) {
		const newPath = `/v2/${org?.id}/${orgBranchId}`;
		findurl({
			item: user_data, asPrefix, isServer, res, org_id: org?.id, orgBranchId,
		});
		return {
			asPrefix: newPath,
			query: {
				org_id: org?.id,
				account_type: org?.account_type,
				branch_id: orgBranchId,
			},
		};
	}
	if ((user_data.organization || {}).id === current_organization?.id) {
		current_organization = user_data.organization;
	}

	// asPrefix = `/v2/${org_id}/${branch_id}/dashboard`;

	const defaultRoute = `${asPrefix}`;
	if (isEmpty(current_organization.country || {})) {
		const getOrgResponse = await getOrganization(req, query);
		if (!isEmpty(getOrgResponse)) {
			const actualBranches = (user_data.organizations || []).find(
				(orgValue) => orgValue?.id === getOrgResponse.id,
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
			// pathPrefix,
			asPrefix,
			defaultRoute,
			organization_set: !isEmpty(current_organization),
			organization: current_organization,
			branch: current_branch,
			authorizationparameters: getAuthParam(
				user_data?.permissions_navigations,
				routeConfig,
				pathname,
				projectNavigationMappings,
			),
		}),
	);

	/* Authorization Logic End */
	// if (!asPath.startsWith(asPrefix)) {
	// 	redirect({ isServer, res, path: defaultRoute });
	// }

	return { asPrefix };
};

export default handleAuthentication;
