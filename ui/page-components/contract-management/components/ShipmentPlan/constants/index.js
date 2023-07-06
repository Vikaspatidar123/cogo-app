import { IcMShip, IcCAir, IcMLcl } from '@cogoport/icons-react';

export const STATUS_COLOR = {
	new_via_excel: {
		color   : '#027A48',
		bgColor : '#ECFDF3',
	},
	requested_by_customer: {
		color   : '#B54708',
		bgColor : '#FFFAEB',
	},
	shared_with_customer: {
		color   : '#6941C6',
		bgColor : '#F9F5FF',
	},
	expired: {
		color   : '#B42318',
		bgColor : '#FEF3F2',
	},
};

export const SERVICE_TYPE_SMALL = {
	fcl_freight : 'fcl',
	lcl_freight : 'lcl',
	air_freight : 'air',
	ftl_freight : 'ftl',
	ltl_freight : 'ltl',
};

export const STATUS = {
	active           : 'Active',
	inactive         : 'In-Active',
	completed        : 'Completed',
	draft            : 'Pending Approval',
	pending_approval : 'Pending Approval',
	init             : 'Draft',
};

export const SERVICE_TYPE = {
	fcl_freight : 'FCL',
	lcl_freight : 'LCL',
	air_freight : 'AIR',
};

export const FREQUENCY_OPTIONS = [
	{
		label : '3 Days',
		value : '3',
	},
	{
		label : '7 Days',
		value : '7',
	},
	{
		label : '15 Days',
		value : '15',
	},
	{
		label : 'Others',
		value : 'others',
	},
];

export const SCHEDULE_OPTIONS = [
	{
		label : 'Schedule Evenly',
		value : 'evenly',
	},
	{
		label : 'Schedule Manually ',
		value : 'randomly',
	},
];

export const PLAN_CONSTANT_KEYS = {
	NORMAL_PLAN   : 'normal_plan',
	SHIPMENT_PLAN : 'shipment_plan',
};

export const PLAN_TAB_OPTIONS = [
	{ label: 'PLAN', value: 'normal_plan' },
	{ label: 'SHIPMENT', value: 'shipment_plan' },
];

export const CONTRACT_TYPE = {
	spot_search : 'System Rate Contract',
	manual      : 'Manual Contract',
	rfq         : 'RFQ Contract',
};

const CUSTOM_STYLES = { width: '2em', height: '2em', fill: '#fff' };

export const ICON_MAPPING = {
	fcl_freight : <IcMShip style={CUSTOM_STYLES} />,
	lcl_freight : <IcMLcl style={CUSTOM_STYLES} />,
	air_freight : <IcCAir style={CUSTOM_STYLES} />,
};

export const UNIT_MAPPING = {
	per_container : '/CTR',
	per_shipment  : '/spmt',
	per_bl        : '/BL',
	per_kg        : '/KG',
	per_truck     : '/Truck',
	per_awb       : '/AWB',
	per_cbm       : '/CBM',
	per_wm        : '/Wm',
};

export const RD_STATUS_MAPPING = {
	quoted   : 'PENDING',
	locked   : 'ACTIVE',
	rejected : 'REJECTED',
	init     : 'PENDING',
	draft    : 'PENDING',
};

export const SERVICE_UNIT_MAPPING = {
	fcl_freight : '/Ctr',
	lcl_freight : '/Wm',
	air_freight : '/Kg',
};
