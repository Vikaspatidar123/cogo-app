import { CogoMaps } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { PATH_OPTION } from '../../constant';

import Pointer from './Pointer';
import Route from './Route';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const DEFAULT_LENGTH = 1;
const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution : '',
	},
];

const getLatLng = ({ route = [] }) => {
	const routeLength = route?.length;
	const origin = {
		lat : route?.[GLOBAL_CONSTANTS.zeroth_index]?.lat,
		lng : route?.[GLOBAL_CONSTANTS.zeroth_index]?.lng,
	};
	const destination = {
		lat : route?.[routeLength - DEFAULT_LENGTH]?.lat,
		lng : route?.[routeLength - DEFAULT_LENGTH]?.lng,
	};
	return { origin, destination };
};

const center = { lat: '28.679079', lng: '77.069710' };
function MapComp({ height = '60vh', allPoints = [], type = 'ocean' }) {
	const [map, setMap] = useState(null);
	return (
		<CogoMaps
			style={{ width: '100%', height }}
			baseLayer={LAYER}
			zoom={3}
			minZoom={1}
			center={center}
			setMap={setMap}
			maxBoundsViscosity={1}
			maxZoom={12}
		>
			{(allPoints || []).map((points, index) => {
				const { route = [] } = points || {};
				const { origin, destination } = getLatLng({ route });
				if (isEmpty(route)) return null;
				return (
					<React.Fragment key={`${origin?.lat}_${index + 1}`}>
						<Pointer map={map} lat={origin?.lat} lng={origin?.lng} src="origin" />
						<Route map={map} positions={route} pathOption={PATH_OPTION[type]} />
						<Pointer map={map} lat={destination?.lat} lng={destination?.lng} src="destination" />
					</React.Fragment>
				);
			})}

		</CogoMaps>
	);
}
export default MapComp;
