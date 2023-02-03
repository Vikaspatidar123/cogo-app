import { useRouter as useRouterNext } from 'next/router';
import { useMemo } from 'react';

import getModifiedRoutes from '../utils/getModifiedRoutes';

import { useSelector } from '@/packages/store';

export const useRouter = () => {
	const { profile, general } = useSelector((s) => s);
	const { organization } = profile || {}
	const { asPrefix } = general || {}
	const allStrings = asPrefix?.split('/');
	const organizationId = organization?.id || allStrings[1]
	// const organizationId = useSelector((s) => s?.profile?.organization?.id);


	console.log(organizationId, 'organizationId');
	const routerNext = useRouterNext();
	const router = useMemo(() => ({
		...routerNext,
		push: (href, as = null, routerOptions = {}) => {
			const { withPrefix = true, ...options } = routerOptions;
			const { newHref, newAs } = getModifiedRoutes({
				href, as, organizationId, withPrefix,
			});
			return routerNext.push(newHref, newAs, options);
		},
		replace: (href, as = null, routerOptions = {}) => {
			const { withPrefix, ...options } = routerOptions;
			const { newHref, newAs } = getModifiedRoutes({
				href, as, organizationId, withPrefix,
			});
			return routerNext.push(newHref, newAs, options);
		},
	}), [organizationId, routerNext]);

	return router;
};

export default useRouter;
