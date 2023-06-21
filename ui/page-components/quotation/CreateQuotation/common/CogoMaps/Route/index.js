import { FeatureGroup, Polyline } from '@cogoport/maps';

const pathOptions = { color: '#00008B' };

function Route({ positions, map }) {
	return (
		<FeatureGroup
			eventHandlers={{
				layeradd: (e) => {
					if (map) map?.flyToBounds(e.target?.getBounds(), { maxZoom: 1 });
				},
			}}
		>
			<Polyline
				key={JSON.stringify(positions)}
				positions={positions}
				pathOptions={pathOptions}
			/>
		</FeatureGroup>
	);
}
export default Route;
