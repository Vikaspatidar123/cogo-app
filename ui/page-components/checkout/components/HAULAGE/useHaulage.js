import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getSearchFormConfig from '../../utils/getServiceConfig';

const useHaulage = ({ detail, summary, rate }) => {
	const { primary_service = '', importer_exporter } = detail;

	const [toggleArrow, setToggleArrow] = useState(false);

	const changeToggle = () => {
		setToggleArrow(!toggleArrow);
	};

	const allServices = [];

	if (!isEmpty(summary)) {
		const config = getSearchFormConfig(summary.primary_service);

		const serviceData = {};

		const services = rate.costBreakdown || [];

		services.forEach((element, index) => {
			const obj = summary?.services?.[element.id];

			services[index] = { ...services[index], ...obj };

			const serviceName = element.name;

			if (!serviceData[serviceName]) {
				serviceData[serviceName] = [];
			}

			serviceData[serviceName].push(element);
		});

		config.forEach((service) => {
			if (service.service_type === 'haulage_freight') {
				if (service.trade_type === 'export' && !rate.origin?.is_icd) {
					return;
				}

				if (service.trade_type === 'import' && !rate.destination?.is_icd) {
					return;
				}
			}

			let isSelected = !!serviceData[service.name];

			const tempServiceNames = [];
			if (service.name.includes('air_freight_local')) {
				if (Object.keys(serviceData).includes('domestic_air_freight_local')) {
					serviceData.domestic_air_freight_local.forEach((element) => {
						let name = '';
						if (element?.terminal_charge_type === 'outbound') {
							name = 'export';
						} else if (element?.terminal_charge_type === 'inbound') {
							name = 'import';
						}
						tempServiceNames.push(`${name}_${element.service_type}`);
					});
				} else if (Object.keys(serviceData).includes('air_freight_local')) {
					(serviceData?.air_freight_local || []).forEach((element) => {
						let name = '';
						if (element?.terminal_charge_type === 'outbound') {
							name = 'export';
						} else if (element?.terminal_charge_type === 'inbound') {
							name = 'import';
						}
						tempServiceNames.push(`${name}_${element.service_type}`);
					});
				}
			}

			if (tempServiceNames.includes(service.name)) {
				isSelected = true;
			}

			let airFreightLocalData = null;

			if (service.name.includes('air_freight_local')) {
				if (service.trade_type === 'export') {
					airFreightLocalData = (serviceData?.air_freight_local || []).filter(
						(item) => item.terminal_charge_type === 'outbound',
					);
				} else if (service.trade_type === 'import') {
					airFreightLocalData = (serviceData?.air_freight_local || []).filter(
						(item) => item.terminal_charge_type === 'inbound',
					);
				}
			}

			let transportationData = null;

			if (service.name.includes('transportation')) {
				transportationData =					serviceData[`${service.trade_type}_ftl_freight`]
					|| serviceData[`${service.trade_type}_trailer_freight`];

				isSelected = !!transportationData;
			}

			let data = null;

			if (service.name.includes('transportation')) {
				data = transportationData;
			} else if (
				service.name.includes('air_freight_local')
				&& !isEmpty(airFreightLocalData)
			) {
				data = airFreightLocalData;
			} else {
				data = serviceData[service.name];
			}

			allServices.push({
				...service,
				data,
				isSelected,
			});
		});
	}

	const { services } = detail;

	const {
		detention_free_time = '',
		transit_time = '',
		container_size,
		containers_count,
		commodity,
		container_type,
		cargo_weight_per_container,
	} = Object.values(services).filter(
		(service) => service.service_type === 'haulage_freight',
	)[0];

	return {
		container_size,
		container_type,
		containers_count,
		commodity,
		cargo_weight_per_container,
		transit_time,
		detention_free_time,
		allServices,
		changeToggle,
		toggleArrow,
		primary_service,
		importer_exporter,
	};
};
export default useHaulage;
