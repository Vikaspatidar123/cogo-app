const MILESTONE_TYPES = {
	EMPTY_CONTAINER_PICKUP : 'Empty Container Pickup',
	TOLL_PLAZA_CROSSED     : 'Toll Plaza Crossed',
	STATION_CROSSED        : 'Station Crossed',
	LOADED_ON_RAIL         : 'Loaded on Rail',
	RAIL_DEPARTURE         : 'Rail Departure',
	RAIL_ARRIVAL           : 'Rail Arrival',
	UNLOADED_FROM_RAIL     : 'Unloaded from Rail',
	LOADED_ON_VESSEL       : 'Loaded on Vessel',
	VESSEL_DEPARTURE       : 'Vessel Departure',
	VESSEL_IN_TRANSIT      : 'Vessel in Transit',
	VESSEL_ARRIVAL         : 'Vessel Arrival',
	UNLOAD_FROM_VESSEL     : 'Unload from Vessel',
	GATE_OUT               : 'Gate Out',
	GATE_IN                : 'Gate In',
	CARRIER_RELEASE        : 'Carrier Release',
	DELIVERY               : 'Delivery',
	EMPTY_CONTAINER_RETURN : 'Empty Container Return',
	CFS_OUT                : 'CFS Out',
	CFS_IN                 : 'CFS In',
};

const UNSHADED_MILESTONES = [
	MILESTONE_TYPES.STATION_CROSSED,
	MILESTONE_TYPES.TOLL_PLAZA_CROSSED,
];

export { UNSHADED_MILESTONES };
