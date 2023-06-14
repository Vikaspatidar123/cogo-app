import { IcMLocation } from '@cogoport/icons-react';
import { CogoMaps, Marker, L, CircleMarker, Polyline } from '@cogoport/maps';
import * as turf from '@turf/turf';
// import { center } from '@turf/turf';
import React, { useEffect, useRef, useState } from 'react';

import { getMapDivIcon, interpolatePosition, calculateRotation } from '../../../utils/map-utils';
import path from '../../../utils/ship-path';

import IcShip from './ship.svg';
import styles from './styles.module.css';

const generateSmoothCurve = (routePath) => {
	const lineString = turf.lineString(routePath);

	const smoothLineString = turf.bezierSpline(lineString, { resolution: 25000 });
	const smoothCurve = turf.explode(smoothLineString);

	const smoothPath = smoothCurve.features.map((feature) => feature.geometry.coordinates);

	return smoothPath;
};

const shipIcon = () => getMapDivIcon(
	<IcShip className="ship-icon" />,
	'',
	[150, 150],
	[95, 55],
);

function Maps({ curIdx, prevIdx = 0, station_count }) {
	const [map, setMap] = useState(null);
	const shipRef = useRef(null);

	const bezierCurve = generateSmoothCurve(path);
	const curPath = bezierCurve.slice(prevIdx, curIdx);
	const station_coords = [...Array(station_count).keys()]
		.map((i, idx) => bezierCurve[Math.floor(bezierCurve.length / station_count) * idx]);

	useEffect(() => {
		if (map) {
			const mapBounds = new L.LatLngBounds(path);
			map.fitBounds(mapBounds);
		}
	}, [map]);

	useEffect(() => {
		let curStep = 0;

		if (map) {
			const totalSteps = curPath.length - 50;
			// eslint-disable-next-line no-underscore-dangle
			shipRef.current._icon.classList.add(styles.transition);
			const moveShip = () => {
				const startPoint = curPath[curStep];
				const endPoint = curPath[curStep + 1];

				if (!endPoint) {
					curStep = 0;
					return;
				}

				const position = interpolatePosition(startPoint, endPoint, curStep / totalSteps);
				const rotation = calculateRotation(startPoint, endPoint);

				shipRef.current.setLatLng(position);
				shipRef.current.getElement().querySelector('.ship-icon').style.rotate = `${rotation}deg`;

				curStep += 1;

				if (curStep < totalSteps) {
					requestAnimationFrame(moveShip);
				}
			};

			moveShip();
		}
	}, [map]);

	return (
		<CogoMaps
			setMap={setMap}
			style={{ width: '100vw', height: '100vh' }}
			scaleControl={false}
			zoomControl={false}
			attributionControl={false}
			center={bezierCurve[Math.floor(bezierCurve.length / 2)]}
			dragging={false}
			maxZoom={5}
			minZoom={4}
			scrollWheelZoom={false}
			doubleClickZoom={false}
		>
			<Marker icon={shipIcon()} position={path[0]} ref={shipRef} />

			{station_coords.map((pos) => (
				<CircleMarker
					center={pos}
					pane="markerPane"
					color="#D6B300"
					fillColor="#D6B300"
					opacity={1}
					fillOpacity={1}
				/>
			))}

			<Polyline
				positions={bezierCurve.slice(40)}
				pathOptions={{ color: '#CFBC93', dashArray: '12 12 12', weight: '3' }}
			/>
			{/* <Polyline
				positions={bezierCurve.slice(0, curIdx)}
				pane="markerPane"
				pathOptions={{ color: '#D6B300' }}
			/> */}
			<Marker
				position={path[path.length - 1]}
				icon={getMapDivIcon(
					<IcMLocation className={styles.location_icon} />,
				)}
			/>

		</CogoMaps>
	);
}

export default Maps;
