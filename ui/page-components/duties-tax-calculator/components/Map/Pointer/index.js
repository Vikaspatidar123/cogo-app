import { useEffect } from 'react';
import { L, useMap } from '@cogoport/maps';

const Pointer = ({ lat = '', lng = '' }) => {
	const map = useMap();
	useEffect(() => {
		if (!map || !lat || !lng) return;
		const icon = L.icon({
			iconUrl: '/mapIcon/location.svg',
			iconSize: [24, 24],
			iconAnchor: [12.75, 12.75],
		});
		L.marker([lat, lng], { icon }).addTo(map);
	}, [map]);
	return null;
};

export default Pointer;
