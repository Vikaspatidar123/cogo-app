import { L, Marker, FeatureGroup } from '@cogoport/maps';

import iconUrl from '../../../utils/iconUrl.json';

function Pointer({ lat = '', lng = '', map }) {
	const icon = L.icon({
		iconUrl    : iconUrl.origin,
		iconSize   : [24, 24],
		iconAnchor : [12.75, 12.75],
	});
	return (
		<FeatureGroup
			key={lat}
			eventHandlers={{ add: (e) => map?.panInsideBounds(e.target.getBounds()) }}
		>
			<Marker position={[lat, lng]} icon={icon} />
		</FeatureGroup>
	);
}

export default Pointer;
