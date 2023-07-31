const UNIT_MAPPING = {
	fcl_freight : 'Container Count',
	lcl_freight : 'Volume (CBM)',
	air_freight : 'Weight (KGS)',
};

const VESSEL_MAPPING = {
	fcl_freight : 'Containers',
	lcl_freight : 'Commodity',
	air_freight : 'Commodity ',
};

const getShipmentHeaderControls = ({ serviceType }) => [
	{
		name : 'Date',
		span : 4.3,
	},
	{
		name : VESSEL_MAPPING[serviceType] || '',
		span : 3.4,
	},
	{
		name : UNIT_MAPPING[serviceType] || '',
		span : 3.3,
	},
];

export default getShipmentHeaderControls;
