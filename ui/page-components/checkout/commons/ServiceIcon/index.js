import {
	IcMAirport,
	IcMFtl,
	IcMLtl,
	IcMHaulage,
	IcMTrailorFull,
	IcMCfs,
	IcMCustoms,
	IcMTransport,
	IcMFcl,
	IcMLocalCharges,
	IcMLcl,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const MAPPING = {
	transportation: IcMTransport,

	air_freight     : IcMAirport,
	ftl_freight     : IcMFtl,
	ltl_freight     : IcMLtl,
	fcl_freight     : IcMFcl,
	lcl_freight     : IcMLcl,
	haulage_freight : IcMHaulage,
	trailer_freight : IcMTrailorFull,

	fcl_customs : IcMCustoms,
	lcl_customs : IcMCustoms,
	ftl_customs : IcMCustoms,
	ltl_customs : IcMCustoms,
	air_customs : IcMCustoms,

	fcl_freight_local : IcMLocalCharges,
	lcl_freight_local : IcMLocalCharges,
	air_freight_local : IcMLocalCharges,

	fcl_cfs: IcMCfs,
};

function ServiceIcon({ service }) {
	const Icon = MAPPING[service] || IcMCustoms;

	return (
		<div className={styles.container}>
			<Icon height="16px" width="16px" />
		</div>
	);
}

export default ServiceIcon;
