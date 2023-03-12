import { forwardRef } from 'react';

import ContainerDetails from './ContainerDetails';
import PackageDetails from './PackageDetails';

function Details({ transportMode = 'AIR' }, ref) {
	return (
		transportMode === 'OCEAN' ? <ContainerDetails ref={ref} /> : <PackageDetails ref={ref} />
	);
}

export default forwardRef(Details);
