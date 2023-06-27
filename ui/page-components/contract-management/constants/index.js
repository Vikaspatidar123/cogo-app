import { IcMShip, IcCAir, IcMLcl } from '@cogoport/icons-react';

export const STATUS = {
	active           : 'Active',
	inactive         : 'In-Active',
	completed        : 'Completed',
	draft            : 'Draft',
	pending_approval : 'Pending Approval',
	init             : 'Draft',
};

export const SOURCE_MAPPING = {
	manual      : 'With Cogoport',
	rfq         : 'Created from RFQ',
	spot_search : 'Created from Spot Search',
};
const CUSTOM_STYLES = { width: '2em', height: '2em', fill: '#fff' };

export const ICON_MAPPING = {
	fcl_freight : <IcMShip style={CUSTOM_STYLES} />,
	lcl_freight : <IcMLcl style={CUSTOM_STYLES} />,
	air_freight : <IcCAir style={CUSTOM_STYLES} />,
};
export const SERVICE_TYPE = {
	fcl_freight : 'FCL',
	lcl_freight : 'LCL',
	air_freight : 'AIR',
	ftl_freight : 'FTL',
	ltl_freight : 'LTL',
};

export const SERVICE_MAPPING = {
	fcl_freight : 'fcl_freight_services',
	lcl_freight : 'lcl_freight_services',
	air_freight : 'air_freight_services',
	ftl_freight : 'ftl_freight_services',
	ltl_freight : 'ltl_freight_services',
};

export const FILTER_OPTIONS = [
	{
		label           : 'Active',
		value           : 'active',
		backgroundColor : '#E5EEF8',
		color           : '#5481F1',
	},
	{
		label           : 'Pending',
		value           : 'pending_approval',
		backgroundColor : '#E5EEF8',
		color           : '#5481F1',
	},
	{
		label           : 'Draft',
		value           : 'draft',
		backgroundColor : '#E5EEF8',
		color           : '#5481F1',
	},
	{
		label           : 'Expired',
		value           : 'expired',
		backgroundColor : '#E5EEF8',
		color           : '#5481F1',
	},
];

export const CONTRACT_FILTER_OPTION = {
	service_type: [
		{
			label : 'Fcl Freight',
			value : 'fcl_freight',
		},
		{
			label : 'Lcl Freight',
			value : 'lcl_freight',
		},
		{
			label : 'Air Freight',
			value : 'air_freight',
		},
	],
	trade_type: [
		{
			label : 'Import',
			value : 'import',
		},
		{
			label : 'Export',
			value : 'export',
		},
	],
	source: [
		{
			label : 'RFQ',
			value : 'rfq',
		},
		{
			label : 'Spot Search',
			value : 'spot_search',
		},
		{
			label : 'Third Party',
			value : 'manual',
		},
	],
};

export const CONTRACT_FILTERS = [
	{
		label : 'service type',
		key   : 'service_type',
	},
	{
		label : 'trade type',
		key   : 'trade_type',
	},
	{
		label : 'Contract With',
		key   : 'source',
	},
];

export const STATUS_MAPPING = {
	active           : 'active',
	all              : undefined,
	pending_approval : 'pending_approval',
	expired          : 'active',
};
