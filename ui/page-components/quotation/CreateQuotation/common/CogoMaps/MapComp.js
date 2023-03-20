import { CogoMaps, L } from '@cogoport/maps';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Pointer = dynamic(() => import('./Pointer'), { ssr: false });
const Route = dynamic(() => import('./Route'), { ssr: false });

const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : 'https://api.cogoport.com/cogo-tiles/{z}/{x}/{y}.png',
		attribution : '',
	},
];

const center = { lat: '28.679079', lng: '77.069710' };

function MapComp({
	plotPoints = [], zoom = 3, minZoom = 2, mapStyle = { height: '260px' },
	tradeEngineRespLength,
}) {
	const [map, setMap] = useState();

	const corner1 = L.latLng(-90, -200);
	const corner2 = L.latLng(90, 200);
	const bounds = L.latLngBounds(corner1, corner2);
	const pointLength = plotPoints.length;

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (map) map.invalidateSize(true);
		}, 200);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, tradeEngineRespLength]);

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(
				// eslint-disable-next-line max-len
				'<a href="https://www.cogoport.com/en/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a> | <a href="https://www.cogoport.com/en/privacy-policy/" target="_blank">Privacy & data protection</a> | <a href="https://leafletjs.com/" target="_blank" >Leaflet</a>',
			);
		}
	}, [bounds, map]);

	return (
		<CogoMaps
			style={{ ...mapStyle, width: '100%' }}
			baseLayer={LAYER}
			zoom={zoom}
			minZoom={minZoom}
			center={center}
			setMap={setMap}
			maxBoundsViscosity={1}
			maxZoom={12}
		>
			{pointLength > 0 && (
				<Pointer lat={plotPoints[0]?.lat} lng={plotPoints[0]?.lng} map={map} iconSvg="source" />
			)}

			{pointLength > 0 && <Route positions={plotPoints} map={map} />}
			{pointLength > 0 && (
				<Pointer
					lat={plotPoints[pointLength - 1]?.lat}
					lng={plotPoints[pointLength - 1]?.lng}
					map={map}
					iconSvg="destination-icon"
				/>
			)}
		</CogoMaps>
	);
}

export default MapComp;
