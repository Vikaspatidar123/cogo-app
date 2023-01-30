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

	const { ...profile } = useSelector((s) => s.profile);

	const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.includes(route);
	const isProfilePresent = Object.keys(profile).length !== 0;

	useEffect(() => {
		(async () => {
			if (!sessionInitialized) {
				if (isProfilePresent && (isUnauthenticatedPath || route === '/')) {
					const configs = redirections(profile);
					if (configs?.href) {
						// if (configs?.href?.includes('v1')) {
						// 	window.location.href = `/v1/${profile?.partner?.id}${configs.href.replace('/v1', '')}`;
						// } else {
						await push(configs?.href);
						// }
					}
				} else if (!isProfilePresent && (!isUnauthenticatedPath || route === '/')) {
					window.location.href = '/login';
				}
				setSessionInitialized(true);
			}
		})();
	}, [isProfilePresent, isUnauthenticatedPath, sessionInitialized]);

	return { sessionInitialized, setSessionInitialized };
};

export default useGetAuthorizationChecked;
