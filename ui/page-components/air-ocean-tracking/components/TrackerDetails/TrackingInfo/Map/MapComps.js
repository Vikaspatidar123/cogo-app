import { CogoMaps, L } from '@cogoport/maps';
import { useState, useEffect } from 'react';

import { CENTER, LAYER, MAP_ATTRIBUTE } from '../../../../constant/mapConstant';

import Pointer from './Pointer';
import Route from './Route';

const corner1 = L.latLng(-90, -200);
const corner2 = L.latLng(90, 200);
const bounds = L.latLngBounds(corner1, corner2);

function MapComps({ height = '500px', pointsArr = [], type = 'ocean' }) {
	const [map, setMap] = useState();
	const pointsArrLength = pointsArr.length;

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(MAP_ATTRIBUTE);
		}
	}, [map]);

	return (
		<CogoMaps
			style={{ height: `${height}`, width: '100%' }}
			setMap={setMap}
			center={CENTER}
			baseLayer={LAYER}
			zoom={2.9}
			minZoom={2}
			maxZoom={12}
			maxBoundsViscosity={1}
		>
			{pointsArrLength > 0 && (
				<Pointer lat={pointsArr[0]?.lat} lng={pointsArr[0]?.lng} iconSvg="map_origin" />
			)}
			<Route positions={pointsArr} map={map} transportMode={type} />
			{pointsArrLength > 0 && (
				<Pointer
					lat={pointsArr[pointsArrLength - 1]?.lat}
					lng={pointsArr[pointsArrLength - 1]?.lng}
					iconSvg="map_destination"
				/>
			)}
		</CogoMaps>
	);
}

export default MapComps;
