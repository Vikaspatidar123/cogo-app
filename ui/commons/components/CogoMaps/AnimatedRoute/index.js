import { IcMFship, IcMAirport } from '@cogoport/icons-react';
import { L } from '@cogoport/maps';
import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import '../../../libs/motion';
import styles from './styles.module.css';

// const calculateRotation = (startPoint, endPoint) => {
// 	const dx = endPoint.lng - startPoint.lng;
// 	const dy = endPoint.lat - startPoint.lat;
// 	return -2.5 * Math.atan2(dy, dx) * (180 / Math.PI);
// };

const getAnimationOptions = ({ path = [], icon }) => [
	path,
	{
		opacity     : 0,
		fillOpacity : 0,
		weight      : 0.2,
	},
	{
		auto: false,
		duration:
           8000,
		easing: L.Motion.Ease.easeInOutQuart,
	},
	{
		removeOnEnd: true,
		icon,
	},
];

const getMapDivIcon = (
	SvgIcon,
	className,
	iconSize = [20, 20],
	iconAnchor = [10, 12],
	...rest
) => new L.DivIcon({
	html: ReactDOMServer.renderToString(SvgIcon),
	iconSize,
	iconAnchor,
	className,
	...rest,
});
const ICON_MAPING = {
	ocean : IcMFship,
	air   : IcMAirport,
};
function AnimatedRoute({ map, path, transportMode }) {
	// const rotation = calculateRotation(path[0], path[path.length - 1]);
	const Icon = ICON_MAPING[transportMode];
	// style={{ transform: `rotate(${rotation}deg)` }}
	const sequence = L.motion.polyline(...getAnimationOptions(
		{
			path,
			icon: getMapDivIcon(
				<div className={styles.container}>
					<Icon className={styles[`${transportMode}_icon`]} />
				</div>,
			),
		},
	));

	useEffect(() => {
		if (map) {
			sequence?.addTo(map);
			sequence?.motionStart();
		}
		return () => {
			if (map) {
				map?.removeLayer(sequence);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map]);

	return (
		null);
}

export default AnimatedRoute;
