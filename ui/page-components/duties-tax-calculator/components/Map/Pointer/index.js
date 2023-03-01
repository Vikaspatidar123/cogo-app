import { L, Marker, FeatureGroup } from '@cogoport/maps';

function Pointer({
	lat = '', lng = '', map, iconSvg,
}) {
	const icon = L.icon({
		iconUrl    : iconSvg,
		iconSize   : [24, 24],
		iconAnchor : [12.75, 12.75],
	});
	return (
		<>
			<FeatureGroup
				key={lat}
				eventHandlers={{ add: (e) => map?.panInsideBounds(e.target.getBounds()) }}
			>
				<Marker position={[lat, lng]} icon={icon} />
			</FeatureGroup>
			{/* eventHandlers={{
						add: (e) => map?.setView(e.target.getLatLng(), 3.5, { animate: true }),
					}} */}
		</>
	);
}

export default Pointer;
