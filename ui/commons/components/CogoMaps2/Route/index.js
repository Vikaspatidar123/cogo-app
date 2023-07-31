import { Polyline } from '@cogoport/maps';

const COLOR_MAPING = {
	ocean   : '#1867D2',
	land    : '#136f29',
	air     : '#f37166',
	road    : '#136f29',
	haulage : '#8B0000',
};
function Route({ path, transportMode }) {
	const pathOptions = { color: COLOR_MAPING[transportMode] };

	return (
		<Polyline
			positions={path}
			pathOptions={pathOptions}
		/>
	);
}
export default Route;
