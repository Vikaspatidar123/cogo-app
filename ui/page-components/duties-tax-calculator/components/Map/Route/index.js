import { useEffect } from 'react';
import { L } from '@cogoport/maps';

const pathOptions = { color: '#00008B' };

const Route = ({ positions, map }) => {
	useEffect(() => {
		if (!map || !positions) return;
		const line = L.polyline(positions, { ...pathOptions });
		line.addTo(map);
		if (line.getBounds()?._northEast) {
			map.fitBounds(line.getBounds());
		}
	}, [map]);
	return null;
};
export default Route;
