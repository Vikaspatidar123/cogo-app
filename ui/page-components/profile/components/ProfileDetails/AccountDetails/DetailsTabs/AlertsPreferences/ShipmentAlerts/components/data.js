const data = {
	service_wise_data: {
		fcl: {
			header: ['shipment_id', 'invoicing_party', 'shipper', 'CONSIGNEE', 'SERVICE TYPE', 'TRADE TYPE',
			 'shipper', 'shipment_id'],
			value: [{ shipment_id: '123', invoicing_party: 'ok' },
				{ shipment_id: '123', invoicing_party: 'cogo' }],
		},

		lcl: {
			header : ['shipment_id', 'invoicing_party'],
			value  : [{ shipment_id: '123', invoicing_party: 'ok' },
				{ shipment_id: '123', invoicing_party: 'cogo' }],
		},
		air: {
			header : ['shipment_id', 'invoicing_party'],
			value  : [],
		},
	},
};
export default data;
