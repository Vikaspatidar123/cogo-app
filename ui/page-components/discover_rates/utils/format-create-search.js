/* eslint-disable default-param-last */
import { isEmpty } from '@cogoport/utils';

import {
	HAZ_CLASSES,
	FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING,
} from '@/ui/commons/constants/commodities';
import getGeoConstants from '@/ui/commons/constants/geo';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import { getCountryCode } from '@/ui/commons/utils/getCountryDetails';
import getFormattedValues from '@/ui/commons/utils/getFormattedValues';

const mergeContainerDetails = (containers) => {
	const mergedValues = {};
	containers.forEach((container) => {
		const key = `${container?.container_size}_${container?.container_type}_${container?.commodity}`;
		const isCargoWeight = 'cargo_weight_per_container' in container;

		mergedValues[key] = {
			...container,
			containers_count:
                (mergedValues[key]?.containers_count || 0)
                + (container.containers_count || 0),
			cargo_weight_per_container: isCargoWeight
				? Math.max(
					mergedValues[key]?.cargo_weight_per_container
                          || container?.cargo_weight_per_container,
					container.cargo_weight_per_container,
				)
				: undefined,
		};
	});
	return Object.values(mergedValues);
};

const formatDataForSingleService = ({
	rawParams = {},
	mode = '',
	values = {},
	type = null,
	service = '',
	checked = true,
}) => {
	const geo = getGeoConstants();
	const originCountryCode = getCountryCode({ country_id: rawParams?.origin_country_id });
	const destinationCountryCode = getCountryCode({ country_id: rawParams?.destination_country_id });

	if (mode === 'fcl_freight') {
		const newValues = (values.containers || []).map((item) => ({
			origin_port_id      : values.origin_port_id,
			destination_port_id : values.destination_port_id,
			container_size      : item.container_size || '20',
			container_type      : item.container_type || 1,
			commodity:
                item?.commodity && item?.commodity !== 'all_commodity' ? item?.commodity : 'general',
			containers_count : Number(item.containers_count),
			bls_count        : Number(values.bls_count || 1),
			inco_term        : values?.inco_term || 'cif',
			cargo_weight_per_container:
                Number(item?.cargo_weight_per_container) || null,
			status: 'active',
		}));

		return mergeContainerDetails(newValues);
	}

	if (mode === 'lcl_freight') {
		return [
			{
				origin_port_id      : values.origin_port_id,
				destination_port_id : values.destination_port_id,
				commodity:
                    values?.commodity && values?.commodity !== 'all_commodity' ? values?.commodity : 'general',
				inco_term      : values.inco_term || 'cif',
				bls_count      : Number(values.bls_count || 1),
				packages_count : Number(values.packages_count || 1),
				weight         : Number(values.weight || 1),
				volume         : Number(values.volume || 1),
				status         : 'active',
			},
		];
	}

	if (mode === 'air_freight') {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		return [
			{
				cargo_clearance_date   : tomorrow,
				origin_airport_id      : values.origin_airport_id,
				destination_airport_id : values.destination_airport_id,
				commodity:
                    values?.commodity && values?.commodity !== 'all_commodity' ? values?.commodity : 'general',
				commodity_details   : values?.commodity_details,
				inco_term           : values.inco_term || 'cif',
				packages_count      : Number(values.packages_count || 1),
				weight              : Number(values.weight || 1),
				volume              : Number(values.volume || 1),
				status              : 'active',
				packages            : values?.packages || undefined,
				dry_ice_required    : values?.dry_ice_required || false,
				load_selection_type : values?.load_selection_type,
				payment_type        : 'prepaid',
			},
		];
	}

	if (mode === 'fcl_freight_local') {
		const newValues = (values.containers || []).map((item) => ({
			port_id: type === 'export' ? values.origin_port_id || values.port_id
				: values.destination_port_id || values.port_id,
			container_size : item.container_size || '20',
			container_type : item.container_type || 1,
			commodity:
                item?.commodity && item?.commodity !== 'all_commodity' ? item?.commodity : 'general',
			shipping_line_id : values.shipping_line_id,
			containers_count : Number(item.containers_count),
			bls_count        : Number(values.bls_count || 1),
			trade_type       : type || values.trade_type,
			...(values.is_pass_through_selected === 'pass_through' && {
				rate: {
					line_items : [],
					margins    : [],
				},

				service_provider_id: geo.uuid.cogoxpress_id,
			}),
			cargo_weight_per_container:
                Number(item?.cargo_weight_per_container) || null,
			status: 'active',
		}));

		return mergeContainerDetails(newValues);
	}

	if (mode === 'lcl_freight_local') {
		return [
			{
				port_id: type === 'export' ? values.origin_port_id || values.location_id
					: values.destination_port_id || values.location_id,
				commodity: values?.commodity && values?.commodity !== 'all_commodity'
					? values?.commodity
					: 'general',
				shipping_line_id : values.shipping_line_id,
				trade_type       : type || values.trade_type,
				bls_count        : Number(values.bls_count || 1),
				packages_count   : Number(values.packages_count || 1),
				weight           : Number(values.weight || 1),
				volume           : Number(values.volume || 1),
				status           : 'active',
			},
		];
	}

	if (mode === 'air_freight_local') {
		return [
			{
				airport_id: type === 'export'
					? values.origin_airport_id || values.airport_id
					: values.destination_airport_id || values.airport_id,
				trade_type           : type || values.trade_type,
				terminal_charge_type : values?.terminal_charge_type || undefined,
				logistics_service_type:
                    rawParams?.logistics_service_type || undefined,
				payment_type : values?.payment_type || undefined,
				cargo_value  : rawParams?.cargo_value || undefined,
				cargo_value_currency:
                    rawParams?.cargo_value_currency || undefined,
				dry_ice_required : rawParams?.dry_ice_required,
				packages_count   : Number(values.packages_count || 1),
				weight           : Number(values.weight || 1),
				volume           : Number(values.volume || 1),
				status           : 'active',
				commodity        : values?.commodity && values?.commodity !== 'all_commodity'
					? values?.commodity
					: 'general',
				commodity_details : values?.commodity_details,
				packages          : values?.packages,
				airline_id        : values.airline_id,
			},
		];
	}

	if (mode === 'fcl_customs') {
		const value = {};
		let cargo_handling_type = values?.cargo_handling_type;
		let cargo_value = null;
		let cargo_value_currency = null;
		let address = null;
		let ad_code = null;

		const FCL_CUSTOMS_SUPPORTED_COUNTRY = GLOBAL_CONSTANTS.service_supported_countries
			.fcl_customs.countries;

		const isOriginCountrySupported = FCL_CUSTOMS_SUPPORTED_COUNTRY.includes(originCountryCode);
		const isDestinationCountrySupported = FCL_CUSTOMS_SUPPORTED_COUNTRY.includes(destinationCountryCode);
		const isExport = values?.trade_type === 'export' || type === 'export';
		const isImport = values?.trade_type === 'import' || type === 'import';

		if (isExport) {
			if (isOriginCountrySupported && rawParams?.origin_port?.is_icd === true
			) {
				value.country_id = rawParams?.origin_port?.country_id;
			} else {
				value.port_id = rawParams?.source === 'upsell'
                    && isOriginCountrySupported
                    && rawParams?.origin_main_port_id
					? rawParams?.origin_main_port_id
					: values?.port_id || values?.origin_port_id;
			}

			cargo_handling_type = mode === 'fcl_cfs' ? values?.export_fcl_cfs_cargo_handling_type
                    || values?.cargo_handling_type : values?.export_transportation_cargo_handling_type
                      || values?.cargo_handling_type;

			cargo_value = mode === 'fcl_cfs' ? values?.export_fcl_cfs_cargo_value
				: values?.export_transportation_cargo_value;

			cargo_value_currency = mode === 'fcl_cfs' ? values?.export_fcl_cfs_cargo_value_currency
				: values?.export_transportation_cargo_value_currency;

			address = mode === 'fcl_cfs' ? values?.export_fcl_cfs_address
				: values?.export_fcl_customs;
			ad_code = values?.export_fcl_customs_have_add_code || undefined;
		} else if (isImport) {
			if (isDestinationCountrySupported && rawParams?.destination_port?.is_icd === true
			) {
				value.country_id = rawParams?.destination_port?.country_id;
			} else {
				value.port_id = rawParams?.source === 'upsell'
                    && isDestinationCountrySupported
                    && rawParams?.destination_main_port_id ? rawParams?.destination_main_port_id
					: values?.port_id || values?.destination_port_id;
			}

			cargo_handling_type = mode === 'fcl_cfs' ? values?.import_fcl_cfs_cargo_handling_type
                      || values?.cargo_handling_type : values?.import_transportation_cargo_handling_type
                      || values?.cargo_handling_type;

			cargo_value = mode === 'fcl_cfs' ? values?.import_fcl_cfs_cargo_value
				: values?.import_transportation_cargo_value;

			cargo_value_currency = mode === 'fcl_cfs' ? values?.import_fcl_cfs_cargo_value_currency
				: values?.import_transportation_cargo_value_currency;

			address = mode === 'fcl_cfs' ? values?.import_fcl_cfs_address
				: values?.import_fcl_customs;

			ad_code = values?.import_fcl_cfs_have_ad_code || undefined;
		}

		const newValues = (values.containers || []).map((item) => {
			const commodities = FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING[item.container_type]
                || [];
			return {
				...value,
				container_size : item.container_size || '20',
				container_type : item.container_type || 1,
				commodity      : item?.commodity !== 'all_commodity' && commodities.includes(item.commodity)
					? item.commodity
					: null,
				containers_count     : Number(item.containers_count),
				bls_count            : Number(values.bls_count || 1),
				status               : 'active',
				trade_type           : type || values?.trade_type || 'domestic',
				cargo_handling_type,
				cargo_value          : cargo_value || undefined,
				cargo_value_currency : cargo_value_currency || undefined,
				address              : address || undefined,
				ad_code              : ad_code || undefined,
			};
		});
		return mergeContainerDetails(newValues);
	}

	if (mode === 'fcl_cfs') {
		let port_id = values?.port_id;
		let cargo_handling_type = values?.cargo_handling_type;
		let cargo_value = null;
		let cargo_value_currency = null;
		let address = null;
		let ad_code = null;
		if (values?.trade_type === 'export' || type === 'export') {
			port_id = values?.port_id || values?.origin_port_id;
			cargo_handling_type = mode === 'fcl_cfs'
				? values?.export_fcl_cfs_cargo_handling_type
                      || values?.cargo_handling_type
				: values?.export_transportation_cargo_handling_type
                      || values?.cargo_handling_type;
			cargo_value = mode === 'fcl_cfs'
				? values?.export_fcl_cfs_cargo_value
				: values?.export_transportation_cargo_value;
			cargo_value_currency = mode === 'fcl_cfs'
				? values?.export_fcl_cfs_cargo_value_currency
				: values?.export_transportation_cargo_value_currency;
			address = mode === 'fcl_cfs'
				? values?.export_fcl_cfs_address
				: values?.export_fcl_customs;
			ad_code = values?.export_fcl_customs_have_add_code || undefined;
		} else if (values?.trade_type === 'import' || type === 'import') {
			port_id = values?.port_id || values?.destination_port_id;
			cargo_handling_type = mode === 'fcl_cfs'
				? values?.import_fcl_cfs_cargo_handling_type
                      || values?.cargo_handling_type
				: values?.import_transportation_cargo_handling_type
                      || values?.cargo_handling_type;
			cargo_value = mode === 'fcl_cfs'
				? values?.import_fcl_cfs_cargo_value
				: values?.import_transportation_cargo_value;
			cargo_value_currency = mode === 'fcl_cfs'
				? values?.import_fcl_cfs_cargo_value_currency
				: values?.import_transportation_cargo_value_currency;
			address = mode === 'fcl_cfs'
				? values?.import_fcl_cfs_address
				: values?.import_fcl_customs;
			ad_code = values?.import_fcl_cfs_have_ad_code || undefined;
		}

		const newValues = (values.containers || []).map((item) => {
			const commodities = FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING[item.container_type]
                || [];
			return {
				port_id,
				container_size : item.container_size || '20',
				container_type : item.container_type || 1,
				commodity      : item?.commodity !== 'all_commodity'
                    && commodities.includes(item.commodity)
					? item.commodity
					: null,
				containers_count     : Number(item.containers_count),
				bls_count            : Number(values.bls_count || 1),
				status               : 'active',
				trade_type           : type || values?.trade_type || 'domestic',
				cargo_handling_type,
				cargo_value          : cargo_value || undefined,
				cargo_value_currency : cargo_value_currency || undefined,
				address              : address || undefined,
				ad_code              : ad_code || undefined,
			};
		});
		return mergeContainerDetails(newValues);
	}

	if (mode === 'lcl_customs' || mode === 'air_customs') {
		let port_id = values?.location_id || values?.airport_id;

		if (values?.trade_type === 'export' || type === 'export') {
			port_id = values?.location_id
                || values?.airport_id
                || values?.origin_port_id
                || values?.origin_airport_id;
		} else if (values?.trade_type === 'import' || type === 'import') {
			port_id = values?.location_id
                || values?.airport_id
                || values?.destination_port_id
                || values?.destination_airport_id;
		}
		const airport_id = mode === 'air_customs' ? port_id : undefined;
		const location_id = mode === 'lcl_customs' ? port_id : undefined;
		const lcl_commodity = values?.commodity && values?.commodity !== 'all_commodity'
			? values?.commodity
			: 'general';
		const air_commodity = values.commodity === 'hazardous' ? 'hazardous' : 'all_commodities';
		const commodity = mode === 'air_customs' ? air_commodity : lcl_commodity;
		return [
			{
				location_id,
				airport_id,
				commodity,
				bls_count: mode === 'lcl_customs'
					? Number(values.bls_count || 1)
					: undefined,
				packages_count : Number(values.packages_count || 1),
				weight         : Number(values.weight || 1),
				volume         : Number(values.volume || 1),
				status         : 'active',
				trade_type     : type || values?.trade_type || 'domestic',
			},
		];
	}

	if (mode === 'trailer_freight') {
		const allAttributes = [];
		if (type) {
			const origin_location_id = type === 'export'
				? values?.export_transportation_location_id
                      || values?.port_id
				: values?.destination_port_id
                      || values?.port_id
                      || values?.destination_location_id;
			const destination_location_id = type === 'export'
				? values?.origin_port_id
                      || values?.port_id
                      || values?.origin_location_id
				: values?.import_transportation_location_id
                      || values?.port_id;
			const address = type === 'export'
				? values?.export_transportation_address
				: values?.import_transportation_address;
			const newVals = (values.containers || []).map((container) => ({
				origin_location_id,
				destination_location_id,
				address        : address || undefined,
				container_size : container?.container_size || '20',
				container_type : container?.container_type,
				commodity      : container?.commodity
                    && HAZ_CLASSES.includes(container.commodity)
					? container.commodity
					: null,
				haulage_type     : undefined,
				shipping_line_id : undefined,
				containers_count : Number(container?.containers_count),
				cargo_weight_per_container:
                    Number(container?.cargo_weight_per_container) || undefined,
				trade_type     : type,
				transport_mode : undefined,
				status         : 'active',
			}));
			allAttributes.push(...newVals);
		}
		if (allAttributes.length) {
			return mergeContainerDetails(allAttributes);
		}
		const newVals = (values.containers || []).map((container) => ({
			origin_location_id      : values?.origin_location_id,
			destination_location_id : values?.destination_location_id,
			container_size          : container?.container_size || '20',
			container_type          : container?.container_type,
			commodity               : container?.commodity
                && HAZ_CLASSES.includes(container.commodity)
				? container.commodity
				: null,
			haulage_type     : values?.haulage_type || undefined,
			shipping_line_id : values?.shipping_line_id || undefined,
			containers_count : Number(container?.containers_count),
			cargo_weight_per_container:
                Number(container?.cargo_weight_per_container) || undefined,
			trade_type     : 'domestic',
			transport_mode : 'trailer',
			status         : 'active',
			trip_type      : checked === true ? 'round' : 'one_way',
		}));
		return mergeContainerDetails(newVals);
	}

	if (mode === 'ftl_freight') {
		const allAttributes = [];
		if (type) {
			const origin_location_id = type === 'export'
				? values?.export_transportation_location_id
                      || values?.export_transportation_origin_location_id
                      || values?.port_id
                      || values?.location_id
                      || values?.airport_id
				: values?.destination_port_id
                      || values.destination_airport_id
                      || values?.port_id
                      || values?.location_id
                      || values?.airport_id
                      || values?.destination_location_id;
			const destination_location_id = type === 'export'
				? values?.origin_port_id
                      || values?.origin_airport_id
                      || values?.port_id
                      || values?.location_id
                      || values?.airport_id
                      || values?.origin_location_id
				: values?.import_transportation_location_id
                      || values?.port_id
                      || values?.location_id
                      || values?.airport_id;
			const trucks_count = type === 'export'
				? Number(values?.export_transportation_trucks_count || 1)
				: Number(values?.import_transportation_trucks_count);
			const truck_type = type === 'export'
				? values?.export_transportation_truck_type
				: values?.import_transportation_truck_type;
			const address = type === 'export'
				? values?.export_transportation_address
				: values?.import_transportation_address;
			allAttributes.push({
				origin_location_id,
				destination_location_id,
				address   : address || undefined,
				commodity : values?.commodity && HAZ_CLASSES.includes(values.commodity)
					? values.commodity
					: null,
				truck_type           : truck_type || undefined,
				trucks_count         : trucks_count || undefined,
				cargo_readiness_date : values?.cargo_clearance_date,
				trip_type            : 'one_way',
				weight               : Number(values?.weight || 1),
				volume               : Number(values?.volume || 1),
				trade_type           : type,
				status               : 'active',
			});
		}
		if (allAttributes.length) {
			return allAttributes;
		}
		return [
			{
				origin_location_id      : values?.origin_location_id,
				destination_location_id : values?.destination_location_id,
				commodity               : values?.commodity && HAZ_CLASSES.includes(values.commodity)
					? values.commodity
					: null,
				trucks_count : Number(values?.trucks_count || 1),
				truck_type   : values?.truck_type || undefined,
				trade_type   : 'domestic',
				status       : 'active',
			},
		];
	}

	if (mode === 'ltl_freight') {
		const allAttributes = [];
		if (type) {
			const keysToFormat = [
				'height',
				'length',
				'width',
				'packages_count',
				'package_weight',
			];
			const formattedPackages = [];

			(
				values?.export_transportation_packages
                || values?.import_transportation_packages
                || []
			).forEach((packageObj) => {
				const newPackageObj = {};
				Object.keys(packageObj).forEach((key) => {
					if (keysToFormat.includes(key)) {
						newPackageObj[key] = Number(packageObj[key] || 1);
					} else {
						newPackageObj[key] = packageObj[key];
					}
				});
				formattedPackages.push(newPackageObj);
			});
			const dest = values?.origin_airport_id || undefined;
			const origin = values?.destination_airport_id || undefined;
			const origin_location_id = type === 'export'
				? values?.export_transportation_location_id
                      || values?.export_transportation_origin_location_id
                      || values?.location_id
				: origin;
			const destination_location_id = type === 'export'
				? dest
				: values?.import_transportation_location_id
                      || values?.import_transportation_destination_location_id
                      || values?.location_id;
			const origin_country_id = type === 'import'
                && (values?.service_type === 'lcl_freight' || !origin_location_id)
				? values.destination_country_id
                      || values?.destination?.country_id
                      || values?.country_id
				: undefined;
			const destination_country_id = type === 'export'
                && (values?.service_type === 'lcl_freight'
                    || !destination_location_id)
				? values.origin_country_id
                      || values?.origin?.country_id
                      || values?.country_id
				: undefined;
			const packages = formattedPackages;

			let packagesArr = !isEmpty(packages) ? packages : values?.packages;

			if (
				values?.service_type === 'air_freight'
                && values?.load_selection_type === 'cargo_gross'
			) {
				packagesArr = (packagesArr || []).map((item) => ({
					...item,
					height         : 1,
					width          : 1,
					length         : values?.volume,
					package_weight : values?.weight,
				}));
			}

			if (
				[values?.service_type, values?.search_type].includes(
					'lcl_freight',
				)
			) {
				packagesArr = [
					{
						height         : 1,
						width          : 1,
						length         : Number(values?.volume || 1),
						package_weight : Number(values?.weight || 1),
						packing_type   : 'box',
						handling_type  : 'stackable',
						packages_count : Number(values?.packages_count || 1),
					},
				];
			}

			allAttributes.push({
				origin_location_id,
				destination_location_id,
				origin_country_id,
				destination_country_id,
				commodity: values?.commodity && HAZ_CLASSES.includes(values.commodity)
					? values.commodity
					: null,
				cargo_readiness_date : values?.cargo_clearance_date,
				packages             : packagesArr,
				weight               : Number(values?.weight || 1),
				volume               : Number(values?.volume || 1),
				trade_type           : type,
				status               : 'active',
			});
		}
		if (allAttributes.length) {
			return allAttributes;
		}

		return [
			{
				origin_location_id      : values?.origin_location_id,
				destination_location_id : values?.destination_location_id,
				commodity               : values?.commodity && HAZ_CLASSES.includes(values.commodity)
					? values.commodity
					: null,
				weight     : Number(values?.weight || 1),
				packages   : values?.packages,
				trade_type : 'domestic',
				status     : 'active',
			},
		];
	}

	if (mode === 'haulage_freight') {
		let service_type = '';

		if (
			service === 'export_haulage_freight'
            || (mode === 'haulage_freight' && !values?.checkout_id)
		) {
			service_type = 'haulage_freight';
		} else {
			service_type = 'trailer_freight';
		}

		const import_freight_location = values?.search_type === 'fcl_freight'
			? values?.origin_port_id
			: values?.destination_port_id;

		const export_freight_location = values?.search_type === 'fcl_freight'
			? values?.destination_port_id
			: values?.origin_port_id;

		const fcl_customs_haulage_import_origin = values?.service_type === 'fcl_customs'
			? values?.origin_port_id
			: undefined;

		const fcl_customs_haulage_export_destination = values?.service_type === 'fcl_customs'
			? values?.destination_port_id
			: undefined;

		const location_import_haulage = service_type === 'haulage_freight' && type === 'import'
			? fcl_customs_haulage_import_origin
			: import_freight_location;

		const location_export_haulage = service_type === 'haulage_freight' && type === 'export'
			? fcl_customs_haulage_export_destination
			: export_freight_location;

		const allAttributes = [];

		if (type) {
			const origin_location_id = type === 'export'
				? values?.export_transportation_location_id
                      || values?.origin_port_id
                      || values?.port_id
				: location_import_haulage
                      || values?.destination_main_port_id;
			const destination_location_id = type === 'export'
				? location_export_haulage || values?.origin_main_port_id
				: values?.import_transportation_location_id
                      || values?.destination_port_id
                      || values?.port_id;
			const newVals = (values.containers || []).map((container) => ({
				origin_location_id,
				destination_location_id,
				container_size : container?.container_size || '20',
				container_type : container?.container_type,
				commodity      : container?.commodity
                    && HAZ_CLASSES.includes(container.commodity)
					? container.commodity
					: null,
				haulage_type: values?.search_type === 'fcl_customs'
					? 'merchant'
					: values?.haulage_type || 'carrier',
				shipping_line_id : undefined,
				containers_count : Number(container?.containers_count),
				cargo_weight_per_container:
                    Number(container?.cargo_weight_per_container) || undefined,
				trade_type   : type,
				service_type : service ? service_type : undefined,
				transport_mode:
                    service_type === 'trailer_freight' ? 'trailer' : 'rail',
				status: 'active',
			}));
			allAttributes.push(...newVals);
		}
		if (allAttributes.length) {
			return mergeContainerDetails(allAttributes);
		}
		const newVals = (values.containers || []).map((container) => ({
			origin_location_id      : values?.origin_location_id,
			destination_location_id : values?.destination_location_id,
			container_size          : container?.container_size || '20',
			container_type          : container?.container_type,
			commodity               : container?.commodity
                && HAZ_CLASSES.includes(container.commodity)
				? container.commodity
				: null,
			haulage_type     : values?.haulage_type || undefined,
			shipping_line_id : values?.shipping_line_id || undefined,
			containers_count : Number(container?.containers_count),
			cargo_weight_per_container:
                Number(container?.cargo_weight_per_container) || undefined,
			trade_type     : 'domestic',
			transport_mode : values?.transport_mode || 'rail',
			status         : 'active',
		}));
		return mergeContainerDetails(newVals);
	}

	return [];
};

const getSearchNames = (payload, service, mode) => {
	if (service.includes('import_')) {
		const params = service.split('import_');
		if (params[1] === 'transportation') {
			if (
				(payload?.checkout_id
                    && payload?.import_transportation_cargo_handling_type
                        !== 'destuffing_at_dock'
                    && payload?.service_type === 'fcl_freight')
                || (mode === 'trailer_freight' && payload?.checkout_id)
			) {
				return {
					type : 'import',
					mode : 'haulage_freight',
				};
			}

			if (
				(payload?.import_transportation_cargo_handling_type
                    && payload?.import_transportation_cargo_handling_type
                        !== 'destuffing_at_dock')
                || mode === 'trailer_freight'
			) {
				return {
					type : 'import',
					mode : 'trailer_freight',
				};
			}

			if (
				payload.import_transportation_pickup_type === 'ltl'
                || mode === 'ltl_freight'
			) {
				return {
					type : 'import',
					mode : 'ltl_freight',
				};
			}

			return {
				type : 'import',
				mode : 'ftl_freight',
			};
		}

		return {
			type : 'import',
			mode : params[1],
		};
	}

	if (service.includes('export_')) {
		const params = service.split('export_');
		if (params[1] === 'transportation') {
			if (
				(payload?.checkout_id
                    && payload?.export_transportation_cargo_handling_type
                        === 'stuffing_at_factory'
                    && payload?.service_type === 'fcl_freight')
                || (mode === 'trailer_freight' && payload?.checkout_id)
			) {
				return {
					type : 'export',
					mode : 'haulage_freight',
				};
			}

			if (
				payload?.export_transportation_cargo_handling_type
                    === 'stuffing_at_factory'
                || mode === 'trailer_freight'
			) {
				return {
					type : 'export',
					mode : 'trailer_freight',
				};
			}

			if (
				payload.export_transportation_pickup_type === 'ltl'
                || mode === 'ltl_freight'
			) {
				return {
					type : 'export',
					mode : 'ltl_freight',
				};
			}

			return {
				type : 'export',
				mode : 'ftl_freight',
			};
		}

		return {
			type : 'export',
			mode : params[1],
		};
	}

	return {
		type : 'export',
		mode : null,
	};
};

const formatValuesForSearch = (rawParams) => {
	let params = {};
	Object.keys(rawParams).forEach((param) => {
		if (
			(param === 'packages'
                || param === 'import_transportation_packages'
                || params === 'export_transportation_packages')
            && (rawParams[param] || []).length > 0
		) {
			params = {
				...params,
				[param]: rawParams[param].map((item) => ({
					...item,
					packages_count: item.packages_count || 1,
				})),
			};
		} else if (rawParams[param]) {
			params = { ...params, [param]: rawParams[param] };
		}
	});

	return getFormattedValues(params);
};

const formatCreateSearch = (
	rawParams,
	mode,
	services = {},
	is_service = false,
	checked,
) => {
	const payload = formatValuesForSearch(rawParams);
	const { source, source_id } = payload;
	let newPayload = {};
	if (!is_service || is_service === 'hybrid') {
		newPayload = {
			search_type                 : mode,
			source                      : source || 'platform',
			source_id                   : source === 'upsell' ? source_id : undefined,
			importer_exporter_id        : payload.importer_exporter_id,
			importer_exporter_branch_id : payload.importer_exporter_branch_id,
			user_id                     : payload.user_id || undefined,
		};
	}

	if (
		mode === 'fcl_freight_local'
        && payload.is_pass_through_selected === 'pass_through'
	) {
		newPayload = {
			...newPayload,
			primary_service : 'fcl_freight_local',
			source          : 'pass_through',
			quotation_type  : 'customize',
		};
	}

	if (!is_service && is_service !== 'hybrid') {
		newPayload[`${mode}_services_attributes`] = formatDataForSingleService({
			mode,
			values: payload,
			checked,
		});
	}

	Object.keys(services).forEach((service) => {
		const getNewService = getSearchNames(payload, service, mode);
		if (service !== mode && services[service]) {
			if (rawParams?.checkout_id) {
				newPayload.service = getNewService?.mode;
				newPayload[`${getNewService?.mode}_services_attributes`] = [
					...(newPayload[
						`${getNewService?.mode}_services_attributes`
					] || []),
					...formatDataForSingleService({
						rawParams,
						mode   : getNewService?.mode,
						values : payload,
						type   : getNewService.type,
						service,
					}),
				];
			} else if (
				is_service
                && is_service !== 'hybrid'
                && getNewService?.mode
			) {
				newPayload.service = getNewService?.mode;
				newPayload[`${getNewService?.mode}_services`] = formatDataForSingleService({
					rawParams,
					mode   : getNewService?.mode,
					values : payload,
					type   : getNewService.type,
				});
			} else if (getNewService?.mode) {
				newPayload[`${getNewService?.mode}_services_attributes`] = [
					...(newPayload[
						`${getNewService?.mode}_services_attributes`
					] || []),
					...formatDataForSingleService({
						rawParams,
						mode   : getNewService?.mode,
						values : payload,
						type   : getNewService.type,
					}),
				];
			}
		}
	});

	return newPayload;
};
export default formatCreateSearch;
