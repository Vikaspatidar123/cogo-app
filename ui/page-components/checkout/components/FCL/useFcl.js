import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getSearchFormConfig from '../../utils/getServiceConfig';

const useFcl = ({ detail, rate, summary }) => {
	const { primary_service = '', importer_exporter = {} } = detail;

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
		transit_time = '',
		shipping_line,
		free_days_destination_detention,
		cargo_value_currency,
		cargo_value,
	} = Object.values(services).filter(
		(service) => service.service_type === 'fcl_freight',
	)[0];

	return {
		shipping_line,
		transit_time,
		free_days_destination_detention,
		changeToggle,
		toggleArrow,
		allServices,
		primary_service,
		cargo_value,
		importer_exporter,
		cargo_value_currency,
	};
};

export default useFcl;
