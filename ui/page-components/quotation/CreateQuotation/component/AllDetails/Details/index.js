import { forwardRef } from 'react';

import ContainerDetails from './ContainerDetails';
import PackageDetails from './PackageDetails';

function Details({ transportMode = 'AIR' }, ref) {
	return (
		<>
			{ transportMode === 'OCEAN' && <ContainerDetails ref={ref} />}
			{transportMode === 'AIR' && <PackageDetails />}
		</>

	);
}

export default forwardRef(Details);
