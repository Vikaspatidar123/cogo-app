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

const SEARCH_TYPES = {
	CONTAINER_NUMBER : 'CONTAINER_NO',
	BOOKING_NUMBER   : 'BOOKING_NO/BL_NO',
	BL_NUMBER        : 'BL_NO',
};

const CONTAINER_LENGTH_TO_BARS = {
	20 : 2,
	40 : 4,
};

const CURRENCY_TO_SYMBOL = {
	USD : '$',
	INR : '₹',
};

const PAYMENT_CARDS = {
	visa            : '',
	mastercard      : '',
	rupay           : '',
	jcb             : '',
	americanexpress : '',
	maestro         : '',
	unionpay        : '',
};

const COUNTRY_IDS = {
	IN: '5f1f94fa-25da-40de-968d-0254abd24ba6',
};
const COUNTRY_INDIA_ID = '541d1232-58ce-4d64-83d6-556a42209eb7';

export {
	CONTAINER_LENGTH_TO_BARS,
	MILESTONE_TYPES,
	INCOTERM_TYPES,
	INCOTERM_TO_SHIPPERS_RESPONSIBILITY,
	SEARCH_TYPES,
	CURRENCY_TO_SYMBOL,
	PAYMENT_CARDS,
	COUNTRY_IDS,
	COUNTRY_INDIA_ID,
};
