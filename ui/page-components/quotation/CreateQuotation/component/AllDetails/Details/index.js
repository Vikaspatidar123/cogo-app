import { forwardRef } from 'react';

import ContainerDetails from './ContainerDetails';
import PackageDetails from './PackageDetails';

function Details({ transportMode = 'AIR', editAir, editOcean }, ref) {
	return (
		transportMode === 'OCEAN' ? <ContainerDetails ref={ref} editOcean={editOcean} />
			: <PackageDetails editAir={editAir} ref={ref} />
	);
}

export default forwardRef(Details);
