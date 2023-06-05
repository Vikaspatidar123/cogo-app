/* eslint-disable react/jsx-no-constructed-context-values */
import dynamic from 'next/dynamic';

import { ShipmentDetailContext } from '../common/Context';
import useGetShipment from '../hooks/useGetShipment';
import useServiceList from '../hooks/useServiceList';

const Customer = dynamic(() => import('./Customer/components'));

function Details({ viewAs = 'importer_exporter' }) {
	const { get } = useGetShipment();
	const { data, isGettingShipment, ...rest } = get || {};

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
	const contextValues = {
		isGettingShipment,
		viewAs,
		...rest,
		...(data || {}),
	};

	return (
		<ShipmentDetailContext.Provider value={[contextValues]}>
			<Customer
				servicesLoading={loading || isGettingShipment}
				servicesList={servicesList}
			/>
		</ShipmentDetailContext.Provider>
	);
}

export default Details;
