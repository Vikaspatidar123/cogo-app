// import { IcMLocation } from '@cogoport/icons-react';
import { CogoMaps, L, Marker, Tooltip } from '@cogoport/maps';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { tooltip } from '../styles.module.css';

import Routes from './Routes';
import styles from './styles.module.css';

// import { useGetUserLocationContent } from '@/ui/commons/components/UserLocationContentContext';

const baseLayer = [
	{
		name    : 'Cogo Maps',
		url     : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		minZoom : 0,
		maxZoom : 15,
	},
];

const getIcon = (className, icon) => new L.Icon({
	iconUrl    : icon,
	iconSize   : [24, 24],
	iconAnchor : [12.25, 24.5],
	className,
});

const CENTER_LONGITUDE = 20.5937;
const CENTER_LATITUDE = 78.9629;

const maxBounds = [
	[-90, -Infinity],
	[90, Infinity],
];

function Maps({ data, loading, isMobile }) {
	const router = useRouter();
	const { id } = router.query;

	const [map, setmap] = useState(null);
	const [isMoving, setIsMoving] = useState(false);
	const [bounds, setBounds] = useState(maxBounds);

	// const {
	// 	spotSearch_red_location,
	// 	spotSearch_black_location,
	// } = useGetUserLocationContent();

	const red_marker = 'red';
	const black_marker = 'black';

	const all_routes = data?.all_routes;
	const center = [CENTER_LONGITUDE, CENTER_LATITUDE];

	const newTab = id === 'sea' ? 'ocean' : id;
	const allRoutes = all_routes?.filter(({ main_service }) => main_service === newTab);
	const lineString = 	allRoutes?.[0]?.routes?.[0]?.lineString;
	const journeyData = (lineString || [])
		.flatMap((line) => line.waypoints || [])
		.filter((_, i, waypts) => i === 0 || i === waypts.length - 1);

	useEffect(() => {
		const timeout = setTimeout(() => { if (map)map.invalidateSize(true); }, 135);
		return () => {
			clearTimeout(timeout);
		};
	}, [map]);

	useEffect(() => {
		if (map && bounds instanceof L.LatLngBounds) {
			map.flyToBounds(bounds, { maxZoom: 7 });
		}
	}, [bounds, map]);

	useEffect(() => {
		if (map) {
			map.on('zoomstart', () => { setIsMoving(true); });
			map.on('zoomend', () => { setIsMoving(false); });
			map.on('moveend', () => { setIsMoving(false); });
		}
	}, [map]);

	const height = !isMobile ? 'calc(100vh)' : '309px';
	const position = isMobile ? 'bottomright' : 'topright';

	return (
		<CogoMaps
			center={center}
			style={{ height, width: '100%' }}
			zoom={4}
			baseLayer={baseLayer}
			setMap={setmap}
			maxBounds={maxBounds}
			maxZoom={12}
			zoomPosition={position}
			layersPosition={position}
			scaleControl={!isMobile}
		>
			{journeyData.map(({
				display_name = '', coordinates :pos,
			}, idx) => (pos) && (
				<Marker
					key={`${display_name}_${JSON.stringify(pos)}`}
					position={pos}
					icon={idx === 0
						? getIcon(styles.marker_red_icon, red_marker)
						: getIcon(styles.marker_black_icon, black_marker)}
				>
					<Tooltip offset={[0, -20]}>
						<div className={tooltip}>{(display_name).split(',')[0]}</div>
					</Tooltip>
				</Marker>
			))}
			{(all_routes?.length > 0) && (
				<Routes
					map={map}
					routes={all_routes}
					setBounds={setBounds}
					isMoving={isMoving}
					loading={loading}
				/>
			)}
		</CogoMaps>
	);
}

export default Maps;
