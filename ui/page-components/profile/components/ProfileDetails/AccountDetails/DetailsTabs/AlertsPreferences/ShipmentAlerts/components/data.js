const data = {
	service_wise_data: {
		fcl: {
			header: ['shipment_id', 'invoicing_party', 'shipper', 'CONSIGNEE', 'SERVICE_TYPE', 'TRADE_TYPE',
				'shipper', 'shipment_id', 'shipment_id', 'shipper', 'shipment_id'],
			value: [{
				shipment_id     : '123',
				invoicing_party : 'ok',
				shipper         : 'qeedw',
				CONSIGNEE       : 'defd23',
				SERVICE_TYPE    : 'SERVICE_TYPE',
				TRADE_TYPE      : 'TRADE_TYPE',
			},
			{ shipment_id: '123', invoicing_party: 'cogo' }],
		},

		lcl: {
			header : ['shipment_id', 'invoicing_party'],
			value  : [{ shipment_id: '123', invoicing_party: 'ok' },
				{ shipment_id: '12123', invoicing_party: 'cog22o' }],
		},
		air: {
			header : ['shipment_id', 'invoicing_party'],
			value  : [],
		},
	},
};
export default data;
