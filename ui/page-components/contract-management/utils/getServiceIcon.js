import {
	IcMCfs,
	IcMCustoms,
	IcMFcl,
	IcMLocalCharges,
	IcMTrailorFull,
	IcMTransport,
	IcMFair,
} from '@cogoport/icons-react';

const MAPPING = {
	transportation    : IcMTransport,
	ftl_freight       : IcMTransport,
	trailer_freight   : IcMTrailorFull,
	ltl_freight       : IcMTransport,
	fcl_customs       : IcMCustoms,
	fcl_cfs           : IcMCfs,
	fcl_freight       : IcMFcl,
	air_freight       : IcMFair,
	fcl_freight_local : IcMLocalCharges,
	lcl_freight_local : IcMLocalCharges,
	air_freight_local : IcMLocalCharges,
};

function ServiceIcon({ service }) {
	const Icon = MAPPING[service] || IcMCustoms;

	return (
		<div
			style={{
				display        : 'flex',
				alignItems     : 'center',
				justifyContent : 'space-between',
				width          : ' 20px',
				marginRight    : '10px',
			}}
		>
			<Icon height="16px" width="16px" style={{ margin: '0 auto' }} />
		</div>
	);
}

export default ServiceIcon;
