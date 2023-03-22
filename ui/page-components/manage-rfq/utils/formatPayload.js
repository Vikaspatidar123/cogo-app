import calculator from '../helpers/calculator';
import getCommodityMapping from '../helpers/getCommodityMapping';

import formatCreateSearch from './formatCreateSearch';

const formatPayload = ({
	formData,
	serviceType,
	services,
	originData,
	destinationData,
}) => {
	let payload = {};
	payload = {
		...payload,
		search_type : serviceType,
		source      : 'rfq',
	};
	const values = formData?.search_rates?.[0];

	const formattedSpotSearchParams = formatCreateSearch({
		rawParams : values,
		mode      : serviceType,
		services,
		originData,
		destinationData,
	});
	let additionalServiceData = {};

	Object.keys(formattedSpotSearchParams || {}).forEach((item) => {
		if (
			item.includes('services_attributes')
			&& ![
				'fcl_freight_services_attributes',
				'lcl_freight_services_attributes',
				'air_freight_services_attributes',
			].includes(item)
		) {
			additionalServiceData = {
				...additionalServiceData,
				[item]: formattedSpotSearchParams[item],
			};
		}
	});

	if (serviceType === 'fcl_freight') {
		let newValues = [];

		(values.containers || []).forEach((item) => {
			let check = true;
			newValues.forEach((itmData, index) => {
				if (
					itmData?.container_size === item?.container_size
					&& itmData?.container_type === item?.container_type
					&& itmData?.commodity === item?.commodity
				) {
					newValues[index] = {
						origin_port_id      : values?.origin_port_id,
						destination_port_id : values?.destination_port_id,
						container_size      : item?.container_size,
						container_type      : item?.container_type,
						commodity           : item?.commodity,
						containers_count:
							(itmData?.containers_count || 0) + Number(item?.containers_count),
						bls_count                  : Number(values?.bls_count || 1),
						inco_term                  : values?.inco_term,
						cargo_weight_per_container : Math.max(
							Number(item?.cargo_weight_per_container),
							itmData?.cargo_weight_per_container,
						),
						status: 'active',
					};
					check = false;
				}
			});
			if (check) {
				newValues = [
					...newValues,
					{
						origin_port_id      : values?.origin_port_id,
						destination_port_id : values?.destination_port_id,
						container_size      : item?.container_size,
						container_type      : item?.container_type,
						commodity           : item?.commodity,
						containers_count    : Number(item?.containers_count),
						bls_count           : Number(values?.bls_count || 1),
						inco_term           : values?.inco_term,
						cargo_weight_per_container:
							Number(item?.cargo_weight_per_container) || null,
						status: 'active',
					},
				];
			}
		});

		payload = { ...payload, fcl_freight_services_attributes: newValues };
	}

	if (serviceType === 'lcl_freight') {
		let packagesCount = 0;
		let totalWeight = 0;
		let totalVolume = 0;

		if (values.calculate_by === 'unit') {
			const calculatedValue = calculator(values.dimensions, serviceType);
			packagesCount = calculatedValue?.packagesCount;
			totalWeight = calculatedValue?.totalWeight;
			totalVolume = calculatedValue?.totalVolume;
		} else {
			packagesCount = Number(values.containers[0].packages_count);
			totalWeight = Number(values.containers[0].weight);
			totalVolume = Number(values.containers[0].volume);
		}

		payload = {
			...payload,
			lcl_freight_services_attributes: [
				{
					origin_port_id      : values.origin_port_id,
					destination_port_id : values.destination_port_id,
					commodity           : values.commodity,
					inco_term           : values.inco_term,
					packages_count      : packagesCount,
					bls_count           : Number(values?.bls_count || 1),
					weight              : totalWeight,
					volume              : totalVolume,
					status              : 'active',
				},
			],
		};
	}

	if (serviceType === 'air_freight') {
		let packagesCount = 0;
		let totalWeight = 0;
		let totalVolume = 0;
		let newPackages = [];

		if (values.calculate_by === 'unit') {
			const calculatedValue = calculator(values.dimensions, serviceType);
			packagesCount = calculatedValue?.packagesCount;
			totalWeight = calculatedValue?.totalWeight;
			totalVolume = calculatedValue?.totalVolume;
			newPackages = calculatedValue?.newPackages;
		} else {
			packagesCount = Number(values.containers[0].packages_count);
			totalWeight = Number(values.containers[0].package_weight);
			totalVolume = Number(values.containers[0].volume);
			newPackages = [
				{
					packages_count : values.containers[0].packages_count,
					handling_type  : values.containers[0].handling_type,
					packing_type   : values.containers[0].packing_type,
				},
			];
		}

		const { commodity, commodity_details } = getCommodityMapping({
			commodity_type    : values.commodity_type,
			commodity_subtype : values.commodity_subtype,
		});

		payload = {
			...payload,
			air_freight_services_attributes: [
				{
					cargo_clearance_date   : values.cargo_ready_date,
					origin_airport_id      : values.origin_airport_id,
					destination_airport_id : values.destination_airport_id,
					commodity,
					commodity_details,
					inco_term              : values.inco_term || undefined,
					packages_count         : packagesCount,
					weight                 : totalWeight,
					volume                 : totalVolume,
					packages               : newPackages,
					logistics_service_type : values?.service_name || undefined,
					dry_ice_required       : values?.dry_ice_required || false,
					payment_type           : values?.payment_type,
					load_selection_type:
						values.calculate_by === 'unit'
							? 'cargo_per_package'
							: 'cargo_gross',
					status: 'active',
				},
			],
		};
	}

	payload = { ...payload, ...additionalServiceData };
	return payload;
};

export default formatPayload;
