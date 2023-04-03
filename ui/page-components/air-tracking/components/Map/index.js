import { CogoMaps } from '@cogoport/maps';

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
