const params = {
	fcl_freight_service : ['shipping_line_id'],
	air_freight_service : ['airline_id'],
};
const shouldShowEditQuote = (shipment_data, shippingDetails, service_charges) => {
	const paramsToSee = params[shipment_data?.service_type] || [];
	let showEditQuote = false;
	paramsToSee.forEach((key) => {
		if (shipment_data?.booking_params?.[key] !== shipment_data?.[key]) {
			showEditQuote = true;
		}
	});
	const statuses = service_charges.map((charge) => charge?.margin_approval_status);
	let setQuotationView = false;
	if (!statuses.includes('approved')) {
		paramsToSee.forEach((key) => {
			if (shippingDetails[key] && shippingDetails[key] !== shipment_data?.[key]) {
				setQuotationView = true;
			}
		});
	}
	return {
		paramsToSee,
		setQuotationView,
		shouldDirectGetQuotation: shipment_data?.booking_params && showEditQuote
		&& shipment_data?.can_change_booking_params_status === 'accepted',
	};
};
export default shouldShowEditQuote;
