import { useState, useEffect } from 'react';

function getWindowDimensions() {
	const width = typeof window !== 'undefined' && window.innerWidth;
	const height = typeof window !== 'undefined' && window.innerHeight;

	return {
		width,
		height,
	};
}
export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return windowDimensions;
};
