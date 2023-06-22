import { Polyline, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef } from 'react';

const COLOR_MAPING = {
	air   : '#ee3225b5',
	ocean : '#00008B',
};
function Route({ positions, map, transportMode }) {
	const pathOptions = { color: COLOR_MAPING[transportMode] };

	const ref = useRef(null);

	useEffect(() => {
		const line = ref.current;
		if (map && line) {
			const bounds = line.getBounds();
			if (!isEmpty(bounds) && bounds instanceof L.LatLngBounds) {
				map?.flyToBounds(bounds);
			}
		}
	}, [ref, map]);
	return (

		<Polyline
			ref={ref}
			positions={positions}
			pathOptions={pathOptions}
		/>
	);
}
export default Route;
