const getLatLng = ({ route, src }) => {
	const routeLength = route?.length;
	const latLngMapping = {
		origin: {
			lat : route[0]?.lat,
			lng : route[0]?.lng,
		},
		destination: {
			lat : route[routeLength - 1]?.lat,
			lng : route[routeLength - 1]?.lng,
		},
		icon: {
			lat    : route[Math.floor(routeLength / 2)]?.lat,
			lng    : route[Math.floor(routeLength / 2)]?.lng,
			origin : route[0]?.lng,
			dest   : route[routeLength - 1]?.lng,
		},
	};
	return latLngMapping[src];
};

const getIcon = ({ type, origin, dest }) => {
	const iconMapping = {
		ocean : origin > dest ? 'vessel' : 'eta',
		air   : origin > dest ? 'flight' : 'air-icon',
	};

	return iconMapping[type] || '';
};

export { getIcon, getLatLng };
