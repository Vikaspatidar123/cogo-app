const ShipmentHeader = ({ serviceType }) => {
	const UNIT_MAPPING = {
		fcl_freight : 'Container Count',
		lcl_freight : 'Volume (CBM)',
		air_freight : 'Weight (KGS)',
	};

	return [
		{
			name : 'Shipment No',
			type : 'text',
			span : 3,
		},
		{
			name : UNIT_MAPPING[serviceType] || '',
			type : 'text',
			span : 4.3,
		},
		{
			name : 'Date',
			type : 'text',
			span : 4,
		},
	];
};

export default ShipmentHeader;
