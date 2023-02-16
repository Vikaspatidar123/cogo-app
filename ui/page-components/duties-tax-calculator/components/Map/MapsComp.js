import { CogoMaps } from '@cogoport/maps';
import { useState } from 'react';

import Pointer from './Pointer';
import Route from './Route';

const version = 1;
const styleName = [
	{ title: 'Normal Day', style: 'normal.day' },
	{ title: 'Normal Day Transit', style: 'normal.day.transit' },
	{ title: 'Pedestrian Day', style: 'pedestrian.day' },
];

const LAYER = styleName.map(({ title, style }) => ({
	name        : title,
	// eslint-disable-next-line max-len
	url         : `https://${version}.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?apiKey=Yi1Uv0y9PgZ24UVbBYY7-fRwaz-DPdmGWdIddQW0A9g&mv=in337jp128&ppi=320`,
	attribution : '',
}));

const center = { lat: '28.679079', lng: '77.069710' };
function MapComp({
	plotPoints, origin = {}, destination = {}, isMobile = false,
}) {
	const [map, setMap] = useState();

	const pointLength = plotPoints.length;

	const heightVariable = isMobile ? '350px' : '600px';
	return (
		<CogoMaps
			key={JSON.stringify(plotPoints)}
			style={{ height: `${heightVariable}`, width: '100%' }}
			baseLayer={LAYER}
			zoom={3.6}
			center={center}
			setMap={setMap}
		>
			<Pointer lat={origin.latitude} lng={origin?.longitude} />
			<Route positions={plotPoints} map={map} />
			{pointLength > 0 && (
				<Pointer lat={destination.latitude} lng={destination?.longitude} />
			)}
		</CogoMaps>
	);
}

export default MapComp;
