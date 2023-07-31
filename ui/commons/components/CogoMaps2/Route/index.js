import { Polyline } from '@cogoport/maps';

import { COLOR_MAPING } from '@/ui/commons/constants/mapConstant';

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
