// import dynamic from 'next/dynamic';
// import React from 'react';

// import { ShipmentDetailContext } from '../../commons/Context';
// import useGetShipment from '../hooks/useGetShipment';
// import useServiceList from '../hooks/useServiceList';
import dynamic from 'next/dynamic';

import useGetShipment from '../hooks/useGetShipment';
import useServiceList from '../hooks/useServiceList';

const Customer = dynamic(() => import('./Customer/components'));

function Details() {
	const { get } = useGetShipment();
	const { data, isGettingShipment } = get || {};

	const { list, loading } = useServiceList(
		data?.shipment_data,
		data?.primary_service,
	);

	const servicesList = [];
	(list || []).forEach((element) => {
		if (element?.is_active === true) {
			servicesList.push(element);
		}
	});

	return (
		<div>
			<Customer
				servicesLoading={loading || isGettingShipment}
				servicesList={servicesList}
			/>
		</div>
	);
}

export default Details;
