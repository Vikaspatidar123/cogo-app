import { useRouter } from 'next/router';

import { useSelector } from '@/packages/store';

export const useCustomRouter = () => {
	const router = useRouter();

	const { pathPrefix, asPrefix, locale } = useSelector((s) => s.general) || {};

	const getNewRouteFunction = (
		routeFunction,
		href,
		as = null,
		withPrefix = true,
	) => {
		const newHref = withPrefix ? `${pathPrefix || ''}${href}` : href;
		const newAs = withPrefix ? `${asPrefix || ''}${as || href}` : as || href;

		router[routeFunction](newHref, newAs, { locale });
	};

	return {
		...router,
		push: (...pushVars) => {
			getNewRouteFunction('push', ...pushVars);
		},
		replace: (...pushVars) => {
			getNewRouteFunction('replace', ...pushVars);
		},
	};
};

export default useCustomRouter;
