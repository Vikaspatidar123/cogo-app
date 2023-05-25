import React from 'react';

import ContainerInfo from './ContainerInfo';
import getFreightMapping from './FreightMapping';

function ContainerDetails({
	containerInfoData,
	service_type = 'fcl_freight',
}) {
	const freight = getFreightMapping();

	return (
		<div
			style={{ marginTop: '.8rem', padding: '.3rem 0.8rem 1.2rem 1.5rem', display: 'flex', alignItems: 'center' }}
			wrap="wrap"
		>
			{freight[service_type]?.freightLogo}
			<ContainerInfo detail={containerInfoData} />
		</div>
	);
}

export default ContainerDetails;
