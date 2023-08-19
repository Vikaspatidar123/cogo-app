import { L } from '@cogoport/maps';
import { memo, useEffect } from 'react';

import { getAnimationOptions, getMapDivIcon } from './utils';

import { iconMappings } from '@/ui/commons/configurations/color-options';

function AnimatedRoute({ map, activeRoute }) {
	const { routes = [] } = activeRoute || {};
	const { lineString = [] } = routes[0] || {};
	const main_route = lineString?.filter(({ type }) => type === activeRoute?.main_service)?.[0]?.path;
	let flipIcon = main_route && main_route.slice(-1)[0][1] - main_route[0][1] < 0;
	flipIcon = activeRoute?.main_service === 'ocean' ? !flipIcon : flipIcon;

	const duration = 15000;
	const delay = 2000;

	const sequence = lineString?.map(({ path = [], type }) => (path.length > 1
		? L.motion.polyline(...getAnimationOptions(
			{
				path,
				duration,
				icon: getMapDivIcon(
					iconMappings[type],
					`marker_label ${type} ${flipIcon && 'flip_icon'}`,
				),
			},
		)) : [])).flat();

	const sqGroup = L.motion.seq(sequence);

	useEffect(() => {
		let animationInterval;

		if (map) {
			sqGroup?.addTo(map);
			sqGroup?.motionStart();
			animationInterval = setInterval(() => {
				sqGroup?.motionStart();
			}, duration + delay);
		}

		return () => {
			if (map) {
				map?.removeLayer(sqGroup);
			}
			clearTimeout(animationInterval);
		};
	}, [map, activeRoute, sqGroup]);

	return (
		null);
}

export default memo(AnimatedRoute);
