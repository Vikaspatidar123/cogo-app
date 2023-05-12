import { CogoMaps, L } from '@cogoport/maps';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Pointer = dynamic(() => import('../../tracker-details/MileStoneContainer/CogoMaps/Pointer'), {
	ssr: false,
});

const Route = dynamic(() => import('../../tracker-details/MileStoneContainer/CogoMaps/Route'), {
	ssr: false,
});

const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : 'https://api.cogoport.com/cogo-tiles/{z}/{x}/{y}.png',
		attribution : '',
	},
];

const center = { lat: '28.679079', lng: '77.069710' };
const airPathOptions = { color: 'green' };

function MapComp({
	isMobile = false,
	lengthDependency = '',
	plotPoints = [],
	type = '',
	height = '600px',
	showTrack = () => {},
}) {
	const [map, setMap] = useState();
	const corner1 = L.latLng(-90, -200);
	const corner2 = L.latLng(90, 200);
	const bounds = L.latLngBounds(corner1, corner2);

	const heightVariable = isMobile ? '550px' : height;
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (map) map.invalidateSize(true);
		}, 200);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, lengthDependency]);

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(
				`{
				<a
					href="https://www.cogoport.com/en/terms-and-conditions/"
					target="_blank"
					rel="noreferrer"
				>
					{' '}
					&copy; Cogoport T&C
				</a> 
				 <a href="https://www.cogoport.com/en/privacy-policy/" target="_blank" 
				 rel="noreferrer" > 
				 Privacy & data protection</a> 
	| <a
	href="https://leafletjs.com/"
	target="_blank"
	rel="noreferrer"
       >
	Leaflet
</a>}`,
			);
		}
	}, [bounds, map]);
	const getLatLng = ({ route, src }) => {
		const routeLength = route?.length;

		if (src === 'origin') {
			return {
				lat : route[0]?.lat,
				lng : route[0]?.lng,
			};
		}
		if (src === 'dest') {
			return {
				lat : route[routeLength - 1]?.lat,
				lng : route[routeLength - 1]?.lng,
			};
		}
		return {
			lat  : route[Math.floor(routeLength / 2)]?.lat,
			lng  : route[Math.floor(routeLength / 2)]?.lng,
			src  : route[0]?.lng,
			dest : route[routeLength - 1]?.lng,
		};
	};

	const getIcon = ({ src, dest }) => {
		if (type === 'air') {
			if (src > dest) {
				return 'flight-icon';
			}
			return 'air-icon';
		}
		return '';
	};
	return (
		<CogoMaps
			// key={JSON.stringify(plotPoints)}
			style={{ height: `${heightVariable}`, width: '100%' }}
			baseLayer={LAYER}
			zoom={2.9}
			center={center}
			setMap={setMap}
			maxBoundsViscosity={1}
		>
			{plotPoints.map((point) => {
				const { lat, lng } = getLatLng({ route: point?.route, src: 'origin' });
				return (
					<Pointer
						point={point}
						lat={lat}
						lng={lng}
						iconSvg="source"
						showTrack={showTrack}
						type={type}
					/>
				);
			})}

			{plotPoints.map((point) => {
				const { lat, lng } = getLatLng({ route: point?.route, src: 'dest' });
				return (
					<Pointer
						point={point}
						lat={lat}
						lng={lng}
						iconSvg="destination-icon"
						showTrack={showTrack}
						type={type}
					/>
				);
			})}

			{plotPoints.map((point) => {
				const { src, dest, lat, lng } = getLatLng({ route: point?.route, src: '' });

				return (
					<Pointer
						point={point}
						lat={lat}
						lng={lng}
						iconSvg={getIcon({ src, dest })}
						showTrack={showTrack}
					/>
				);
			})}
			{plotPoints.map(({ route = [] }) => (
				<Route
					positions={route}
					map={map}
					pathOptions={airPathOptions}
				/>
			))}

		</CogoMaps>
	);
}

export default MapComp;
