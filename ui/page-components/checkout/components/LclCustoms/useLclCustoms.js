import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getSearchFormConfig from '../../utils/getServiceConfig';

const useLclCustoms = ({ detail, summary, rate }) => {
	const { primary_service = '', trade_type, importer_exporter } = detail;

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
			let isSelected = !!serviceData[service.name];

			const tempServiceNames = [];

			if (tempServiceNames.includes(service.name)) {
				isSelected = true;
			}

			if (service.name.includes('lcl_customs')) {
				if (service.trade_type !== detail.trade_type) {
					return;
				}
			}

			const data = serviceData[service.name];

			allServices.push({
				...service,
				data,
				isSelected,
			});
		});
	}

	const { services } = detail;

	const { shipping_line } = Object.values(services).filter(
		(service) => service.service_type === 'lcl_customs',
	)[0];
	return {
		shipping_line,
		primary_service,
		trade_type,
		importer_exporter,
		toggleArrow,
		changeToggle,
		allServices,
	};
};

export default useLclCustoms;
