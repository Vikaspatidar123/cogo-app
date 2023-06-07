import { cl } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import Item from './Item';
import styles from './styles.module.css';

function PortDetails({ data }) {
	const suffix = {
		fcl_freight                 : 'port',
		lcl_freight                 : 'port',
		air_freight                 : 'airport',
		trailer_freight             : 'location',
		ftl_freight                 : 'location',
		ltl_freight                 : 'location',
		fcl_customs                 : 'port',
		lcl_customs                 : 'location',
		air_customs                 : 'airport',
		haulage_freight             : 'location',
		origin_trailer_freight      : 'location',
		destination_trailer_freight : 'location',
		origin_ftl_freight          : 'location',
		destination_ftl_freight     : 'location',
		origin_ltl_freight          : 'location',
		destination_ltl_freight     : 'location',
		origin_fcl_customs          : 'port',
		destination_fcl_customs     : 'port',
		origin_lcl_customs          : 'location',
		destination_lcl_customs     : 'location',
		origin_air_customs          : 'airport',
		destination_air_customs     : 'airport',
		fcl_cfs                     : 'port',
		origin_fcl_cfs              : 'port',
		destination_fcl_cfs         : 'port',
	};

	const { search_type } = data;

	const onlySingleLocation = [
		'fcl_customs',
		'lcl_customs',
		'air_customs',
		'fcl_cfs',
	];
	const isSingleLocation = onlySingleLocation.includes(search_type);

	const origin = isSingleLocation
		? data[suffix[search_type]] || {}
		: data[`origin_${suffix[search_type]}`] || {};

	const destination = isSingleLocation
		? data[suffix[search_type]] || {}
		: data[`destination_${suffix[search_type]}`] || {};
	return (
		<div className={cl`${styles.container} ${styles.mobile_view}`}>
			<Item location={origin} search_type={search_type} />

			{!isSingleLocation && (
				<IcMPortArrow style={{ flex: 1 }} />
			)}

			{!isSingleLocation && (
				<Item location={destination} search_type={search_type} />
			)}
		</div>
	);
}

export default PortDetails;
