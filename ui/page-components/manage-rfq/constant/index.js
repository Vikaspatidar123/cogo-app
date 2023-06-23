import {
	IcAWarehouseLoadingDock,
	IcAFinancial,
	IcAPlan,
} from '@cogoport/icons-react';

export const FreightServices = ['fcl_freight', 'lcl_freight', 'air_freight'];

export const ContractInfo = [
	{
		icon  : <IcAWarehouseLoadingDock />,
		text1 : 'Large Container Count',
		text2 : '',
	},
	{
		icon  : <IcAFinancial />,
		text1 : 'No Rate Expiry',
		text2 : 'Price locked for 1 month',
	},
	{
		icon  : <IcAPlan />,
		text1 : 'Plan shipments',
		text2 : 'utilise throughout the month',
	},
];

export const RATE_COLOR_MAPPING = {
	cheapest: {
		colorType : '#55A762',
		bgColor   : '#EFFFEF',
		textType  : 'Cheapest',
	},
	max_detention: {
		colorType : '#356EFD',
		bgColor   : '#EEF0FF',
		textType  : 'Most Free Days',
	},
	min_transit: {
		colorType : '#C26D1A',
		bgColor   : '#FEF1DF',
		textType  : 'Fastest',
	},
	negotiated: {
		colorType : '#42347C',
		bgColor   : '#DED7FC',
		textType  : 'Negotiated Rate',
	},
	new_rate: {
		colorType : '#FFFFFF;',
		bgColor   : '#F68B21;',
		textType  : 'New Rate',
	},
};

export const UNIT_MAPPING = {
	per_container : '/CTR',
	per_shipment  : '/SPMT',
	per_bl        : '/BL',
	per_kg        : '/KG',
	per_truck     : '/TRUCK',
	per_awb       : '/AWB',
	per_cbm       : '/CBM',
};

export const COGO_FORMAT_SAMPLE_FILE = {
	fcl_freight:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/98a5fbfa27f2e744a3cec49346318c09/FCL%20%281%29.xlsx',
	lcl_freight:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/966dac695468628c4b8de21e9db261c2/LCL%20%281%29.xlsx',
	air_freight:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/2d2cffae6b981a18311c1c2629da00d3/AIR%20%281%29.xlsx',
};
