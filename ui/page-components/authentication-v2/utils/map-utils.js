import { L } from '@cogoport/maps';
import ReactDOMServer from 'react-dom/server';

export const getMapDivIcon = (
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

export const interpolatePosition = (startPoint, endPoint, t) => {
	const lat = startPoint[0] + (endPoint[0] - startPoint[0]) * t;
	const lng = startPoint[1] + (endPoint[1] - startPoint[1]) * t;
	return L.latLng(lat, lng);
};

export const calculateRotation = (startPoint, endPoint) => {
	const dx = endPoint[1] - startPoint[1];
	const dy = endPoint[0] - startPoint[0];
	return -11 - 2.5 * Math.atan2(dy, dx) * (180 / Math.PI);
};
