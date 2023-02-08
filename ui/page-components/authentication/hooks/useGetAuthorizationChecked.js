/* eslint-disable no-undef */
import { useEffect, useState } from 'react';

import redirections from '../utils/redirections';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

const UNAUTHENTICATED_PATHS = [
	'/login',
	'/signup',
	'/forgot-password',
	'/reset-password/[id]',
	'/verify-email/[id]',
	'/accept-invite/[id]',
	'/verify-auto-sign-up-email/[id]',
];

const useGetAuthorizationChecked = () => {
	const [sessionInitialized, setSessionInitialized] = useState(false);
	const {
		route, push,
	} = useRouter();
	const { profile } = useSelector((s) => s);
	const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.includes(route);
	const isProfilePresent = Object.keys(profile).length !== 0;
	const {
		organization = {}, organizations = [], branch, organization_set,
	} = profile || {};
	const org_id = organization?.id || organizations[0]?.id;
	const branch_id = branch?.id || organizations[0]?.branches?.[0]?.id;

	useEffect(() => {
		(async () => {
			if (!sessionInitialized) {
				if (isProfilePresent && (isUnauthenticatedPath || route === '/')) {
					const configs = redirections(profile);
					if (configs?.href?.includes('/v2')) {
						const replaceHref = configs?.href?.replace('/v2', '');
						const replaceAs = configs?.as?.replace('/v2', '');
						await push(replaceHref, replaceAs);
					}
					if (!configs?.href?.includes('/v2')) {
						window.location.href = `/${org_id}/${branch_id}${configs.as || configs.href} `;
					} else {
						await push('/', '/');
					}
				} else if (!isProfilePresent && (!isUnauthenticatedPath || route === '/')) {
					await push('/login');
				}
				setSessionInitialized(true);
			}
		})();
	}, [isProfilePresent, isUnauthenticatedPath, sessionInitialized, profile, branch_id, route]);

	return { sessionInitialized, setSessionInitialized };
};

export default useGetAuthorizationChecked;
