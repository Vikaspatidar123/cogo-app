export const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : 'https://api.cogoport.com/cogo-tiles/{z}/{x}/{y}.png',
		attribution : '',
	},
];

export const MAP_ATTRIBUTE = `<a href="https://www.cogoport.com/en/terms-and-conditions/" target="_blank">
&copy; Cogoport T&C</a> |
<a href="https://www.cogoport.com/en/privacy-policy/" target="_blank">Privacy & data protection</a> |
<a href="https://leafletjs.com/" target="_blank">Leaflet</a>`;

export const CENTER = { lat: '28.679079', lng: '77.069710' };

export const PATH_OPTION = {
	ocean : { color: '#1867D2', weight: 2 },
	air   : { color: '#f37166', weight: 2 },
	land  : { color: '#136f29', weight: 2 },
};

export const DEFAULT_LAT_INDEX = 0;
export const DEFAULT_LNG_INDEX = 1;
