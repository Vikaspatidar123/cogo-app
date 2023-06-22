import { Button, Datepicker } from '@cogoport/components';
import React, { useRef, useState } from 'react';

import useBookShipment from '../../../hooks/useBookShipment';
import PortHeader from '../../PortHeader';

import styles from './style.module.css';

import { useForm } from '@/packages/forms';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';
import SearchForm from '@/ui/page-components/discover_rates/common/SearchForm';

function Form({
	serviceId,
	setOpen,
	service_type,
	origin_id,
	destination_id,
	importer_exporter_id,
	user,
	branch,
	originPort,
	destinationPort,
	originPortCode,
	destinationPortCode,
	originFullName,
	destinationFullName,
	cargoDetailControls,
	control,
}) {
	const bookShipmentRef = useRef({});

	const [dateTimePickerValue, setDateTimePickerValue] = useState();

	const { loading, handleFormSubmit, scheduleLoading } = useBookShipment({
		serviceId,
		setOpen,
		service_type,
		origin_id,
		destination_id,
		importer_exporter_id,
		user,
		branch,
		bookShipmentRef,
		dateTimePickerValue,
	});

	const cargoDetailsFormProps = useForm(cargoDetailControls);
	const { formState: cargodetailsFormState } = cargoDetailsFormProps;

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.row}>
					<div className={styles.col}>
						<PortHeader
							originPort={originPort}
							destinationPort={destinationPort}
							service_type={service_type}
							destinationPortCode={destinationPortCode}
							originPortCode={originPortCode}
							originFullName={originFullName}
							destinationFullName={destinationFullName}
						/>
					</div>

					<div className={styles.col}>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<text className={styles.text}>
								Departure Date
							</text>

							<Datepicker
								width={200}
								withTimePicker
								onChange={setDateTimePickerValue}
								value={dateTimePickerValue}
								isPreviousDaysAllowed={false}
								showTimeSelect
							/>
						</div>
					</div>

					<div className={styles.col}>
						<div className={styles.container_details}>
							<SearchForm
								mode={service_type}
								extraParams={{}}
								search_type="contract"
								ref={(r) => {
									bookShipmentRef.current = r;
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>

				<FormElement
					controls={cargoDetailControls}
					errors={cargodetailsFormState.errors}
					control={control}
				/>
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					type="button"
					style={{ marginRight: 8 }}
					onClick={() => setOpen(false)}
					disabled={loading || scheduleLoading}
					size="md"
					themeType="secondary"
				>
					CANCEL
				</Button>

				<Button
					type="button"
					onClick={handleFormSubmit}
					disabled={loading || scheduleLoading}
				>
					REQUEST BOOKING

				</Button>
			</div>
		</div>
	);
}
export default Form;
