/* eslint-disable react-hooks/exhaustive-deps */
import { L, useMap, FeatureGroup, Marker } from '@cogoport/maps';
import { useEffect } from 'react';

function Pointer({ point, lat = '', lng = '', iconSvg = 'location', showTrack }) {
	const map = useMap();

	const icon = L.icon({
		iconUrl    : `https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/${iconSvg}.svg`,
		iconSize   : [24, 24],
		iconAnchor : [12.75, 12.75],
	});
	const clickHandler = () => {
		showTrack(point);
	};
	useEffect(() => {
		L.marker([lat, lng], { icon }).on('click', clickHandler).addTo(map);
	}, [map]);
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
