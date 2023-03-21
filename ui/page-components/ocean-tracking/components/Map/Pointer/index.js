import { L, useMap } from '@cogoport/maps';
import { useEffect } from 'react';

function Pointer({ point, lat = '', lng = '', iconSvg = 'location', showTrack, type }) {
	const map = useMap();
	const clickHandler = () => {
		showTrack(point, type);
	};
	useEffect(() => {
		if (!map || !lat || !lng) return;
		const icon = L.icon({
			iconUrl    : `https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/${iconSvg}.svg`,
			iconSize   : [24, 24],
			iconAnchor : [12.75, 12.75],
		});
		L.marker([lat, lng], { icon }).on('click', clickHandler).addTo(map);
	}, [map]);
	return null;
}

export default Pointer;
