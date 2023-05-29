import { CogoMaps } from '@cogoport/maps';
import { useState } from 'react';

import Pointer from './Pointer';
// import Route from './Route';

const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : 'https://api.cogoport.com/cogo-tiles/{z}/{x}/{y}.png',
		attribution : '',
	},
];

const center = { lat: '28.679079', lng: '77.069710' };
function MapComp() {
	const [map, setMap] = useState();
	return (
		<CogoMaps
			style={{ width: '100%', height: '60vh' }}
			baseLayer={LAYER}
			zoom={3}
			minZoom={2}
			center={center}
			setMap={setMap}
			maxBoundsViscosity={1}
			maxZoom={12}
		>
			<Pointer map={map} />
			{/* <Route map={map} /> */}
		</CogoMaps>
	);
}
export default MapComp;
