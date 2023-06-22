import getGeoConstants from '@/ui/commons/constants/geo';

const formatSwbPayload = ({
	service_details,
	touch_points,
	values,
	wayToBook,
}) => {
	const fcl_freight_params = [];
	const lcl_freight_params = [];
	const air_freight_params = [];
	const fcl_freight_local_params = [];
	const lcl_freight_local_params = [];
	const air_freight_local_params = [];
	const haulage_freight_params = [];
	const ftl_freight_params = [];
	const ltl_freight_params = [];
	const fcl_customs_params = [];
	const lcl_customs_params = [];
	const air_customs_params = [];
	const fcl_cfs_params = [];
	const subsidiary_services_params = [];
	const rail_domestic_freight_params = [];
	const cargo_insurance_params = [];
	const geo = getGeoConstants();
	const INCO_TERM_EXPORT = ['cif', 'cfr', 'cpt', 'cip', 'dat', 'dap', 'ddp'];
	// const INCO_TERM_IMPORT = ['ddp', 'exw', 'fob', 'fas', 'fca'];

	const default_service_provider_id = geo.uuid.cogoxpress_id; // cogoport internal service provider

	const serviceRatesFunc = (id) => {
		const service_rates = values?.service_rates;

		return service_rates?.[id];
	};

	Object.values(service_details).forEach((service) => {
		const free_days = INCO_TERM_EXPORT.includes(service?.inco_term) ? 4 : 10;

		if (service?.service_type === 'fcl_freight') {
			const suitable_schedule = values?.suitable_schedule;
			const suitable_schedule_arr = suitable_schedule?.split('_');
			const service_rate = serviceRatesFunc(service?.id);

			fcl_freight_params.push({
				origin_port_id             : service?.origin_port_id,
				destination_port_id        : service?.destination_port_id,
				container_size             : service?.container_size,
				container_type             : service?.container_type,
				commodity                  : service?.commodity,
				containers_count           : service?.containers_count,
				bls_count                  : service?.bls_count,
				bl_type                    : service?.bl_type,
				inco_term                  : service?.inco_term,
				cargo_weight_per_container : service?.cargo_weight_per_container,
				refer_temperature          : service?.refer_temperature,
				refer_humidity             : service?.refer_humidity,
				refer_ventilation          : service?.refer_ventilation,
				refer_vent_setting         : service?.refer_vent_setting,
				origin_cargo_handling_type : service?.origin_cargo_handling_type,
				destination_cargo_handling_type:
					service?.destination_cargo_handling_type,
				shipping_line_id:
					values?.shipping_line_id
					|| service?.shipping_line_id
					|| service?.selected_shipping_line_id,
				origin_main_port_id: service?.origin_port?.is_icd
					? values?.origin_main_port_id || service?.origin_main_port_id
					: undefined,
				destination_main_port_id: service?.destination_port?.is_icd
					? values?.destination_main_port_id
					|| service?.destination_main_port_id
					: undefined,
				departure : suitable_schedule_arr?.[1] || values?.departure || undefined,
				arrival   : suitable_schedule_arr?.[0] || values?.arrival || undefined,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				transit_time:
					suitable_schedule_arr?.[2] || values?.transit_time || undefined,
				number_of_stops:
					suitable_schedule_arr?.[3] || values?.number_of_stops || undefined,
				rate: {
					line_items : service_rate?.line_items || [],
					margins    : service_rate?.margins || [],
					source:
						wayToBook === 'spot_booking'
							? 'spot_line_booking'
							: service_rate?.source || 'direct',
					validity_start        : service_rate?.validity_start,
					validity_end          : service_rate?.validity_end,
					rate_id               : service_rate?.rate_id,
					tags                  : service_rate?.tags,
					validity_id           : service_rate?.validity_id,
					service_id            : service_rate?.service_id,
					weight_limit          : service_rate?.weight_limit,
					likes_count           : values?.likes_count,
					dislikes_count        : values?.dislikes_count,
					is_liked              : values?.is_liked || 0,
					is_disliked           : values?.is_disliked || 0,
					origin_detention      : service_rate?.origin_detention,
					destination_detention : service_rate?.destination_detention,
					origin_demurrage      : service_rate?.origin_demurrage,
					destination_demurrage : service_rate?.destination_demurrage,
					origin_plugin         : service_rate?.origin_plugin,
					destination_plugin    : service_rate?.destination_plugin,
				},
				free_days_origin_detention:
					Number(values?.free_days_detention_origin)
					|| Number(values?.origin_detention?.free_limit)
					|| 0,
				free_days_origin_demurrage:
					Number(values?.free_days_demurrage_origin)
					|| Number(values?.origin_demurrage?.free_limit)
					|| 0,
				free_days_origin_plugin:
					Number(values?.origin_plugin?.free_limit) || free_days,
				free_days_destination_detention:
					Number(values?.free_days_detention_destination)
					|| Number(values?.destination_detention?.free_limit)
					|| 0,
				free_days_destination_demurrage:
					Number(values?.free_days_demurrage_destination)
					|| Number(values?.destination_demurrage?.free_limit)
					|| 0,
				free_days_destination_plugin:
					Number(values?.destination_plugin?.free_limit) || free_days,
				status                         : 'active',
				indicative_sell_price_currency : values?.indicative_sell_price_currency,
				indicative_sell_price          : values?.indicative_sell_price,
			});
		} else if (service?.service_type === 'lcl_freight') {
			const service_rate = serviceRatesFunc(service?.id);

			lcl_freight_params.push({
				origin_port_id      : service?.origin_port_id,
				destination_port_id : service?.destination_port_id,
				commodity           : service?.commodity,
				packages_count      : service?.packages_count,
				bls_count           : service?.bls_count,
				bl_type             : service?.bl_type || undefined,
				inco_term           : service?.inco_term,
				weight              : service?.weight,
				volume              : service?.volume,
				rate                : {
					line_items     : service_rate?.line_items || [],
					margins        : service_rate?.margins || [],
					source         : service_rate?.source || 'direct',
					validity_start : service_rate?.validity_start,
					validity_end   : service_rate?.validity_end,
					rate_id        : service_rate?.rate_id,
					tags           : service_rate?.tags,
					validity_id    : service_rate?.validity_id,
					service_id     : service_rate?.service_id,
					weight_limit   : service_rate?.weight_limit,
					likes_count    : values?.likes_count,
					dislikes_count : values?.dislikes_count,
					is_liked       : values?.is_liked || 0,
					is_disliked    : values?.is_disliked || 0,
				},
				departure : values?.departure || undefined,
				arrival   : values?.arrival || undefined,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				number_of_stops                : values?.number_of_stops || undefined,
				transit_time                   : values?.transit_time || undefined,
				origin_storage_free_limit      : 0,
				destination_storage_free_limit : 0,
				status                         : 'active',
			});
		} else if (service?.service_type === 'air_freight') {
			const all_commodity_details = service?.commodity_details?.[0];

			const commodity_details = {
				msds_document : values?.msds_certificate || undefined,
				packing_list  : values?.packing_list || undefined,
			};

			Object.keys(all_commodity_details || {}).forEach((commodity) => {
				if (all_commodity_details?.[commodity] !== null) {
					commodity_details[commodity] = all_commodity_details?.[commodity];
				}
			});

			const service_rate = serviceRatesFunc(service?.id);

			air_freight_params.push({
				origin_airport_id      : service?.origin_airport_id,
				destination_airport_id : service?.destination_airport_id,
				operation_type         : service?.operation_type || 'passenger',
				commodity              : service?.commodity,
				commodity_details      : [commodity_details],
				inco_term              : service?.inco_term,
				packages_count         : service?.packages_count,
				packages               : service?.packages,
				weight                 : service?.weight,
				volume                 : service?.volume,
				cargo_value            : service?.cargo_value || undefined,
				cargo_value_currency   : service?.cargo_value_currency || undefined,
				airline_id             : values?.airline_id,
				payment_type           : service?.payment_type,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				departure                      : values?.departure || undefined,
				arrival                        : values?.arrival || undefined,
				logistics_service_type         : service?.logistics_service_type || undefined,
				cargo_clearance_date           : service?.cargo_clearance_date,
				transit_time                   : values?.transit_time || undefined,
				number_of_stops                : values?.number_of_stops || undefined,
				origin_storage_free_limit      : 0,
				destination_storage_free_limit : 0,
				rate                           : {
					line_items     : service_rate?.line_items || [],
					margins        : service_rate?.margins || [],
					source         : service_rate?.source || 'direct',
					validity_start : service_rate?.validity_start,
					validity_end   : service_rate?.validity_end,
					rate_id        : service_rate?.rate_id,
					tags           : service_rate?.tags,
					validity_id    : service_rate?.validity_id,
					service_id     : service_rate?.service_id,
					weight_limit   : service_rate?.weight_limit,
					likes_count    : values?.likes_count,
					dislikes_count : values?.dislikes_count,
					is_liked       : values?.is_liked || 0,
					is_disliked    : values?.is_disliked || 0,
				},
				status     : 'active',
				price_type : 'net_net',
			});
		} else if (service?.service_type === 'fcl_freight_local') {
			const service_rate = serviceRatesFunc(service?.id);

			fcl_freight_local_params.push({
				port_id             : service?.port_id,
				trade_type          : service?.trade_type,
				container_size      : service?.container_size,
				container_type      : service?.container_type,
				commodity           : service?.commodity,
				containers_count    : service?.containers_count,
				free_days_detention : 2,
				free_days_demurrage : 2,
				free_days_plugin    : 2,
				shipping_line_id    : values?.shipping_line_id,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				rate: {
					line_items : service_rate?.line_items || [],
					margins    : service_rate?.margins || [],
					source     : !service_rate?.is_rate_available
						? 'billed_at_actuals'
						: service_rate?.source,
				},
				bls_count : 1,
				status    : 'active',
			});
		} else if (service?.service_type === 'lcl_freight_local') {
			const service_rate = serviceRatesFunc(service?.id);

			lcl_freight_local_params.push({
				trade_type     : service?.trade_type,
				port_id        : service?.port_id,
				weight         : service?.weight,
				volume         : service?.volume,
				packages_count : service?.packages_count,
				bls_count      : service?.bls_count,
				bl_type        : service?.bl_type || undefined,
				commodity      : service?.commodity,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				rate: {
					line_items : service_rate?.line_items || [],
					margins    : service_rate?.margins || [],
					source     : service_rate?.source || 'direct',
				},
				storage_free_limit : service?.storage_free_limit,
				status             : 'active',
			});
		} else if (service?.service_type === 'air_freight_local') {
			const all_commodity_details = service?.commodity_details?.[0];
			const commodity_details = {};

			Object.keys(all_commodity_details || {}).forEach((commodity) => {
				if (all_commodity_details?.[commodity] !== null) {
					commodity_details[commodity] = all_commodity_details?.[commodity];
				}
			});

			const service_rate = serviceRatesFunc(service?.id);

			air_freight_local_params.push({
				trade_type             : service?.trade_type,
				airport_id             : service?.airport_id,
				operation_type         : service?.operation_type || undefined,
				weight                 : service?.weight,
				volume                 : service?.volume,
				payment_type           : service?.payment_type,
				logistics_service_type : service?.logistics_service_type || undefined,
				terminal_charge_type   : service?.terminal_charge_type || undefined,
				commodity_details      : [commodity_details],
				cargo_value            : service?.cargo_value || undefined,
				cargo_value_currency   : service?.cargo_value_currency || undefined,
				packages_count         : service?.packages_count,
				packages               : service?.packages,
				commodity              : service?.commodity,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				rate: {
					line_items : service_rate?.line_items || [],
					margins    : service_rate?.margins || [],
					source     : !service_rate?.is_rate_available
						? 'billed_at_actuals'
						: service_rate?.source,
				},
				airline_id         : values?.airline_id,
				storage_free_limit : service?.storage_free_limit,
				status             : 'active',
			});
		} else if (
			service?.service_type === 'trailer_freight'
			|| service?.service_type === 'haulage_freight'
		) {
			const service_rate = serviceRatesFunc(service?.id);

			const import_origin =				service?.service_type === 'trailer_freight'
				? service?.origin_location_id
				: values?.destination_main_port_id;

			const export_destination =				service?.service_type === 'trailer_freight'
				? service?.destination_location_id
				: values?.origin_main_port_id;

			haulage_freight_params.push({
				trade_type: service?.trade_type,
				origin_location_id:
					service?.trade_type === 'export'
						? service?.origin_location_id
						: import_origin,
				destination_location_id:
					service?.trade_type === 'import'
						? service?.destination_location_id
						: export_destination,
				container_size             : service?.container_size,
				container_type             : service?.container_type,
				commodity                  : service?.commodity,
				containers_count           : service?.containers_count,
				cargo_weight_per_container : service?.cargo_weight_per_container,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				trailer_count:
					service?.service_type === 'trailer_freight'
						? service?.containers_count
						: null,
				transport_mode:
					service?.service_type === 'trailer_freight' ? 'trailer' : 'rail',
				shipping_line_id:
					service?.haulage_type === 'carrier'
						? service?.shipping_line_id || values?.shipping_line_id
						: null,
				service_type : service?.service_type,
				haulage_type : service?.haulage_type || 'merchant',
				rate         : {
					line_items : service_rate?.line_items || [],
					margins    : service_rate?.margins || [],
					source     : service_rate?.source || 'direct',
				},
				status: 'active',
			});
		// eslint-disable-next-line no-dupe-else-if
		} else if (service?.service_type === 'trailer_freight') {
			haulage_freight_params.push({});
		} else if (service?.service_type === 'ftl_freight') {
			const touch_points_arr = touch_points?.primary_service?.enroute;
			const ftl_freight_service_touch_points_attributes = (
				touch_points_arr || []
			).map((touch_point) => ({
				touch_point_location_id : touch_point?.touch_point_location_id,
				halt_time_value         : Number(touch_point?.halt_time_value) || undefined,
				halt_time_unit          : touch_point?.halt_time_unit || undefined,
				touch_point_type        : touch_point?.touch_point_type || 'enroute',
				sequence_number         : Number(touch_point?.sequence_number || 1),
				trip_type               : touch_point?.trip_type || 'one_way',
			}));

			const service_rate = serviceRatesFunc(service?.id);

			if (values?.truck_details) {
				(values?.truck_details || []).forEach((value) => {
					ftl_freight_params.push({
						trade_type              : service?.trade_type,
						origin_location_id      : service?.origin_location_id,
						destination_location_id : service?.destination_location_id,
						trucks_count            : service?.trucks_count || value?.trucks_count,
						truck_type              : service?.truck_type || value?.truck_type,
						weight                  : service?.weight || undefined,
						volume                  : service?.volume || undefined,
						packages                : service?.packages,
						trip_type               : service?.trip_type || undefined,
						commodity               : service?.commodity || undefined,
						service_provider_id:
							service_rate?.service_provider_id || default_service_provider_id,
						rate: {
							line_items          : service_rate?.line_items || [],
							margins             : service_rate?.line_items || [],
							source              : service_rate?.source || 'direct',
							transit_time        : service_rate?.transit_time,
							detention_free_time : service_rate?.detention_free_time,
						},
						status: 'active',
						ftl_freight_service_touch_points_attributes,
					});
				});
			} else {
				ftl_freight_params.push({
					trade_type              : service?.trade_type,
					origin_location_id      : service?.origin_location_id,
					destination_location_id : service?.destination_location_id,
					trucks_count            : service?.trucks_count,
					truck_type              : service?.truck_type,
					weight                  : service?.weight || undefined,
					volume                  : service?.volume || undefined,
					packages                : service?.packages,
					trip_type               : service?.trip_type || undefined,
					commodity               : service?.commodity || undefined,
					service_provider_id:
						service_rate?.service_provider_id || default_service_provider_id,
					rate: {
						line_items          : service_rate?.line_items || [],
						margins             : service_rate?.line_items || [],
						source              : service_rate?.source || 'direct',
						transit_time        : service_rate?.transit_time,
						detention_free_time : service_rate?.detention_free_time,
					},
					status: 'active',
					ftl_freight_service_touch_points_attributes,
				});
			}
		} else if (service?.service_type === 'ltl_freight') {
			const service_rate = serviceRatesFunc(service?.id);

			ltl_freight_params.push({
				trade_type              : service?.trade_type,
				origin_location_id      : service?.origin_location_id,
				destination_location_id : service?.destination_location_id,
				weight                  : service?.weight || undefined,
				volume                  : service?.volume || undefined,
				commodity               : service?.commodity || undefined,
				packages                : service?.packages,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				rate: {
					line_items   : service_rate?.line_items || [],
					margins      : service_rate?.margins || [],
					source       : service_rate?.source || 'direct',
					transit_time : service_rate?.transit_time || undefined,
				},
				status: 'active',
			});
		} else if (service?.service_type === 'fcl_customs') {
			const service_rate = serviceRatesFunc(service?.id);

			fcl_customs_params.push({
				trade_type          : service?.trade_type,
				cargo_handling_type : service?.cargo_handling_type,
				port_id             : service?.port_id,
				container_size      : service?.container_size,
				container_type      : service?.container_type,
				commodity           : service?.commodity,
				containers_count    : service?.containers_count,
				bls_count           : service?.bls_count,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				rate: {
					line_items   : service_rate?.line_items || [],
					margins      : service_rate?.margins || [],
					source       : service_rate?.source || 'direct',
					transit_time : service_rate?.transit_time,
				},
				status: 'active',
			});
		} else if (service?.service_type === 'lcl_customs') {
			const service_rate = serviceRatesFunc(service?.id);

			lcl_customs_params.push({
				trade_type     : service?.trade_type,
				location_id    : service?.location_id,
				weight         : service?.weight,
				volume         : service?.volume,
				packages_count : service?.packages_count,
				bls_count      : service?.bls_count,
				commodity      : service?.commodity,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				rate: {
					line_items : service_rate?.line_items || [],
					margins    : service_rate?.margins || [],
					source     : service_rate?.source || 'direct',
				},
				status: 'active',
			});
		} else if (service?.service_type === 'air_customs') {
			const service_rate = serviceRatesFunc(service?.id);

			air_customs_params.push({
				trade_type     : service?.trade_type,
				airport_id     : service?.airport_id,
				commodity      : service?.commodity || undefined,
				packages_count : service?.packages_count,
				weight         : service?.weight,
				volume         : service?.volume,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				rate: {
					line_items : service_rate?.line_items || [],
					margins    : service_rate?.margins || [],
					source     : service_rate?.source || 'direct',
				},
				status: 'active',
			});
		} else if (service?.service_type === 'fcl_cfs') {
			const service_rate = serviceRatesFunc(service?.id);

			fcl_cfs_params.push({
				trade_type                 : service?.trade_type,
				cargo_handling_type        : service?.cargo_handling_type,
				port_id                    : service?.port_id,
				container_size             : service?.container_size,
				container_type             : service?.container_type,
				commodity                  : service?.commodity,
				containers_count           : service?.containers_count,
				bls_count                  : service?.bls_count,
				cargo_weight_per_container : service?.cargo_weight_per_container,
				service_provider_id:
					service_rate?.service_provider_id || default_service_provider_id,
				rate: {
					line_items : service_rate?.line_items || [],
					margins    : service_rate?.margins || [],
					source     : service_rate?.source || 'direct',
				},
				status: 'active',
			});
		} else if (service?.service_type === 'subsidiary') {
			const service_rate = serviceRatesFunc(service?.id);

			subsidiary_services_params.push({
				location_id:
					service?.port_id
					|| service?.airport_id
					|| service?.location_id
					|| undefined,
				origin_location_id:
					service?.origin_location_id
					|| service?.origin_airport_id
					|| service?.origin_location_id
					|| undefined,
				destination_location_id:
					service?.destination_location_id
					|| service?.destination_airport_id
					|| service?.destination_location_id
					|| undefined,
				container_size   : service?.container_size || undefined,
				container_type   : service?.container_type || undefined,
				commodity        : service?.commodity || undefined,
				containers_count : service?.containers_count || undefined,
				bls_count        : service?.bls_count || undefined,
				trucks_count     : service?.trucks_count || undefined,
				truck_type       : service?.truck_type || undefined,
				weight           : service?.weight || undefined,
				volume           : service?.volume || undefined,
				packages_count   : service?.packages_count || undefined,
				cargo_weight_per_container:
					service?.cargo_weight_per_container || undefined,
				haulage_type          : service?.haulage_type || undefined,
				transport_mode        : service?.transport_mode || undefined,
				packages              : service?.packages || undefined,
				trade_type            : service?.trade_type || undefined,
				code                  : service?.code || undefined,
				service_name          : service?.service_name || undefined,
				service_type          : service?.service || undefined,
				service               : service?.service_type || undefined,
				commodity_description : service?.commodity_description || undefined,
				bl_type               : service?.bl_type || undefined,
				shipping_line_id      : service_rate?.shipping_line_id || undefined,
				airline_id            : service_rate?.airline_id || undefined,
				service_provider_id:
					service_rate?.service_provider_id
					|| default_service_provider_id
					|| undefined,
				rate: {
					line_items : service_rate?.line_items || [],
					margins    : service_rate?.margins || [],
					source     : service_rate?.is_rate_available
						? service_rate?.source || 'spot_rates'
						: 'direct',
				},
				status: 'active',
			});
		} else if (service?.service_type === 'rail_domestic_freight') {
			const {
				origin_location_id = '',
				destination_location_id = '',
				additional_service_type = '',
				cargo_readiness_date = '',
				cargo_value = '',
				cargo_description = '',
				container_load_type = '',
				container_load_sub_type = '',
				container_size = '',
				container_type = '',
				cargo_weight_per_container = '',
				containers_count = '',
				commodity = '',
				commodity_subtype = '',
				packing_type = '',
				trade_type = '',
				transport_mode = '',
				status = '',
			} = service || {};

			rail_domestic_freight_params.push({
				origin_location_id,
				destination_location_id,
				additional_service_type,
				cargo_readiness_date,
				cargo_value,
				cargo_description,
				container_load_type,
				container_load_sub_type,
				container_size,
				container_type,
				cargo_weight_per_container : Number(cargo_weight_per_container),
				containers_count           : Number(containers_count),
				commodity,
				commodity_subtype,
				packing_type,
				trade_type,
				transport_mode,
				status,
				rate                       : {
					line_items : [],
					margins    : [],
				},
				service_provider_id: default_service_provider_id || undefined,
			});
		} else if (service?.service_type === 'cargo_insurance') {
			const service_rate = serviceRatesFunc(service?.id);

			const {
				origin_country_id = '',
				destination_country_id = '',
				cargo_value = '',
				cargo_value_currency = '',
				cargo_insurance_commodity_description = '',
				commodity = '',
				cargo_insurance_commodity_id = '',
				trade_type = '',
				transit_mode = '',
				status = '',
				saas_rate = '',
				risk_coverage = '',
			} = service || {};

			cargo_insurance_params.push({
				origin_country_id,
				destination_country_id,
				cargo_value,
				cargo_value_currency,
				cargo_insurance_commodity_description,
				commodity,
				cargo_insurance_commodity_id,
				trade_type,
				transit_mode,
				status,
				saas_rate,
				risk_coverage,
				rate: {
					line_items : service_rate?.line_items || [],
					margins    : service_rate?.margins || [],
					source     : service_rate?.source || 'spot_rates',
				},
				service_provider_id: default_service_provider_id || undefined,
			});
		}
	});

	return {
		fcl_freight_services_attributes           : fcl_freight_params,
		lcl_freight_services_attributes           : lcl_freight_params,
		air_freight_services_attributes           : air_freight_params,
		fcl_freight_local_services_attributes     : fcl_freight_local_params,
		lcl_freight_local_services_attributes     : lcl_freight_local_params,
		air_freight_local_services_attributes     : air_freight_local_params,
		haulage_freight_services_attributes       : haulage_freight_params,
		ftl_freight_services_attributes           : ftl_freight_params,
		ltl_freight_services_attributes           : ltl_freight_params,
		fcl_customs_services_attributes           : fcl_customs_params,
		lcl_customs_services_attributes           : lcl_customs_params,
		air_customs_services_attributes           : air_customs_params,
		fcl_cfs_services_attributes               : fcl_cfs_params,
		subsidiary_services_attributes            : subsidiary_services_params,
		rail_domestic_freight_services_attributes : rail_domestic_freight_params,
		cargo_insurance_services_attributes       : cargo_insurance_params,
	};
};

export default formatSwbPayload;
