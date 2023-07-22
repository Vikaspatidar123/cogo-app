import React from 'react';

import ContainerInfo from './ContainerInfo';
import getFreightMapping from './getFreightMapping';

const freight = getFreightMapping();

function ContainerDetails({
	containerInfoData,
	service_type = 'fcl_freight',
}) {
	return (
		<div
			style={{ display: 'flex', alignItems: 'center' }}
			wrap="wrap"
		>
			{freight[service_type]?.freightLogo}
			<ContainerInfo detail={containerInfoData} />
		</div>
	);
}

export default ContainerDetails;
