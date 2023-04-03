import { CogoMaps, L } from '@cogoport/maps';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Pointer = dynamic(() => import('../CogoMaps/Pointer'), {
	ssr: false,
});

const Route = dynamic(() => import('../CogoMaps/Route'), {
	ssr: false,
});

const version = 1;
const styleName = [
	{ title: 'Normal Day', style: 'normal.day' },
	{ title: 'Normal Day Transit', style: 'normal.day.transit' },
	{ title: 'Pedestrian Day', style: 'pedestrian.day' },
];

const LAYER = styleName.map(({ title, style }) => ({
	name : title,
	url  : `https://${version}.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/
	${style}/{z}/{x}/{y}/512/png8?apiKey=Yi1Uv0y9PgZ24UVbBYY7-fRwaz-DPdmGWdIddQW0A9g&mv=in337jp128&ppi=320`,
	attribution: '',
}));
const lineOptions = { color: 'green' };
const remainigRoutelineOptions = { color: 'blue' };
const center = { lat: '28.679079', lng: '77.069710' };

function MapComp({
	completedPoints,
	remainingPoints,
	curvePoints,
	isMobile = false,
	lengthDependency = '',
	currentMilestone,
	height = '600px',
	vesselLocationLat,
	vesselLocationLang,
	markers = [],
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
				`${
				<a
					href="https://www.cogoport.com/en/terms-and-conditions/"
					target="_blank"
					rel="noreferrer"
				>
					{' '}
					&copy; Cogoport T&C
				</a> 
				 <a href="https://www.cogoport.com/en/privacy-policy/" target="_blank" 
				 rel="noreferrer" > 
				 Privacy & data protection</a> 
	| <a
	href="https://leafletjs.com/"
	target="_blank"
	rel="noreferrer"
       >
	Leaflet

</a>}`,
			);
		}
	}, [bounds, map]);

	return (
		<CogoMaps
			key={JSON.stringify(curvePoints)}
			style={{ height: `${heightVariable}`, width: '100%' }}
			baseLayer={LAYER}
			zoom={2.9}
			center={center}
			setMap={setMap}
			maxBoundsViscosity={1}
		>
			{markers?.length > 0
				&& markers?.map((m) => (
					<Pointer lat={m.lat} lng={m.lng} iconSvg="point" map={map} />
				))}

			{curvePoints?.length > 0 && (
				<Pointer
					lat={curvePoints[0]?.lat}
					lng={curvePoints[0]?.lng}
					iconSvg="source"
					map={map}
				/>
			)}

			{currentMilestone && (
				<Pointer
					lat={currentMilestone?.lat}
					lng={currentMilestone?.lng}
					iconSvg="current-location"
					map={map}
				/>
			)}
			{completedPoints.length > 0 && (
				<Route positions={completedPoints} map={map} pathOptions={lineOptions} />
			)}
			{remainingPoints?.length > 0 && (
				<Route
					positions={remainingPoints}
					map={map}
					pathOptions={remainigRoutelineOptions}
				/>
			)}
			{remainingPoints?.length === 0 && curvePoints?.length > 0 && (
				<Route positions={curvePoints} map={map} pathOptions={lineOptions} />
			)}
			{curvePoints?.length > 0 && (
				<Pointer
					lat={curvePoints[curvePointLength - 1]?.lat}
					lng={curvePoints[curvePointLength - 1]?.lng}
					iconSvg="destination-icon"
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
