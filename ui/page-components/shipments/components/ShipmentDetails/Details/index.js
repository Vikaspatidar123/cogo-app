// import dynamic from 'next/dynamic';
// import React from 'react';

// import { ShipmentDetailContext } from '../../commons/Context';
// import useGetShipment from '../hooks/useGetShipment';
// import useServiceList from '../hooks/useServiceList';
import dynamic from 'next/dynamic';

import { ShipmentDetailContext } from '../common/Context';

// const Admin = dynamic(() => import('./Admin'));
const Customer = dynamic(() => import('./Customer/components'));

function ShipmentDetails({ viewAs = '' }) {
	const { get } = useGetShipment();
	const { data, isGettingShipment, ...rest } = get || {};

	const { list, loading, refetchServices } = useServiceList(
		data?.shipment_data,
		data?.primary_service,
	);

	const servicesList = [];
	(list || []).forEach((element) => {
		if (element?.is_active === true) {
			servicesList.push(element);
		}
	});

	const contextValues = {
		isGettingShipment,
		viewAs,
		...rest,
		...(data || {}),
	};

	return (
		<ShipmentDetailContext.Provider value={[contextValues]}>
			{['importer_exporter'].includes(viewAs) ? (
				<Customer
					servicesLoading={loading || isGettingShipment}
					servicesList={servicesList}
				/>
			) : (
				<div>hello</div>
				// <Admin
				// 	servicesLoading={loading || isGettingShipment}
				// 	servicesList={servicesList}
				// 	refetchServices={refetchServices}
				// />
			)}
		</ShipmentDetailContext.Provider>
	);
}

export default ShipmentDetails;
