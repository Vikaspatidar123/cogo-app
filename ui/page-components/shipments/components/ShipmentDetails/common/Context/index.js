import { createContext } from 'react';

export const ShipmentDetailContext = createContext([
	{
		className     : '',
		shipment_data : { shipment_type: null, service_type: null },
		scope         : 'app',
		viewAs        : 'importer_exporter',
	},
]);
