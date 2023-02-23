import { CogoMaps, L } from '@cogoport/maps';
import { useState, useEffect } from 'react';

import { DestinationIcon, SourceIcon } from '../../configuration/icon-configuration';

import Pointer from './Pointer';
import Route from './Route';

const LAYER = [
	{
		name        : 'COGO MAPS',
		url         : 'https://maps.dev.cogoport.io/tiles/{z}/{x}/{y}.png',
		attribution : '',
	},
];

const center = { lat: '28.679079', lng: '77.069710' };
function MapComp({
	plotPoints, isMobile = false, tradeEngineRespLength, ...rest
}) {
	const { origin = {} } = rest || {};
	const [map, setMap] = useState();
	const corner1 = L.latLng(-90, -200);
	const corner2 = L.latLng(90, 200);
	const bounds = L.latLngBounds(corner1, corner2);
	const pointLength = plotPoints.length;
	const heightVariable = isMobile ? '350px' : '600px';

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
	}, [map]);

	return (
		<CogoMaps
			style={{ height: `${heightVariable}`, width: '100%' }}
			baseLayer={LAYER}
			zoom={3.6}
			center={center}
			setMap={setMap}
			maxBoundsViscosity={1}
		>
			{origin?.latitude && (
				<Pointer lat={origin?.latitude} lng={origin?.longitude} map={map} iconSvg={SourceIcon} />
			)}

			{pointLength > 0 && <Route positions={plotPoints} map={map} />}
			{pointLength > 0 && (
				<Pointer
					lat={plotPoints[pointLength - 1]?.lat}
					lng={plotPoints[pointLength - 1]?.lng}
					map={map}
					iconSvg={DestinationIcon}
				/>
			)}
		</CogoMaps>
	);
}

export default MapComp;
