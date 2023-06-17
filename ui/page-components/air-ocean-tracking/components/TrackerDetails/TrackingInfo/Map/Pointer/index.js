import { L, FeatureGroup, Marker } from '@cogoport/maps';

function Pointer({ lat = 0, lng = 0, iconSvg = 'location' }) {
	const icon = L.icon({
		iconUrl    : `https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/${iconSvg}.svg`,
		iconSize   : [24, 24],
		iconAnchor : [12.75, 12.75],
	});

	return (
		<FeatureGroup key={lat}>
			<Marker position={[lat, lng]} icon={icon} />
		</FeatureGroup>
	);
}

export default Pointer;
