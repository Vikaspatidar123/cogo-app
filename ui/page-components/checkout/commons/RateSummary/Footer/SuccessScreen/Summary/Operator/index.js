import {
	IcMAirport,
	IcMFtl,
	IcMLtl,
	IcMHaulage,
	IcMTrailorFull,
	IcMCfs,
	IcMCustoms,
	IcMFcl,
	IcMLocalCharges,
	IcMLcl,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const MAPPING = {
	air_freight       : IcMAirport,
	ftl_freight       : IcMFtl,
	ltl_freight       : IcMLtl,
	fcl_freight       : IcMFcl,
	lcl_freight       : IcMLcl,
	haulage_freight   : IcMHaulage,
	trailer_freight   : IcMTrailorFull,
	fcl_customs       : IcMCustoms,
	lcl_customs       : IcMCustoms,
	air_customs       : IcMCustoms,
	fcl_freight_local : IcMLocalCharges,
	air_freight_local : IcMLocalCharges,
	fcl_cfs           : IcMCfs,
};

function CheckoutSuccessScreenSummaryOperator({ rate, service }) {
	const Icon = MAPPING[service];

	return (
		<>
			{rate?.line?.logo_url ? (
				<div className={styles.logo} src={rate?.line?.logo_url} />
			) : (
				<Icon width="40" height="40" />
			)}
			<div className={styles.title}>{rate?.line?.short_name}</div>
		</>
	);
}

export default CheckoutSuccessScreenSummaryOperator;
