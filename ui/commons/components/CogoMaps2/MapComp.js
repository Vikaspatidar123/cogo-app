import { CogoMaps, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import Pointer from './Pointer';
import Route from './Route';

import {
	LAYER, CENTER, MAP_ATTRIBUTE, BOTTOM_LEFT_LAT, BOTTOM_LEFT_LNG,
	TOP_RIGHT_LAT, TOP_RIGHT_LNG,
} from '@/ui/commons/constants/mapConstant';

const corner1 = L.latLng(BOTTOM_LEFT_LAT, BOTTOM_LEFT_LNG);
const corner2 = L.latLng(TOP_RIGHT_LAT, TOP_RIGHT_LNG);

const bounds = L.latLngBounds(corner1, corner2);

const MAX_BOUNDS_VISCOSITY = 1;
const MAX_ZOOM = 12;

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
			maxBoundsViscosity={MAX_BOUNDS_VISCOSITY}
			maxZoom={MAX_ZOOM}
		>
			{(routes || []).map((routeInfo) => {
				const { lineString = [] } = routeInfo || {};

				return lineString.map((route) => (
					<React.Fragment key={route?.id}>
						<Pointer waypoints={route?.waypoints} className={route?.type} isDivIcon />
						<Route path={route?.path} transportMode={route?.type} map={map} />
					</React.Fragment>
				));
			})}

			{!isEmpty(startPt) ? <Pointer position={startPt} src="origin" /> : null}

			{!isEmpty(endPt) ?	<Pointer position={endPt} src="destination" /> : null}
		</CogoMaps>
	);
}

export default MapComp;
