export const UNIT_MAPPING = {
	per_container : '/CTR',
	per_shipment  : '/SPMT',
	per_bl        : '/BL',
	per_kg        : '/KG',
	per_truck     : '/TRUCK',
	per_awb       : '/AWB',
	per_cbm       : '/CBM',
};

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
		bgColor   : 'orange',
		textType  : 'New Rate',
	},
};
