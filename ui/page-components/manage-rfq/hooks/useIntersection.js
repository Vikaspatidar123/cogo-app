import { useState, useEffect, useMemo } from 'react';

const useIsInViewport = (ref, rootMargin) => {
	const [isIntersecting, setIsIntersecting] = useState(false);

	const observer = useMemo(() => {
		let observerBool = null;
		if (typeof window !== 'undefined') {
			// eslint-disable-next-line no-undef
			observerBool = new IntersectionObserver(
				([entry]) => {
					setIsIntersecting(entry.isIntersecting);
				},
				{ rootMargin },
			);
			console.log(observerBool, 'observerBool');
			return observerBool;
		}
		return false;
	}, [rootMargin]);

	useEffect(() => {
		observer.observe(ref?.current);
		return () => {
			observer.disconnect();
		};
	}, [ref, observer]);

	return isIntersecting;
};

export default useIsInViewport;
