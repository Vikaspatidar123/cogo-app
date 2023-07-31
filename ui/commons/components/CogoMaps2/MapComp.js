import { CogoMaps, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import Pointer from './Pointer';
import Route from './Route';

import { LAYER, CENTER, MAP_ATTRIBUTE } from '@/ui/commons/constants/mapConstant';

const corner1 = L.latLng(-90, -350);
const corner2 = L.latLng(90, 350);
const bounds = L.latLngBounds(corner1, corner2);

function MapComp({
	height = '600px',
	zoom = '3.6',
	style,
	transportMode,
	curvePoints = {},
}) {
	const { origin: startPt = [], destination: endPt = [], routes = [] } = curvePoints || {};
	const [map, setMap] = useState(null);

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(MAP_ATTRIBUTE);
		}
	}, [map]);

	useEffect(() => {
		const flyBound = L.latLngBounds([startPt, endPt]);

		if (!isEmpty(flyBound) && flyBound instanceof L.LatLngBounds) {
			map?.flyToBounds(flyBound);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map, startPt, endPt, transportMode]);

	return (
		<CogoMaps
			style={{ height, width: '100%', ...style }}
			baseLayer={LAYER}
			zoom={zoom}
			center={CENTER}
			setMap={setMap}
			zoomControl={false}
			maxBoundsViscosity={1}
			maxZoom={12}
		>
			{(routes || []).map((routeInfo) => {
				const { lineString = [] } = routeInfo || {};

				return lineString.map((route) => (
					<>
						<Pointer waypoints={route?.waypoints} className={route?.type} isDivIcon />
						<Route path={route?.path} transportMode={route?.type} map={map} />
					</>

				));
			})}
			{!isEmpty(startPt) ? <Pointer position={startPt} src="origin" /> : null}
			{!isEmpty(endPt) ?	<Pointer position={endPt} src="destination" /> : null}
		</CogoMaps>
	);
}

export default MapComp;
