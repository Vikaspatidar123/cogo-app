import { L } from '@cogoport/maps';
import { useEffect } from 'react';

function Route({ positions, map, pathOptions }) {
	useEffect(() => {
		if (!map || !positions) return;
		const line = L.polyline(positions, { ...pathOptions });
		line.addTo(map);
	}, [map, pathOptions, positions]);
	return null;
}
export default Route;
