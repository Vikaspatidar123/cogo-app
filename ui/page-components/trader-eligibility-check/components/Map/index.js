import { CogoMaps } from '@cogoport/maps';

const version = 1;
const styleName = [
	{ title: 'Normal Day', style: 'normal.day' },
	{ title: 'Normal Day Grey', style: 'normal.day.grey' },
	{ title: 'Normal Day Transit', style: 'normal.day.transit' },
	{ title: 'Reduced Day', style: 'reduced.day' },
	{ title: 'Norma lNight', style: 'normal.night' },
	{ title: 'Reduced Night', style: 'reduced.night' },
	{ title: 'Pedestrian Day', style: 'pedestrian.day' },
];

const LAYER = styleName.map(({ title, style }) => ({
	name : title,
	url  : `https://${version}.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/
	512/png8?apiKey=Yi1Uv0y9PgZ24UVbBYY7-fRwaz-DPdmGWdIddQW0A9g&mv=in337jp128&ppi=320`,
	attribution: '',
}));

function Map() {
	return (
		<div>
			<CogoMaps baseLayer={LAYER} zoom={3.6} />
		</div>
	);
}

export default Map;
