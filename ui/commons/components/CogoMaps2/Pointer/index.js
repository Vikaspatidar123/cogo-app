import { L, FeatureGroup, Marker } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';

import styles from '../styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const DIV_ICON_SIZE = [12, 12];
const ICONS_SIZE = [24, 24];
const ICONS_ANCHOR = [12.75, 22.75];

const ICON_MAPPING = {
	origin      : GLOBAL_CONSTANTS.image_url.origin_map_pointer,
	destination : GLOBAL_CONSTANTS.image_url.destination_map_pointer,
};

const getIcon = ({ isDivIcon, className, src }) => {
	if (isDivIcon) {
		return L.divIcon({
			className : `${styles.div_icon} ${styles[className]}`,
			iconSize  : DIV_ICON_SIZE,
		});
	}

	return L.icon({
		iconUrl    : ICON_MAPPING[src],
		iconSize   : ICONS_SIZE,
		iconAnchor : ICONS_ANCHOR,
	});
};

function Pointer({ position = [], src = 'origin', isDivIcon = false, className, waypoints = [] }) {
	const icon = getIcon({ isDivIcon, src, className });

	return (
		<FeatureGroup>
			{isEmpty(waypoints)
				? <Marker position={position || []} icon={icon} />
				: (
					waypoints.map((waypt) => (
						<Marker key={waypt?.location_id} position={waypt?.coordinates} icon={icon} />
					))
				)}
		</FeatureGroup>
	);
}

export default Pointer;
