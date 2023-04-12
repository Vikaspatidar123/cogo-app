import { Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import Layout from '../../../../../Layout';

import styles from './styles.module.css';

import useUpsell from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useUpsell';

const serviceCustomNames = {
	origin_haulage      : 'ICD to Port Haulage',
	destination_haulage : 'Port to ICD Haulage',
};

function FormSearch({ extraParams, service, onClose, shipment_data, services }) {
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
	const { control, formValues, handleSubmit } = formProps;

	let rednerForm = (
		<Layout
			controls={controls}
			control={control}
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
					<Modal.Header title={`Add ${startCase(service?.type)} ${
						serviceCustomNames[service?.service_type]
							|| startCase(service?.service_type)
					}`}
					/>
					<Modal.Body>
						<div className={styles.content}>
							{rednerForm}
						</div>
					</Modal.Body>
				</div>
				<Modal.Footer>
					<Button
						themeType="secondary"
						onClick={onClose}
						disabled={loading}
						id="shipment_form_header_cancel"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={loading}
						style={{ marginLeft: 16 }}
						id="shipment_form_header_submit"
					>
						{loading ? 'Adding Service...' : 'Submit'}
					</Button>
				</Modal.Footer>

			</form>
		</div>
	);
}

export default FormSearch;
