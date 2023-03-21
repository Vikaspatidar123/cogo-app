import { L, Marker, FeatureGroup } from '@cogoport/maps';

function Pointer({ lat = '', lng = '', iconSvg, map }) {
	const icon = L.icon({
		iconUrl    : iconSvg,
		iconSize   : [24, 24],
		iconAnchor : [12.75, 12.75],
	});
	console.log(lat, 'lat', lng);
	return (
		<FeatureGroup key={lat} eventHandlers={{ add: (e) => map?.panInsideBound(e.target.getBounds) }}>
			<Marker position={[lat, lng]} icon={icon} />
		</FeatureGroup>
	);
}

export default Pointer;
