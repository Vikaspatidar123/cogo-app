import { Polyline, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef } from 'react';

import { PATH_OPTION } from '../../../../../constant/mapConstant';

function Route({ positions, map, transportMode }) {
	const pathOptions = PATH_OPTION[transportMode];

	const ref = useRef(null);

	useEffect(() => {
		const line = ref.current;
		if (map && line) {
			const bounds = line.getBounds();
			if (!isEmpty(bounds) && bounds instanceof L.LatLngBounds) {
				map?.flyToBounds(bounds, { maxZoom: 4.5 });
			}
		}
	}, [ref, map]);
	return (

		<Polyline
			ref={ref}
			positions={positions}
			pathOptions={pathOptions}
		/>
	);
}
export default Route;
