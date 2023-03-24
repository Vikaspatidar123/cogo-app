// import useUpsell from '@cogo/bookings/ShipmentDetails/hooks/useUpsell';
// import startCase from '@cogo/utils/startCase';
// import React from 'react';

// import FormElement from '../../../../commons/Layout';
// import Footer from '../../Footer';

// import { Text, Heading, Container, FormDiv } from './styles';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import useUpsell from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useUpsell';

const serviceCustomNames = {
	origin_haulage      : 'ICD to Port Haulage',
	destination_haulage : 'Port to ICD Haulage',
};

function Form({ extraParams, service, onClose, shipment_data, services }) {
	const {
		controls,
		showElements,
		errors,
		onError,
		addService,
		formProps,
		loading,
	} = useUpsell({
		service,
		shipment_data,
		extraParams,
		services,
	});

	const { fields, formValues, handleSubmit } = formProps;

	let rednerForm = (
		<FormElement
			controls={controls}
			fields={fields}
			errors={errors}
			showElements={showElements}
			formValues={formValues}
		/>
	);

	if (!controls.length) {
		rednerForm = (
			<p className={styles.text}>
				{`Are you sure you want to add ${startCase(
					`${service?.type} ${service?.service}`,
				)} service?`}
			</p>
		);
	}
	return (
		<div>
			<form onSubmit={handleSubmit(addService, onError)}>
				<div className={styles.form_div}>
					<div className={styles.heading}>
						{`Add ${startCase(service?.type)} ${
							serviceCustomNames[service?.service_type]
							|| startCase(service?.service_type)
						}`}
					</div>

					{rednerForm}
				</div>

				<Footer onClose={onClose} isLoading={loading} />
			</form>
		</div>
	);
}

export default Form;
