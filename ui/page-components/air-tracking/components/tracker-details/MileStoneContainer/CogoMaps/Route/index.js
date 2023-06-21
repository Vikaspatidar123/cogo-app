import { FeatureGroup, Polyline } from '@cogoport/maps';

const pathOptions = { color: '#f37166', weight: 2 };

function Route({ positions, map }) {
	return (
		<FeatureGroup
			eventHandlers={{
				layeradd: (e) => {
					if (map) map?.flyToBounds(e.target?.getBounds(), { maxZoom: 5 });
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
