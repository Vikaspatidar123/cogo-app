import { cl } from '@cogoport/components';
import { L } from '@cogoport/maps';
import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import { getIcon, getLatLng } from '../../../utils/getMapFn';

import '../../../libs/motion';
import styles from './styles.module.css';

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

function AnimatedRoute({ map, path, transportMode }) {
	const { origin, dest } = getLatLng({
		route : path,
		src   : 'icon',
	});
	const rotate = origin > dest && transportMode === 'air';

	const Icon = getIcon({ type: transportMode, origin, dest });

	const sequence = L.motion.polyline(...getAnimationOptions(
		{
			path,
			icon: getMapDivIcon(
				<div className={styles.container}>
					<Icon className={cl`${styles[`${transportMode}_icon`]} ${rotate && styles.rotate_icon}`} />
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
