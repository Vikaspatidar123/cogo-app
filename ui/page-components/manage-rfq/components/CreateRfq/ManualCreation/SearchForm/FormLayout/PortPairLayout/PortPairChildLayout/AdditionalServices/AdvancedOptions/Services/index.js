import { useState } from 'react';

import Service from './Service';
import styles from './styles.module.css';

import Form from '@/ui/page-components/manage-rfq/common/Layout/FormElement';
import getConfiguration from '@/ui/page-components/manage-rfq/configurations/SearchFormControls/getConfiguration';

const FREIGHT_CONTROLS = ['bls_count', 'bl_type'];
const PLACE_SERVICES = {
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

function Services(props) {
	const {
		incoTerm = '',
		mode = '',
		services = {},
		control,
		setServices = () => {},
		location = {},
		advancedControls = [],
		fields = {},
		showElements,
		formValues,
		handleIndex,
		errors = {},
		setExpandServices = () => {},
		expandServices,
	} = props;

	const [checkErrors, setCheckErrors] = useState({});
	const mapping = getConfiguration('services', mode);
	const details = getConfiguration('service-details', mode);

	const servicesList = [mode];
	const servicesListConfig = mapping[incoTerm] || [];

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

	const handleChange = (service, selected) => {
		setServices({
			...services,
			[mode]: {
				...services?.[mode],
				[handleIndex]: {
					...(services?.[mode]?.[handleIndex] || {}),
					[service]: !services?.[mode]?.[handleIndex]?.[service],
				},
			},
		});
		if (!selected || (selected && (expandServices?.[service] || false))) {
			setExpandServices({
				...expandServices,
				[service]: !(expandServices?.[service] || false),
			});
		}
	};

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
		const placeService = PLACE_SERVICES[place];

		return (
			<>
				<Form
					controls={advancedControls.filter(
						(advControl) => (advControl?.condition?.services?.length > 1
								|| !advControl?.condition?.services)
							&& !FREIGHT_CONTROLS.includes(advControl.name)
							&& isIncludedInPlace(advControl?.condition?.services, placeService),
					)}
					control={control}
					fields={fields}
					showElements={showElements}
					formValues={formValues}
					errors={errors}
				/>

				{servicesList.map((service) => (placeService.includes(service) ? (
					<>
						<Service
							service={service}
							selected={services?.[mode]?.[handleIndex]?.[service] || false}
							details={details[service]}
							onChange={handleChange}
							setExpandServices={setExpandServices}
							expandServices={expandServices}
							checkErrors={checkErrors}
						/>

						<Form
							controls={advancedControls.filter(
								(advControl) => advControl?.condition?.services?.length === 1
										&& advControl?.condition?.services.includes(service)
										&& !FREIGHT_CONTROLS.includes(advControl.name),
							)}
							fields={fields}
							control={control}
							showElements={showElements}
							formValues={formValues}
							errors={errors}
							showForm={expandServices?.[service] || false}
							setCheckErrors={setCheckErrors}
							service={service}
						/>
					</>
				) : null))}
			</>
		);
	};

	const originServices = (servicesList || []).filter((item) => item.includes('export'));
	const destinationServices = (servicesList || []).filter((item) => item.includes('import'));

	return (
		<div className={styles.container}>
			{originServices?.length > 0 && (
				<>
					<div className={styles.title}>ORIGIN SERVICES</div>
					{renderServices('origin')}
					<div className={styles.line} />
				</>
			)}

			{destinationServices?.length > 0 && (
				<>
					<div className={`${styles.title} ${styles.margin_top}`}>
						DESTINATION SERVICES
					</div>
					{renderServices('destination')}
				</>
			)}
		</div>
	);
}

export default Services;
