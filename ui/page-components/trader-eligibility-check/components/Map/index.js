import { CogoMaps, L, Marker, Popup } from '@cogoport/maps';
import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import MapResultCard from '../MapResultCard';

const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : 'https://api.cogoport.com/cogo-tiles/{z}/{x}/{y}.png',
		attribution : '',
	},

];

const getIcon = (selectedMarker) => L.icon({
	iconUrl    : '/mapIcon/location.svg',
	iconSize   : selectedMarker ? [60, 90] : [38, 95],
	iconAnchor : [0, 0],
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
