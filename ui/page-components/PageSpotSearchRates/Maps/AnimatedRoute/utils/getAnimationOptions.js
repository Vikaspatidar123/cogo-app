import { L } from '@cogoport/maps';

const getAnimationOptions = ({ path = [], duration, icon }) => [
	path,
	{
		opacity     : 0,
		fillOpacity : 0,
		weight      : 0.2,
	},
	{
		auto   : false,
		duration,
		easing : L.Motion.Ease.easeInOutQuart,
	},
	{
		removeOnEnd: true,
		icon,
	},
];

export default getAnimationOptions;
