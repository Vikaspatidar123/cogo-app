export const getServiceName = (service) => {
	if (service?.service_type === 'cargo_insurance') {
		return service?.service_type;
	}
	if (service?.service) {
		if (service?.trade_type === 'export') {
			return `origin:${service?.service_name}:${service?.service}`;
		}
		if (service?.trade_type === 'import') {
			return `destination:${service?.service_name}:${service?.service}`;
		}
		return `${service?.service_name}:${service?.service}`;
	}
	if (
		service?.service_type === 'subsidiary'
		&& service?.trade_type === 'export'
	) {
		return `origin:${service?.service_name}`;
	}
	if (
		service?.service_type === 'subsidiary'
		&& service?.trade_type === 'import'
	) {
		return `destination:${service?.service_name}`;
	}
	if (service?.trade_type === 'export') {
		return `origin:${service?.service_type}`;
	}
	if (service?.trade_type === 'import') {
		return `destination:${service?.service_type}`;
	}
	if (
		service?.trade_type === 'domestic'
		&& service?.service_type === 'air_freight_local'
	) {
		return `terminal_${service?.terminal_charge_type}`;
	}
	return service?.service_type;
};
