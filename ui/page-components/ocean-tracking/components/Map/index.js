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

const LAYER = [{
	name        : 'Cogo Maps',
	url         : 'https://api.cogoport.com/cogo-tiles/{z}/{x}/{y}.png',
	attribution : '',
}];

function Map() {
	return (
		<div>
			<CogoMaps
				baseLayer={LAYER}
				zoom={3.6}
				maxZoom={12}
			/>
		</div>
	);
}

export default Map;
