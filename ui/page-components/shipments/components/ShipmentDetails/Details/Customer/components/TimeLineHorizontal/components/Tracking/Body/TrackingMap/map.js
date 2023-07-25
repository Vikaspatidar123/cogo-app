import { CogoMaps, L } from '@cogoport/maps';
import { useState, useEffect } from 'react';

import { MAP_ATTRIBUTE, SET_TIME } from '../constants';

import Pointer from './Pointer';
import Route from './Route';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution : '',
	},
];

const lineOptions = { color: 'red' };
const remainingRoutelineOptions = { color: 'blue' };
const center = { lat: '28.679079', lng: '77.069710' };

const corner1 = L.latLng(-90, -200);
const corner2 = L.latLng(90, 200);
const bounds = L.latLngBounds(corner1, corner2);

function MapComp({
	completedPoints,
	remainingPoints,
	curvePoints,
	currentMilestone,
}) {
	const [map, setMap] = useState(null);

	const curvePointLength = curvePoints?.length;

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (map) map.invalidateSize(true);
		}, SET_TIME);
		return () => {
			clearTimeout(timeout);
		};
	}, [map]);

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(MAP_ATTRIBUTE);
		}
	}, [map]);

	return (
		<CogoMaps
			key={JSON.stringify(curvePoints)}
			style={{ height: '600px', width: '100%' }}
			baseLayer={LAYER}
			zoom={2.9}
			minZoom={2}
			center={center}
			setMap={setMap}
			maxBoundsViscosity={1}
		>
			{curvePoints?.length > 0 && (
				<Pointer
					lat={curvePoints?.[GLOBAL_CONSTANTS.zeroth_index]?.lat}
					lng={curvePoints?.[GLOBAL_CONSTANTS.zeroth_index]?.lng}
					type="origin"
				/>
			)}

			{currentMilestone && (
				<Pointer
					lat={currentMilestone?.lat}
					lng={currentMilestone?.lng}
					type="origin"
				/>
			)}
			{completedPoints?.length > 0 && (
				<Route
					positions={completedPoints}
					pathOptions={lineOptions}
				/>
			)}
			{remainingPoints?.length > 0 && (
				<Route
					positions={remainingPoints}
					pathOptions={remainingRoutelineOptions}
				/>
			)}
			{remainingPoints?.length === 0 && curvePoints?.length > 0 && (
				<Route positions={curvePoints} map={map} pathOptions={lineOptions} />
			)}
			{curvePoints?.length > 0 && (
				<Pointer
					lat={curvePoints?.[curvePointLength - 1]?.lat}
					lng={curvePoints?.[curvePointLength - 1]?.lng}
					type="destination"
				/>
			)}
		</CogoMaps>
	);
}

export default MapComp;
