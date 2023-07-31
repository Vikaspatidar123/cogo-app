import { L, FeatureGroup, Marker } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';

import styles from '../styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const ICON_MAPPING = {
	origin      : GLOBAL_CONSTANTS.image_url.origin_map_pointer,
	destination : GLOBAL_CONSTANTS.image_url.destination_map_pointer,
};

const getIcon = ({ isDivIcon, className, src }) => {
	if (isDivIcon) {
		return L.divIcon({
			className : `${styles.div_icon} ${styles[className]}`,
			iconSize  : [12, 12],
		});
	}

	return L.icon({
		iconUrl    : ICON_MAPPING[src],
		iconSize   : [24, 24],
		iconAnchor : [12.75, 22.75],
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
						<Marker position={waypt?.coordinates} icon={icon} />
					))
				)}
		</FeatureGroup>
	);
}

export default Pointer;
