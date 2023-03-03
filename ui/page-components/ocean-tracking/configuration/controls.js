export const Controls = [

	{
		label          : 'Shipping line',
		name           : 'shipping_line_id',
		type           : 'multi_select',
		placeholder    : 'shipping line',
		value          : '',
		defaultOptions : true,
		theme          : 'admin',
		className      : 'primary md',
	},
	{
		label          : 'Shipper Name',
		name           : 'shipper',
		type           : 'multi_select',
		placeholder    : 'shipper name',
		value          : '',
		defaultOptions : true,
		theme          : 'admin',
		className      : 'primary md',
	},
	{
		label          : 'Consignee Name',
		name           : 'consignee',
		type           : 'multi_select',
		placeholder    : 'consignee name',
		value          : '',
		defaultOptions : true,
		theme          : 'admin',
		className      : 'primary md',
	},
];

// const getControls = ({
// 	shippingLinesList = [], shippersList = [],
// 	consigneesList = [],
// }) => {
// 	const shipping = shippingLinesList.length > 0 ? Shipping : undefined;
// 	const shipper = shippersList.length > 0 ? Shipper : undefined;
// 	const consignee = consigneesList.length > 0 ? Consignee : undefined;
// 	const controls = [Shipping, Shipper, Consignee];
// 	console.log(controls, 'control');
// 	return	((controls || []).map((control) => {
// 		const newControl = { ...control };
// 		if (shippingLinesList.length > 0 && control.name === 'shipping_line_id') {
// 			console.log(shippingLinesList, 'shippingLinesList');
// 			return { ...newControl, options: shippingLinesList || [] };
// 		}

// 		if (shippersList.length > 0 && control.name === 'shipper') {
// 			console.log(shippersList, 'shippersList');
// 			return { ...newControl, options: shippersList || [] };
// 		}
// 		if (consigneesList.length > 0 && control.name === 'consignee') {
// 			console.log(consigneesList, 'consigneesList');
// 			return { ...newControl, options: consigneesList || [] };
// 		}
// 		return newControl;
// 	}));
// };
// export default getControls;
