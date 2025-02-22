import { L, FeatureGroup, Marker } from '@cogoport/maps';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const ICON_MAPPING = {
	origin      : GLOBAL_CONSTANTS.image_url.origin_map_pointer,
	destination : GLOBAL_CONSTANTS.image_url.destination_map_pointer,
};
const ICON_SIZE = [24, 24];
const ICON_ANCHOR = [12.75, 12.75];
function Pointer({ lat = '', lng = '', type = '' }) {
	const icon = L.icon({
		iconUrl    : ICON_MAPPING[type],
		iconSize   : ICON_SIZE,
		iconAnchor : ICON_ANCHOR,
	});

	return (
		<FeatureGroup key={lat}>
			<Marker position={[lat, lng]} icon={icon} />
		</FeatureGroup>
	);
}

export default Pointer;
