import { cl } from '@cogoport/components';
import React, { useEffect } from 'react';

import domesticServices from '../../../../../configurations/domestic-services.json';
import Form from '../../../../FormElement';
import getConfiguration from '../../../utils/getConfiguration';

import Service from './Service';
import styles from './styles.module.css';

const freightControls = ['bls_count', 'bl_type'];
const placeServices = {
	origin: [
		'export_transportation',
		'export_fcl_customs',
		'export_haulage_freight',
		'export_fcl_cfs',
		'export_lcl_customs',
		'export_air_customs',
	],
	destination: [
		'import_transportation',
		'import_fcl_customs',
		'import_haulage_freight',
		'import_fcl_cfs',
		'import_lcl_customs',
		'import_air_customs',
	],
};

function Services({
	incoTerm = '',
	mode = '',
	services = {},
	setServices = () => {},
	location = {},
	advancedControls = [],
	fields = {},
	optionsFields = {},
	showElements,
	formValues,
	search_type = '',
	data = {},
	errors = {},
	control,
}) {
	const mapping = getConfiguration('services', mode);
	const details = getConfiguration('service-details', mode);
	const domesticService = domesticServices.includes(mode);

	const servicesList = [mode];
	const servicesListConfig = domesticService
		? mapping || []
		: mapping[incoTerm] || [];

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

	const handleChange = (service) => {
		setServices({ ...services, [service]: !services[service] });
	};

	useEffect(() => {
		let newServices = {};
		servicesList.forEach((service) => {
			if (search_type === 'rfq' || search_type === 'contract') {
				newServices = {
					...newServices,
					[service]: data?.services?.[service] || services[service] || false,
				};
			} else {
				newServices = { ...newServices, [service]: true };
			}
		});
		setServices(newServices);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [incoTerm]);

	const isIncludedInPlace = (conditionService, placeService) => {
		let isIncluded = false;
		(conditionService || []).forEach((service) => {
			if (placeService.includes(service)) {
				isIncluded = true;
			}
		});
		return isIncluded;
	};

	const renderServices = (place) => {
		const placeService = placeServices[place];
		return (
			<>
				<Form
					controls={advancedControls.filter(
						(item) => (item?.condition?.services?.length > 1
								|| !item?.condition?.services)
							&& !freightControls.includes(item.name)
							&& isIncludedInPlace(item?.condition?.services, placeService),
					)}
					fields={{ ...optionsFields, ...fields }}
					showElements={showElements}
					formValues={formValues}
					errors={errors}
					control={control}
				/>
				{servicesList.map((service) => (placeService.includes(service) ? (
					<>
						<Service
							key={service}
							service={service}
							selected={services[service] || false}
							details={details[service]}
							onChange={handleChange}
						/>
						<Form
							controls={advancedControls.filter(
								(item) => item?.condition?.services?.length === 1
										&& item?.condition?.services.includes(service)
										&& !freightControls.includes(item.name),
							)}
							fields={{ ...optionsFields, ...fields }}
							showElements={showElements}
							formValues={formValues}
							errors={errors}
							control={control}
						/>
					</>
				) : null))}
			</>
		);
	};

	const originServices = (servicesList || []).filter((item) => item.includes('export'));
	const destinationServices = (servicesList || []).filter((item) => item.includes('import'));

	return (
		<div className={cl`${search_type === 'rfq' ? styles.rfq : ''} ${styles.container}`}>
			{originServices?.length > 0 ? (
				<>
					<h4 className={styles.title}>ORIGIN SERVICES</h4>
					{renderServices('origin')}
					<div className={styles.line} />
				</>
			) : null}

			{destinationServices?.length > 0 ? (
				<>
					<div className={cl`${styles.title} ${styles.margin_top}`}>DESTINATION SERVICES</div>
					{renderServices('destination')}
				</>
			) : null}
		</div>
	);
}

export default Services;
