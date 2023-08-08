import getConfiguration from '../configurations/SearchFormControls/getConfiguration';

const getAdditionalServicesFromDraft = ({
	data,
	serviceType,
	location,
	incoTerm,
	index,
	setServices = () => {},
}) => {
	let additional_services = {};
	const mapping = getConfiguration('services', serviceType);
	const servicesList = [serviceType];
	const servicesListConfig = mapping[incoTerm] || [];

	if (servicesListConfig?.length > 0) {
		servicesList.pop();
	}
	servicesListConfig?.forEach((service) => {
		if (service === 'export_haulage_freight') {
			if (location?.origin?.is_icd) {
				servicesList.push(service);
			}
		} else if (service === 'import_haulage_freight') {
			if (location?.destination?.is_icd) {
				servicesList.push(service);
			}
		} else servicesList.push(service);
	});

	let newServices = {};
	servicesList.forEach((service) => {
		newServices = {
			...newServices,
			[service]: false,
		};
	});

	Object.keys(data).forEach((item) => {
		if (item.includes('_services_attributes')) {
			const freightType = item.replace('_services_attributes', '');
			if (freightType !== serviceType) {
				data[item].forEach((freightData) => {
					const {
						cargo_handling_type = '',
						trade_type,
						address = '',
						destination_location_id = '',
						origin_location_id = '',
						truck_type = '',
						trucks_count = '',
						cargo_value = '',
						cargo_value_currency = '',
						ad_code = '',
						haulage_type = '',
						packages = [],
					} = freightData;

					if (freightType === 'fcl_customs' || freightType === 'fcl_cfs') {
						if (cargo_handling_type) {
							newServices = {
								...newServices,
								[`${trade_type}_${freightType}`]: true,
							};
							const freight_key =	freightType === 'fcl_cfs' ? 'fcl_cfs' : 'customs';
							additional_services = {
								...additional_services,
								[`${trade_type}_fcl_cfs_have_ad_code`]       : ad_code,
								[`${trade_type}_${freight_key}_cargo_value`] : cargo_value,
								[`${trade_type}_${freight_key}_cargo_handling_type`]:
									cargo_handling_type,
								[`${trade_type}_${freight_key}_cargo_value_currency`]:
									cargo_value_currency,
							};
						}
					}

					if (freightType === 'lcl_customs' || freightType === 'air_customs') {
						newServices = {
							...newServices,
							[`${trade_type}_${freightType}`]: true,
						};
					}

					if (freightType === 'trailer_freight') {
						newServices = {
							...newServices,
							[`${trade_type}_transportation`]: true,
						};
						let pickupPincode = {};
						if (trade_type === 'export') {
							pickupPincode = {
								export_transportation_location_id: origin_location_id,
							};
						} else {
							pickupPincode = {
								import_transportation_location_id: destination_location_id,
							};
						}
						additional_services = {
							...additional_services,
							...pickupPincode,
							[`${trade_type}_transportation_address`]: address,
							[`${trade_type}_transportation_cargo_handling_type`]:
								additional_services?.[
									`${trade_type}_transportation_cargo_handling_type`
								]
								|| (trade_type === 'export'
									? 'stuffing_at_factory'
									: 'direct_port_delivery'),
						};
					}

					if (freightType === 'ftl_freight') {
						newServices = {
							...newServices,
							[`${trade_type}_transportation`]: true,
						};
						let pickupPincode = {};
						if (trade_type === 'export') {
							pickupPincode = {
								export_transportation_location_id: origin_location_id,
							};
						} else {
							pickupPincode = {
								import_transportation_location_id: destination_location_id,
							};
						}

						additional_services = {
							...additional_services,
							...pickupPincode,
							[`${trade_type}_transportation_address`]: address,
							[`${trade_type}_transportation_cargo_handling_type`]:
								additional_services?.[
									`${trade_type}_transportation_cargo_handling_type`
								]
								|| (trade_type === 'export'
									? 'stuffing_at_dock'
									: 'destuffing_at_dock'),
							[`${trade_type}_transportation_truck_type`]   : truck_type,
							[`${trade_type}_transportation_trucks_count`] : trucks_count,
							[`${trade_type}_transportation_pickup_type`]  : 'ftl',
						};
					}

					if (freightType === 'ltl_freight') {
						newServices = {
							...newServices,
							[`${trade_type}_transportation`]: true,
						};
						let pickupPincode = {};
						if (trade_type === 'export') {
							pickupPincode = {
								export_transportation_location_id: origin_location_id,
							};
						} else {
							pickupPincode = {
								import_transportation_location_id: destination_location_id,
							};
						}

						const formatedPackages = packages.map((itm) => {
							const dimensions = {};
							const mainArray = {};
							Object.keys(itm).forEach((key) => {
								if (['length', 'width', 'height'].includes(key)) {
									dimensions[key] = itm[key];
								} else {
									mainArray[key] = itm[key];
								}
							});
							mainArray.dimensions = dimensions;
							return mainArray;
						});

						additional_services = {
							...additional_services,
							...pickupPincode,
							[`${trade_type}_transportation_packages`]    : formatedPackages,
							[`${trade_type}_transportation_address`]     : address,
							[`${trade_type}_transportation_pickup_type`] : 'ltl',
						};
					}

					if (freightType === 'haulage_freight') {
						let transportaionLocation = {};
						if (trade_type === 'export') {
							transportaionLocation = {
								export_transportation_location_id: origin_location_id,
							};
						} else {
							transportaionLocation = {
								import_transportation_location_id: destination_location_id,
							};
						}

						newServices = {
							...newServices,
							[`${trade_type}_${freightType}`]: true,
						};
						additional_services = {
							...additional_services,
							...transportaionLocation,
							[`${trade_type}_haulage_type`]: haulage_type,
						};
					}
				});
			}
		}
	});

	setServices((prev) => ({
		...(prev || {}),
		[serviceType]: {
			...prev?.[serviceType],
			[index]: newServices,
		},
	}));
	return additional_services;
};

export default getAdditionalServicesFromDraft;
