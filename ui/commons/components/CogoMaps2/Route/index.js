import { Polyline } from '@cogoport/maps';

import { COLOR_MAPPING } from '@/ui/commons/constants/mapConstant';

function Route({ path, transportMode }) {
	const pathOptions = { color: COLOR_MAPPING[transportMode] };

	return (
		<Polyline
			positions={path}
			pathOptions={pathOptions}
		/>
	);
}
export default Route;
