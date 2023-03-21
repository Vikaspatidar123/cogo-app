import { CogoMaps } from '@cogoport/maps';
import { useState } from 'react';

import Pointer from './Pointer';
import Route from './Route';

const DestinationIcon = 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/destinationIcon.svg';
const SourceIcon = 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/sourceIcon.svg';

const LAYER = [{
	name        : 'Cogo Maps',
	url         : 'https://api.cogoport.com/cogo-tiles/{z}/{x}/{y}.png',
	attribution : '',
}];

const center = { lat: '28.679079', lng: '77.069710' };
function MapComp({
	plotPoints,
}) {
	const [map, setMap] = useState();

	const pointLength = plotPoints.length;

	const lat = plotPoints[0];
	const lng = plotPoints[pointLength - 1];
	return (
		<CogoMaps
			key={JSON.stringify(plotPoints)}
			style={{ height: '46vh' }}
			baseLayer={LAYER}
			zoom={3.6}
			center={center}
			setMap={setMap}
		>

			<Pointer lat={lat?.lat} lng={lat?.lng} iconSvg={SourceIcon} map={map} />
			<Route positions={plotPoints} map={map} />
			{pointLength > 0 && (
				<Pointer lat={lng.lat} lng={lng?.lng} iconSvg={DestinationIcon} map={map} />
			)}
		</CogoMaps>
	);
}

export default MapComp;
