const shipmentConfig = [
	{
		key   : 'checkbox',
		title : '',
		func  : 'renderCheckbox',
		width : '10%',
	},
	{
		key   : 'shipper',
		title : 'Shipper',
		func  : 'renderShipperConsignee',
		width : '19%',

	},
	{
		key   : 'consignee',
		title : 'Consignee',
		func  : 'renderShipperConsignee',
		width : '18%',

	},
	{
		key   : 'portPair',
		title : 'Port Pair',
		func  : 'renderPortPair',
		width : '28%',

	},
	{
		key   : 'input',
		title : 'BL No/ Container No',
		width : '25%',

	},
];

export default shipmentConfig;
