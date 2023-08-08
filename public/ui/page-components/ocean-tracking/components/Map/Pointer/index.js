import { L, useMap } from '@cogoport/maps';
import { useCallback, useEffect } from 'react';

function Pointer({ point, lat = '', lng = '', iconSvg = 'location', showTrack, type }) {
	const map = useMap();
	const clickHandler = useCallback(() => {
		showTrack(point, type);
	}, [point, showTrack, type]);
	useEffect(() => {
		if (!map || !lat || !lng) return;
		const icon = L.icon({
			iconUrl    : `https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/${iconSvg}.svg`,
			iconSize   : [24, 24],
			iconAnchor : [12.75, 12.75],
		});
		L.marker([lat, lng], { icon }).on('click', clickHandler).addTo(map);
	}, [clickHandler, iconSvg, lat, lng, map]);
	return null;
}

export default Pointer;
