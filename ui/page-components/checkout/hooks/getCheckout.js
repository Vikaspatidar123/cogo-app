/* eslint-disable react-hooks/exhaustive-deps */
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getServiceConfig from '../utils/getServiceConfig';
import persistSearchObject from '../utils/persistSearchObject';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const useGetCheckout = () => {
	const {
		query: { checkout_id },
	} = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const [state, setState] = useState({
		loading             : true,
		summary             : {},
		detail              : {},
		invoice             : {},
		currencyConversions : {},
		rate                : {},
		offers              : {},
	});

	const updateRate = (_, newVal) => {
		setState((prevState) => ({
			...prevState,
			rate: {
				...prevState.rate,
				...newVal,
			},
		}));
	};

	const [{ loading }, trigger] = useRequest({
		url    : '/get_checkout',
		method : 'get',
	}, { manual: true });

	const getCheckout = () => {
		trigger({
			params: {
				id                       : checkout_id,
				freight_display_currency : GLOBAL_CONSTANTS.currency_code.USD,
			},
		})
			.then((response) => {
				const data = response.data || {};

				const { detail, rate, earnable_cogopoints } = data;

				const cogopoint_data = {
					max_redeemable_cogopoints : detail.redeemable_cogopoints,
					redeemed_cogopoints       : detail.redeemed_cogopoints,
					earnable_cogopoints,
				};

				const config = getServiceConfig(detail.primary_service);

				let origin = null;
				let destination = null;
				let port = null;

				const rateObject = {
					...rate,
					services             : [],
					costBreakdown        : [],
					terms_and_conditions : (detail.terms_and_conditions || []).map(
						(term) => ({ message: term }),
					),
				};

				Object.keys(detail.services).forEach((serviceId) => {
					const service = detail.services[serviceId];
					const serviceRate = rate.services[serviceId];

					const serviceName = service.trade_type && service.trade_type !== 'domestic'
						? `${service.trade_type}_${service.service_type}`
						: service.service_type;

					const serviceConfig = config.find(
						(item) => item.name === serviceName,
					);

					const costBreakdownObj = {
						id                : serviceId,
						title             : serviceConfig?.title || startCase(service.service_type),
						currency          : serviceRate.total_price_currency,
						service_type      : service.service_type,
						rate_id           : service.rate?.rate_id,
						validity_id       : service.rate?.validity_id,
						price_discounted  : serviceRate.total_price_discounted,
						price             : serviceRate.total_price,
						name              : serviceName,
						is_rate_available : serviceRate.total_price !== 0,
						line_items        : serviceRate.line_items || [],
					};

					switch (service.service_type) {
						case 'fcl_freight':
							origin = origin || service.origin_main_port || service.origin_port;
							destination = destination || service.destination_main_port || service.destination_port;

							rateObject.destination_detention = {
								free_limit: service.free_days_destination_detention,
							};

							costBreakdownObj.otherDetails = `${service.container_size} ${service.container_type}`;

							break;
						case 'lcl_freight':
							origin = origin || service.origin_main_port || service.origin_port;
							destination = destination || service.destination_main_port || service.destination_port;

							rateObject.destination_detention = {
								free_limit: service.free_days_destination_detention,
							};

							costBreakdownObj.otherDetails = `${service.volume}cbm, ${service.weight}kg`;

							break;
						case 'air_freight':
							origin = origin || service.origin_airport;
							destination = destination || service.destination_airport;

							rateObject.destination_storage = {
								free_limit: service.free_days_destination_storage,
							};

							rateObject.operation_type = rate.operation_type;

							costBreakdownObj.otherDetails = `${service.volume}cbm, ${service.weight}kg`;

							break;
						case 'ftl_freight':
							origin = origin || service.origin_location;
							destination = destination || service.destination_location;

							costBreakdownObj.otherDetails = `${service.truck_type}, ${service.trucks_count} truck(s)`;

							break;
						case 'ltl_freight':
							origin = origin || service.origin_location;
							destination = destination || service.destination_location;
							costBreakdownObj.otherDetails = `${service.weight}, ${service.volume} `;
							break;
						case 'fcl_freight_local':
							port = port || service.port;
							costBreakdownObj.otherDetails = `${service.container_size} ${service.container_type}`;

							break;
						case 'trailer_freight':
							origin = origin || service.origin_location;
							destination = destination || service.destination_location;
							costBreakdownObj.otherDetails = `${service.container_size} ${service.container_type}`;
							break;
						case 'haulage_freight':
							origin = origin || service.origin_location;
							destination = destination || service.destination_location;
							costBreakdownObj.otherDetails = `${service.container_size} ${service.container_type}`;
							break;
						case 'fcl_customs':
							port = port || service.port;
							costBreakdownObj.otherDetails = `${service.container_size} ${service.container_type}`;
							break;
						case 'lcl_customs':
							port = port || service.location;
							costBreakdownObj.otherDetails = `${service.container_size} ${service.container_type}`;
							break;
						case 'air_customs':
							port = port || service.airport;
							costBreakdownObj.otherDetails = `${service.volume}cbm, ${service.weight}kg`;
							break;
						default:
					}

					rateObject.costBreakdown.push(costBreakdownObj);
				});

				rateObject.origin = origin;
				rateObject.destination = destination;
				rateObject.port = port;
				rateObject.validity_end = detail.validity_end;
				rateObject.validity_start = detail.validity_start;

				const summary = {
					containers           : [],
					packages             : [],
					trucks               : [],
					...(data.detail || {}),
					mode                 : detail.primary_service,
					source_id            : detail.source_id,
					currency_conversions : data.currency_conversions,
					touch_points         : data.touch_points,
					trade_type           : data.detail.trade_type,
				};

				Object.keys(summary.services).forEach((serviceId) => {
					const service = summary.services[serviceId];

					if (service.service_type === detail.primary_service) {
						switch (service.service_type) {
							case 'fcl_freight':
								summary.containers.push({
									cargo_weight_per_container:
                    service.cargo_weight_per_container,
									commodity        : service.commodity,
									container_size   : service.container_size,
									container_type   : service.container_type,
									containers_count : service.containers_count,
									inco_term        : service.inco_term,
								});

								summary.inco_term = service.inco_term;

								summary.origin = service.origin_port;
								summary.destination = service.destination_port;

								summary.origin_main = service.origin_main_port;
								summary.destination_main = service.destination_main_port;

								rateObject.bls_count = service.bls_count;
								rateObject.line = service.shipping_line;

								rateObject.inco_term = service.inco_term;
								break;
							case 'air_freight':
								summary.packages.push({
									packages_count : service.packages_count,
									commodity      : service.commodity,
									weight         : service.weight,
									volume         : service.volume,
								});

								summary.origin = service.origin_airport;
								summary.destination = service.destination_airport;
								rateObject.line = service.airline;
								break;
							case 'lcl_freight':
								summary.packages.push({
									packages_count : service.packages_count,
									commodity      : service.commodity,
									weight         : service.weight,
									volume         : service.volume,
								});

								summary.origin = service.origin_port;
								summary.destination = service.destination_port;
								break;
							case 'ftl_freight':
								summary.packages.push({
									commodity    : service.commodity,
									truck_type   : service.truck_type,
									trucks_count : service.trucks_count,
								});

								summary.origin = service.origin_location;
								summary.destination = service.destination_location;
								summary.transit_time = service.rate.transit_time;

								break;
							case 'ltl_freight':
								summary.packages.push({
									commodity : service.commodity,
									weight    : service.weight,
									volume    : service.volume,
								});

								summary.origin = service.origin_location;
								summary.destination = service.destination_location;
								summary.transit_time = service.rate.transit_time;
								break;

							case 'fcl_freight_local':
								summary.packages.push({
									cargo_weight_per_container : service.cargo_weight_per_container,
									commodity                  : service.commodity,
									container_size             : service.container_size,
									container_type             : service.container_type,
									containers_count           : service.containers_count,
								});

								break;
							case 'fcl_customs':
								summary.packages.push({
									cargo_weight_per_container : service.cargo_weight_per_container,
									commodity                  : service.commodity,
									container_size             : service.container_size,
									container_type             : service.container_type,
									containers_count           : service.containers_count,
								});

								break;
							case 'lcl_customs':
								summary.packages.push({
									packages_count : service.packages_count,
									commodity      : service.commodity,
									weight         : service.weight,
									volume         : service.volume,
								});

								break;
							case 'air_customs':
								summary.packages.push({
									packages_count : service.packages_count,
									commodity      : service.commodity,
									weight         : service.weight,
									volume         : service.volume,
								});

								summary.origin = service.origin_airport;
								summary.destination = service.destination_airport;
								rateObject.line = service.airline;
								break;
							default:
						}
					}
				});

				try {
					persistSearchObject(detail.primary_service, summary);
				} catch (e) {
					console.log(e);
				}

				setState({
					rate: {
						...rateObject,
						services: rate?.services,
					},
					detail              : data.detail || {},
					cogopoint_data      : cogopoint_data || {},
					invoice             : data.invoice || {},
					summary,
					loading             : false,
					currencyConversions : data?.currency_conversions || {},
				});
			})
			.catch((e) => {
				console.log(e);
				setState({
					...state,
					loading: false,
				});
			});
	};

	const refetch = (isSetLoading = false) => {
		setState((prevState) => ({
			...prevState,
			loading: isSetLoading ? true : prevState.loading,
		}));
		getCheckout();
	};

	useEffect(() => {
		getCheckout();
	}, []);

	useEffect(() => {
		refetch(true);
	}, [checkout_id]);

	return {
		...state,
		updateRate,
		refetch,
		loading,
	};
};

export default useGetCheckout;
