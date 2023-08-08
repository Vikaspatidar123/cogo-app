import { CogoMaps, L, Marker, Popup } from '@cogoport/maps';
import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import MapResultCard from '../MapResultCard';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution : '',
	},

];

const SELECTED_MARKER_SIZE = [40, 70];
const DEFAULT_MARKER_SIZE = [28, 45];
const DEFAULT_ICON_ANCHOR = [0, 0];

const getIcon = (selectedMarker) => L.icon({
	iconUrl    : GLOBAL_CONSTANTS.image_url.destination_map_pointer,
	iconSize   : selectedMarker ? SELECTED_MARKER_SIZE : DEFAULT_MARKER_SIZE,
	iconAnchor : DEFAULT_ICON_ANCHOR,
});

function Map({
	screeningRequestResponse = [],
	setSelected = () => {},
	selected = {},
}) {
	const [map, setMap] = useState();

	useEffect(() => {
		if (Object.keys(selected).length > 0) {
			L.popup([selected.latitude, selected.longitude], {
				content: ReactDOMServer.renderToString(<MapResultCard item={selected} />),
			}).openOn(map);
		}
	}, [map, selected]);

	return (
		<div>
			<CogoMaps baseLayer={LAYER} zoom={3.6} setMap={setMap}>
				{(screeningRequestResponse || [])
					.filter((items) => items?.screeningAddress != null)
					.map((item) => {
						const selectedMarker = item?.latitude === selected.latitude
						&& item?.longitude === selected.longitude;
						return (
							<Marker
								position={[item?.latitude, item?.longitude]}
								icon={getIcon(selectedMarker)}
								classname={item?.screeningCityName}
								eventHandlers={{
									click: () => {
										setSelected(item);
									},
								}}
								key={item?.screeningCityName}
							>
								<Popup direction="top">
									<div>
										<MapResultCard item={item} />
									</div>
								</Popup>
							</Marker>
						);
					})}
			</CogoMaps>
		</div>
	);
}

export default Map;
