import { CogoMaps, L } from '@cogoport/maps';
import { useState, useEffect } from 'react';

import { CENTER, LAYER, MAP_ATTRIBUTE } from '../../../../constant/mapConstant';

const corner1 = L.latLng(-90, -200);
const corner2 = L.latLng(90, 200);
const bounds = L.latLngBounds(corner1, corner2);

function MapComps({ height = '500px' }) {
	const [map, setMap] = useState();

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(MAP_ATTRIBUTE);
		}
	}, [map]);

	return (
		<CogoMaps
			style={{ height: `${height}`, width: '100%', borderRadius: '8px' }}
			setMap={setMap}
			center={CENTER}
			baseLayer={LAYER}
			zoom={2.9}
			maxZoom={12}
		/>
	);
}

export default MapComps;
