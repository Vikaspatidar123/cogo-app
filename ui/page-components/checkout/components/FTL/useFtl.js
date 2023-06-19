import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getSearchFormConfig from '../../utils/getServiceConfig';

import convertHourToDay from '@/packages/forms/utils/converHourToDay';

const useFtl = ({ detail, summary, rate }) => {
	const { primary_service = '', importer_exporter = {} } = detail;

	const [toggleArrow, setToggleArrow] = useState(false);
	const { touch_points } = summary;

	const touchPointsToShow = touch_points?.primary_service?.enroute || [];

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

	const { packages = [], transit_time = '', services } = summary;
	const { trip_type, free_detention_hours } = Object.values(services).filter(
		(service) => service.service_type === 'ftl_freight',
	)[0];
	const transitTime = convertHourToDay(transit_time);

	return {
		packages,
		trip_type,
		transit_time,
		transitTime,
		free_detention_hours,
		touchPointsToShow,
		allServices,
		changeToggle,
		toggleArrow,
		primary_service,
		importer_exporter,
	};
};
export default useFtl;
