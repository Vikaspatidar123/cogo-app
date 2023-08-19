import { IcMAirport, IcMShip } from '@cogoport/icons-react';
import { L } from '@cogoport/maps';
import { useEffect } from 'react';
import '@/packages/libs/motion';
import ReactDOMServer from 'react-dom/server';

import styles from './styles.module.css';

const getIcon = (type) => {
	if (type === 'air') return <IcMAirport fill="blue" transform="scale(2)" />;
	return <IcMShip fill="blue" height="24px" width="24px" />;
};

export const movingMarkerOptions = ({ color = '#fbdc00', distance = 4000, type = 'sea' }) => [
	{
		color,
		opacity     : 1,
		fillOpacity : 1,
	}, {
		auto     : true,
		duration : Math.max(10000, Math.floor(distance / 2.5)),
		easing   : L.Motion.Ease.linear,
	}, {
		removeOnEnd : false,
		showMarker  : true,
		icon        : L.divIcon({
			html      : ReactDOMServer.renderToString(getIcon(type)),
			iconSize  : [24, 24],
			className : styles.marker,
		}),
	},
];

function AnimatedRoute({ map, path, type }) {
	const sequence = L.motion.polyline(path, ...movingMarkerOptions({ type }));

	useEffect(() => {
		if (map) {
			sequence.addTo(map);
			sequence?.motionStart();
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map]);

	return (
		null);
}

export default AnimatedRoute;
