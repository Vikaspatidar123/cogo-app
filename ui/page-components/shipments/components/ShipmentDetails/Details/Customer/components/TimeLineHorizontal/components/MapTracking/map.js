import { CogoMaps, L } from '@cogoport/maps';
import { useState, useEffect } from 'react';

import Pointer from './Pointer';
import Route from './Route';

const LAYER = [
	{
		name        : 'COGO MAPS',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution : '',
	},
];

const lineOptions = { color: '#f37166', weight: 2 };
const remainingRoutelineOptions = { color: '#1867D2', weight: 2 };
const center = { lat: '28.679079', lng: '77.069710' };

function MapComp({
	completedPoints,
	remainingPoints,
	curvePoints,
	isMobile = false,
	lengthDependency = '',
	height = '600px',
	vesselLocationLat,
	vesselLocationLang,
	markers = [],
	centerMap = {},
}) {
	const [map, setMap] = useState();
	const corner1 = L.latLng(-90, -200);
	const corner2 = L.latLng(90, 200);
	const bounds = L.latLngBounds(corner1, corner2);
	const curvePointLength = curvePoints.length;
	const heightVariable = isMobile ? '300px' : height;

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (map) map.invalidateSize(true);
		}, 200);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, lengthDependency]);

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(
				// eslint-disable-next-line max-len
				'<a href="https://www.cogoport.com/en/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a> | <a href="https://www.cogoport.com/en/privacy-policy/" target="_blank">Privacy & data protection</a> | <a href="https://leafletjs.com/" target="_blank" >Leaflet</a>',
			);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map]);
	const center_map = Object.keys(centerMap).length > 0 ? centerMap : center;
	return (
		<CogoMaps
			style={{ height: `${heightVariable}`, width: '100%' }}
			baseLayer={LAYER}
			zoom={2.9}
			minZoom={1.5}
			center={center_map}
			setMap={setMap}
			maxBoundsViscosity={1}
			maxZoom={12}
		>
			{markers?.length > 0
				&& markers?.map((m) => (
					<Pointer lat={m.lat} lng={m.lng} iconSvg="point" map={map} />
				))}

			{curvePoints?.length > 0 && (
				<Pointer
					lat={curvePoints[0]?.lat}
					lng={curvePoints[0]?.lng}
					iconSvg="sourceIcon"
					map={map}
				/>
			)}

			{completedPoints.length > 0 && (
				<Route
					positions={completedPoints}
					map={map}
					pathOptions={lineOptions}
				/>
			)}
			{remainingPoints?.length > 0 && (
				<Route
					positions={remainingPoints}
					map={map}
					pathOptions={remainingRoutelineOptions}
				/>
			)}
			{remainingPoints?.length === 0 && curvePoints?.length > 0 && (
				<Route positions={curvePoints} map={map} pathOptions={lineOptions} />
			)}
			{curvePoints?.length > 0 && (
				<Pointer
					lat={curvePoints[curvePointLength - 1]?.lat}
					lng={curvePoints[curvePointLength - 1]?.lng}
					iconSvg="map_destination"
					map={map}
				/>
			)}
			{typeof vesselLocationLat !== 'undefined' && (
				<Pointer
					lat={vesselLocationLat}
					lng={vesselLocationLang}
					iconSvg="eta"
					map={map}
				/>
			)}
		</CogoMaps>
	);
}

export default MapComp;
