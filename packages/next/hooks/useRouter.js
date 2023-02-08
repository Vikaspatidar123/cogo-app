import { useRouter as useRouterNext } from 'next/router';
import { useMemo } from 'react';

import { useSelector } from '../../store';
import getModifiedRoutes from '../utils/getModifiedRoutes';

export const useRouter = () => {
	const { profile, general } = useSelector((s) => s);
	const { organization, branch } = profile || {};
	const { query } = general || {};
	const organizationId = organization?.id || query?.org_id;
	const branchId = branch?.id || query?.branch_id;
	// const organizationId = useSelector((s) => s?.profile?.organization?.id);
	const routerNext = useRouterNext();
	const router = useMemo(() => ({
		...routerNext,
		push: (href, as = null, routerOptions = {}) => {
			const { withPrefix = true, ...options } = routerOptions;
			const { newHref, newAs } = getModifiedRoutes({
				href, as, organizationId, branchId, withPrefix,
			});
			return routerNext.push(newHref, newAs, options);
		},
		replace: (href, as = null, routerOptions = {}) => {
			const { withPrefix, ...options } = routerOptions;
			const { newHref, newAs } = getModifiedRoutes({
				href, as, organizationId, branchId, withPrefix,
			});
			return routerNext.push(newHref, newAs, options);
		},
	}), [branchId, organizationId, routerNext]);

	return router;
};

export default useRouter;
