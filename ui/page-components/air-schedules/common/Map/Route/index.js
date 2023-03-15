import { L } from '@cogoport/maps';
import { useEffect } from 'react';

const pathOptions = { color: '#00008B' };

function Route({ positions, map }) {
	useEffect(() => {
		if (!map || !positions) return;
		const line = L.polyline(positions, { ...pathOptions });
		line.addTo(map);
		// eslint-disable-next-line no-underscore-dangle
		if (line.getBounds()?._northEast) {
			map.fitBounds(line.getBounds());
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map]);
	return null;
}
export default Route;
