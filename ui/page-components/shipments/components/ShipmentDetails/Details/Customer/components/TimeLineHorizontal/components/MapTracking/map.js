import { CogoMaps, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
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

const MAX_ZOOM = 12;
const MIN_ZOOM = 1.5;
const ZOOM = 2.9;
const MAX_VISCOCITY = 1;

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
			zoom={ZOOM}
			minZoom={MIN_ZOOM}
			center={center_map}
			setMap={setMap}
			maxBoundsViscosity={MAX_VISCOCITY}
			maxZoom={MAX_ZOOM}
		>
			{!isEmpty(markers) ? markers?.map((m) => (
				<Pointer lat={m.lat} lng={m.lng} iconSvg="point" map={map} />
			)) : null}

			{!isEmpty(curvePoints) ? (
				<Pointer
					lat={curvePoints[0]?.lat}
					lng={curvePoints[0]?.lng}
					iconSvg="sourceIcon"
					map={map}
				/>
			) : null}

			{!isEmpty(completedPoints) ? (
				<Route
					positions={completedPoints}
					map={map}
					pathOptions={lineOptions}
				/>
			) : null}
			{!isEmpty(remainingPoints) ? (
				<Route
					positions={remainingPoints}
					map={map}
					pathOptions={remainingRoutelineOptions}
				/>
			) : null}

			{isEmpty(remainingPoints) && !isEmpty(curvePoints) ? (
				<Route positions={curvePoints} map={map} pathOptions={lineOptions} />
			) : null}

			{!isEmpty(curvePoints) ? (
				<Pointer
					lat={curvePoints[curvePointLength - 1]?.lat}
					lng={curvePoints[curvePointLength - 1]?.lng}
					iconSvg="map_destination"
					map={map}
				/>
			) : null}

			{typeof vesselLocationLat !== 'undefined' ? (
				<Pointer
					lat={vesselLocationLat}
					lng={vesselLocationLang}
					iconSvg="eta"
					map={map}
				/>
			) : null}
		</CogoMaps>
	);
}

export default MapComp;
