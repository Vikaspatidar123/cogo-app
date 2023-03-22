const formatQuotation = (values = {}, charge_codes = {}, permanentControls, shipment_data) => {
	const allServices = {
		[shipment_data?.id]: { service_type: shipment_data?.service_type, id: shipment_data?.id },
		...(shipment_data?.operator_dependent_services || {}),
		...(shipment_data?.similar_type_services || {}),
	};
	const notToIncludeKeys = permanentControls.map((control) => control.name);
	const booking_params = {};
	notToIncludeKeys.forEach((key) => {
		booking_params[key] = values[key];
	});
	const services = Object.keys(allServices).map((key) => ({
		service_type : allServices[key]?.service_type,
		service_id   : allServices[key]?.id,
		booking_params,
		quotation    : {
			line_items: (values[key] || []).map((item) => ({
				code     : item?.code,
				price    : item?.price,
				unit     : item?.unit,
				currency : item?.currency,
				name     : charge_codes?.[item.code]?.name,
			})),
		},
	}));
	return { services };
};

export default formatQuotation;
