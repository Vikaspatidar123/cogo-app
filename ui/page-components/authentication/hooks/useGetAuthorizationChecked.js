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
		route,
	} = useRouter();

	const { profile } = useSelector((s) => s);
	const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.includes(route);
	const isProfilePresent = Object.keys(profile).length !== 0;
	const { organization = {}, organizations = [], branch } = profile || {};
	const org_id = organization?.id || organizations[0]?.id;
	const branch_id = branch?.id || organizations[0]?.branches?.[0]?.id;

	useEffect(() => {
		(async () => {
			if (!sessionInitialized) {
				if (isProfilePresent && (isUnauthenticatedPath || route === '/')) {
					const configs = redirections(profile);
					window.location.href = `/${org_id}/${branch_id}${configs.as || configs.href}`;
				} else if (!isProfilePresent && (!isUnauthenticatedPath || route === '/')) {
					window.location.href = '/login';
				}
				setSessionInitialized(true);
			}
		})();
	}, [isProfilePresent, isUnauthenticatedPath, sessionInitialized, profile, branch_id, route, org_id]);

	return { sessionInitialized, setSessionInitialized };
};

export default useGetAuthorizationChecked;
