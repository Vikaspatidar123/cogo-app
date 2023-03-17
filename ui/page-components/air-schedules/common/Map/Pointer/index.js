import { L, useMap } from '@cogoport/maps';
import { useEffect } from 'react';

function Pointer({ lat = '', lng = '', iconSvg }) {
	const map = useMap();
	useEffect(() => {
		if (!map || !lat || !lng) return;
		const icon = L.icon({
			iconUrl    : iconSvg,
			iconSize   : [24, 24],
			iconAnchor : [12.75, 12.75],
		});
		L.marker([lat, lng], { icon }).addTo(map);
	}, [iconSvg, lat, lng, map]);
	return null;
}

export default Pointer;
