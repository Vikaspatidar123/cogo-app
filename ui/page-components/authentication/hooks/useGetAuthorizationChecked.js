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
	'/get-started',
];

const useGetAuthorizationChecked = () => {
	const [sessionInitialized, setSessionInitialized] = useState(false);
	const {
		route, push,
	} = useRouter();

	const { profile, general } = useSelector((s) => s);
	console.log('asPrefix', general);
	const { asPrefix } = general || {}
	const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.includes(route);
	const isProfilePresent = Object.keys(profile).length !== 0;
	console.log(isProfilePresent, 'isProfilePresent', profile);
	const { organization = {}, organizations = [], organization_set } = profile || {};
	const org_id = organization?.id || organizations[0]?.id;
	useEffect(() => {
		(async () => {
			if (!sessionInitialized) {
				if (organization_set && (isUnauthenticatedPath || route === '/')) {
					window.location.href = asPrefix;
				} else if (!organization_set && (!isUnauthenticatedPath || route === '/')) {
					window.location.href = '/login';
				}
				setSessionInitialized(true);
			}
		})();
	}, [isProfilePresent, isUnauthenticatedPath, sessionInitialized, asPrefix]);

	return { sessionInitialized, setSessionInitialized };
};

export default useGetAuthorizationChecked;
