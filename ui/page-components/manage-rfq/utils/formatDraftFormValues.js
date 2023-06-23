import CLASS_MAPPING from '../configurations/SearchFormControls/air-class-mapping';

import getAdditionalServicesFromDraft from './getAdditionalServicesFromDraft';

const commoditySubTypePrefill = ({
	commodity,
	commodity_type,
	commodity_subtype,
	commodity_class,
	temp_controlled_type,
	temp_controlled_range,
}) => {
	if (commodity === 'general') {
		return commodity_type;
	}
	if (
		commodity === 'special_consideration'
		&& commodity_type === 'other_special'
	) {
		return commodity_subtype;
	}
	if (commodity === 'special_consideration' && commodity_type === 'dangerous') {
		let classDescription = '';
		Object.keys(CLASS_MAPPING).forEach((element) => {
			const newElement = CLASS_MAPPING[element];
			if (
				newElement?.class_id === commodity_class?.class_id
				&& newElement?.subclass_id === commodity_class?.subclass_id
				&& newElement?.subclass_codes?.toString()
					=== (commodity_class?.subclass_codes || [])?.toString()
			) {
				classDescription = element;
			}
		});

		return classDescription;
	}
	if (
		commodity === 'special_consideration'
		&& commodity_type === 'temp_controlled'
	) {
		return `${temp_controlled_type}-${temp_controlled_range}`;
	}
	return '';
};

const formatDraftFormValues = ({
	draftListData = [],
	setDraftFormData = () => {},
	setServices = () => {},
	setOriginDetails,
	setDestinationDetails,
	rfqId,
}) => {
	let serviceType = '';
	setDraftFormData({ rfq_id: rfqId });

	draftListData.forEach((draftData = []) => {
		serviceType = draftData?.search_type;

		draftData?.searches.forEach((draftSearchItem, index) => {
			let newFormData = {};
			let newContainers = [];
			const mainService = `${serviceType}_services_attributes`;
			const containers = draftSearchItem?.search_params?.[mainService];
			const incoTerm = containers?.[0]?.inco_term;

			let search_rates = {
				remarks: [
					{
						min_origin_detention : draftSearchItem?.min_origin_detention || '',
						min_origin_demurrage : draftSearchItem?.min_origin_demurrage || '',
						min_destination_detention:
							draftSearchItem?.min_destination_detention || '',
						min_destination_demurrage:
							draftSearchItem?.min_destination_demurrage || '',
						[serviceType === 'air_freight'
							? 'preferred_air_lines'
							: 'preferred_shipping_lines']:
							draftSearchItem?.preferred_operator_ids || [],
						[serviceType === 'air_freight'
							? 'excluded_air_lines'
							: 'excluded_shipping_lines']:
							draftSearchItem?.preferred_operator_ids || [],
						price: {
							currency : draftSearchItem?.preferred_price_currency,
							price    : draftSearchItem?.preferred_price || '',
						},
					},
				],
			};

			setOriginDetails((prev) => ({
				...prev,
				[serviceType]: {
					...prev?.[serviceType],
					[index]: draftSearchItem?.origin_detail || {},
				},
			}));
			setDestinationDetails((prev) => ({
				...prev,
				[serviceType]: {
					...prev?.[serviceType],
					[index]: draftSearchItem?.destination_detail || {},
				},
			}));

			const additional_services = getAdditionalServicesFromDraft({
				data     : draftSearchItem?.search_params,
				serviceType,
				incoTerm,
				index,
				location : {
					origin      : draftSearchItem?.origin_detail || {},
					destination : draftSearchItem?.destination_detail || {},
				},
				setServices,
			});

			if (serviceType === 'fcl_freight') {
				search_rates = {
					...search_rates,
					destination_port_id : containers?.[0]?.destination_port_id,
					origin_port_id      : containers?.[0]?.origin_port_id,
					inco_term           : incoTerm,
					additional_services,
				};

				(containers || []).forEach((container) => {
					const singleContainer = {
						cargo_weight_per_container : container?.cargo_weight_per_container,
						commodity                  : container?.commodity,
						container_size             : container?.container_size,
						container_type             : container?.container_type,
						containers_count           : container?.containers_count,
					};
					newContainers = [...newContainers, singleContainer];
				});
				newFormData = {
					...newFormData,
					id           : draftSearchItem?.id,
					search_rates : [{ ...search_rates, containers: newContainers }],
				};
				const draftId = draftSearchItem?.rfq_draft_id;

				setDraftFormData((prev) => ({
					...prev,
					formData: {
						...prev?.formData,
						[serviceType]: {
							...prev?.formData?.[serviceType],
							data: [
								...(prev?.formData?.[serviceType]?.data || []),
								newFormData,
							],
							draft_id: draftId,
						},
					},
					serviceType: !(prev?.serviceType || []).includes(serviceType)
						? [...(prev?.serviceType || []), serviceType]
						: [...(prev?.serviceType || [])],
				}));
			}

			if (serviceType === 'lcl_freight') {
				search_rates = {
					...search_rates,
					destination_port_id : containers?.[0]?.destination_port_id,
					origin_port_id      : containers?.[0]?.origin_port_id,
					inco_term           : incoTerm,
					commodity           : containers?.[0]?.commodity,
					calculate_by        : 'total',
					additional_services,
				};

				(containers || []).forEach((container) => {
					const singleContainer = {
						volume         : container?.volume,
						weight         : container?.weight,
						packages_count : container?.packages_count,
					};
					newContainers = [...newContainers, singleContainer];
				});
				newFormData = {
					...newFormData,
					id           : draftSearchItem?.id,
					search_rates : [{ ...search_rates, containers: newContainers }],
				};
				const draftId = draftSearchItem?.rfq_draft_id;

				setDraftFormData((prev) => ({
					...prev,
					formData: {
						...prev?.formData,
						[serviceType]: {
							...prev?.formData?.[serviceType],
							data: [
								...(prev?.formData?.[serviceType]?.data || []),
								newFormData,
							],
							draft_id: draftId,
						},
					},
					serviceType: !(prev?.serviceType || []).includes(serviceType)
						? [...(prev?.serviceType || []), serviceType]
						: [...(prev?.serviceType || [])],
				}));
			}

			if (serviceType === 'air_freight') {
				const calculateBy = containers?.[0]?.load_selection_type;

				const commodity = containers?.[0]?.commodity;
				const {
					commodity_class = {},
					commodity_type = '',
					commodity_subtype = '',
					temp_controlled_range = '',
					temp_controlled_type = '',
				} = containers?.[0]?.commodity_details?.[0] || {};

				search_rates = {
					...search_rates,
					additional_services,
					inco_term              : incoTerm,
					payment_type           : containers?.[0]?.payment_type,
					dry_ice_required       : containers?.[0]?.dry_ice_required,
					service_name           : containers?.[0]?.logistics_service_type,
					cargo_ready_date       : containers?.[0]?.cargo_clearance_date,
					origin_airport_id      : containers?.[0]?.origin_airport_id,
					destination_airport_id : containers?.[0]?.destination_airport_id,
					commodity_type         : commodity === 'general' ? commodity : commodity_type,
					calculate_by           : calculateBy === 'cargo_per_package' ? 'unit' : 'total',
					commodity_subtype      : commoditySubTypePrefill({
						commodity,
						commodity_type,
						commodity_subtype,
						commodity_class,
						temp_controlled_type,
						temp_controlled_range,
					}),
				};

				(containers?.[0]?.packages || []).forEach((packageDetails) => {
					let singleContainer = {};
					if (calculateBy === 'cargo_per_package') {
						singleContainer = {
							length         : packageDetails?.length,
							width          : packageDetails?.width,
							height         : packageDetails?.height,
							packages_count : packageDetails?.packages_count,
							packing_type   : packageDetails?.packing_type,
							package_weight : packageDetails?.package_weight,
							handling_type  : packageDetails?.handling_type,
						};
					} else {
						singleContainer = {
							volume         : containers?.[0]?.volume,
							package_weight : containers?.[0]?.weight,
							packages_count : containers?.[0]?.packages_count,
							packing_type   : packageDetails?.packing_type,
							handling_type  : packageDetails?.handling_type,
						};
					}
					newContainers = [...newContainers, singleContainer];
				});
				newFormData = {
					...newFormData,
					id           : draftSearchItem?.id,
					search_rates : [
						{
							...search_rates,
							[calculateBy !== 'cargo_per_package'
								? 'containers'
								: 'dimensions']: newContainers,
						},
					],
				};
				const draftId = draftSearchItem?.rfq_draft_id;

				setDraftFormData((prev) => ({
					...prev,
					formData: {
						...prev?.formData,
						[serviceType]: {
							...prev?.formData?.[serviceType],
							data: [
								...(prev?.formData?.[serviceType]?.data || []),
								newFormData,
							],
							draft_id: draftId,
						},
					},
					serviceType: !(prev?.serviceType || []).includes(serviceType)
						? [...(prev?.serviceType || []), serviceType]
						: [...(prev?.serviceType || [])],
				}));
			}
		});
	});
};

export default formatDraftFormValues;
