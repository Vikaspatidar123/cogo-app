const POC_TYPES = { CONSIGNEE: 'CONSIGNEE', SHIPPER: 'SHIPPER' };
const INCOTERM_TYPES = {
	EXW : 'EXW',
	FCA : 'FCA',
	FAS : 'FAS',
	FOB : 'FOB',
	CFR : 'CFR',
	CIF : 'CIF',
	DPU : 'DPU',
	CPT : 'CPT',
	CIP : 'CIP',
	DDP : 'DDP',
};
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
const INCOTERM_TO_SHIPPERS_RESPONSIBILITY = {
	[INCOTERM_TYPES.EXW] : [MILESTONE_TYPES.EMPTY_CONTAINER_PICKUP],
	[INCOTERM_TYPES.FCA] : [MILESTONE_TYPES.UNLOADED_FROM_RAIL],
	[INCOTERM_TYPES.FAS] : [MILESTONE_TYPES.GATE_IN],
	[INCOTERM_TYPES.FOB] : [MILESTONE_TYPES.LOADED_ON_VESSEL],
	[INCOTERM_TYPES.CFR] : [MILESTONE_TYPES.VESSEL_ARRIVAL],
	[INCOTERM_TYPES.CIF] : [MILESTONE_TYPES.VESSEL_ARRIVAL],
	[INCOTERM_TYPES.DPU] : [MILESTONE_TYPES.CARRIER_RELEASE],
	[INCOTERM_TYPES.CPT] : [MILESTONE_TYPES.GATE_OUT],
	[INCOTERM_TYPES.CIP] : [MILESTONE_TYPES.GATE_OUT],
	[INCOTERM_TYPES.DDP] : [MILESTONE_TYPES.EMPTY_CONTAINER_RETURN],
};

const IMPORT_INCOTERMS = [
	INCOTERM_TYPES.EXW,
	INCOTERM_TYPES.FCA,
	INCOTERM_TYPES.FAS,
	INCOTERM_TYPES.FOB,
];

const EXPORT_INCOTERMS = [
	INCOTERM_TYPES.CFR,
	INCOTERM_TYPES.CIF,
	INCOTERM_TYPES.DPU,
	INCOTERM_TYPES.CPT,
	INCOTERM_TYPES.CIP,
	INCOTERM_TYPES.DDP,
];

const altImage =	'https://prod-cogoport.s3.ap-south-1.amazonaws.com/669242b94926dee5f79e2e3401d7ed5e/og-image.jpg';
const MAX_STEPS = 1;
const STEPS_INFO = [
	{ heading: 'Add and manage Contacts', nextButtonLabel: 'Customize Alerts' },
	{ heading: 'Customize events for updates and deviations', nextButtonLabel: 'Save' },
];

export {
	POC_TYPES, IMPORT_INCOTERMS, EXPORT_INCOTERMS, altImage, STEPS_INFO, MAX_STEPS,
	INCOTERM_TO_SHIPPERS_RESPONSIBILITY,
};
