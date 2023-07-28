import { Modal } from '@cogoport/components';
import { addDays, compareAsc, differenceInDays, isEmpty, toDate } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Route from '../Route';

import Footer from './Footer';
import Frequency from './Frequency';
import Schedule from './Schedule';
import ShipmentDetails from './ShipmentDetails';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';
import ShipmentPlanControls from '@/ui/page-components/contract-management/configurations/contract-form-controls';
import useCreateBulkContractUtilisation from
	'@/ui/page-components/contract-management/hooks/useCreateBulkContractUtilisation';

const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;
const FIRST_INDEX = GLOBAL_CONSTANTS.first_index;
const HOUR_VAL = 23;
const MINUTE_VAL = 59;
const SEC_VAL = 59;
const MS_VAL = 999;

const DEFAULT_TIME = GLOBAL_CONSTANTS.zeroth_index;

function CreatePlanModal({
	showModal,
	setShowModal,
	itemData,
	isEditPlan,
	plan_data = [],
	getShipmentPlans = () => {},
	modifiedGroupedData,
	containerDetailsOptions,
	getServiceDetails = () => {},
}) {
	const {
		max_containers_count = 0,
		max_volume = 0,
		max_weight = 0,
		booked_containers_count = 0,
		service_type: serviceType = '',
		origin_port = {},
		destination_port = {},
		destination_airport = {},
		origin_airport = {},
		booked_weight = 0,
		booked_volume = 0,
		origin_main_port = {},
		destination_main_port = {},
		contract_data = {},
		[`${serviceType}_services`]: freightDetails = [],
	} = itemData || {};

	const vesselOptionsLength = containerDetailsOptions.length;
	const [frequency, setFrequency] = useState('');
	const [schedule, setSchedule] = useState('');
	const [disableOptions, setDisableOptions] = useState(false);
	const [freqCount, setFreqCount] = useState('');
	const [error, setError] = useState(false);

	const primaryServiceId = freightDetails.find(
		(service) => service.is_primary_service,
	)?.id;

	const { validity_end_date, validity_start_date } = contract_data;

	const containersLeft = max_containers_count - booked_containers_count;
	const weightLeft = max_weight - booked_weight;
	const volumeLeft = max_volume - booked_volume;

	const useCount = containersLeft || weightLeft || volumeLeft;

	const check = compareAsc(toDate(validity_start_date), new Date());

	const days = differenceInDays(
		new Date(validity_end_date).setUTCHours(HOUR_VAL, MINUTE_VAL, SEC_VAL, MS_VAL),
		check === 1
			? new Date(validity_start_date).setUTCHours(DEFAULT_TIME, DEFAULT_TIME, DEFAULT_TIME, DEFAULT_TIME)
			: new Date().setUTCHours(DEFAULT_TIME, DEFAULT_TIME, DEFAULT_TIME, DEFAULT_TIME),
	) + 1;

	const { createBulkContractUtilisation, loading = false } = useCreateBulkContractUtilisation({
		requestedContainerCount : useCount,
		getShipmentPlans,
		isEditPlan,
		freqCount,
		getServiceDetails,
		freightDetails,
		planData                : plan_data,
	});

	const newControls = ShipmentPlanControls({ validity_start_date, validity_end_date, containerDetailsOptions });

	const {
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
		control,
		watch,
	} = useForm({
		defaultValues: [{
			date_range: {
			},
			sub_create_plan: [{}],
		}],
	});

	// useEffect(() => {
	// 	console.log('ff');
	// 	setValue('create_plan', [{
	// 		max_count  : '',
	// 		date_range : { startDate: '', endDate: '' },
	// 	}]);
	// }, [setValue]);

	const handleFormSubmit = async (data) => {
		await createBulkContractUtilisation({
			data,
			frequency             : frequency === 'others' ? freqCount : frequency,
			schedule,
			setShowModal,
			bookedContainersCount : booked_containers_count,
			serviceId             : primaryServiceId,
			serviceType,
		});
	};

	useEffect(() => {
		if (isEmpty(plan_data)) {
			const firstChild = Math.floor(days / (frequency === 'others' ? freqCount : frequency)) || FIRST_INDEX;

			if (schedule === 'randomly' || (frequency === 'others' && freqCount === '')) {
				setValue('create_plan', [
					{
						container_count : '',
						date_range      : {},
					},
				]);
			}

			if (
				schedule === 'evenly' && frequency !== ''
				&& ((frequency === 'others' && freqCount !== '') || frequency !== 'others')
			) {
				const newDays = frequency === 'others' ? freqCount : frequency;

				if (firstChild < 1 || days < 1) {
					setError(true);
					return;
				}

				setError(false);
				const value = [...Array(firstChild)].map((_, index) => {
					const tempEndDate = addDays(
						check === 1 ? toDate(validity_start_date) : new Date(),
						(index + 1) * newDays - 1,
					);

					const checkEnd = compareAsc(
						toDate(tempEndDate),
						toDate(validity_end_date),
					);

					const newEndDate = checkEnd === 1 ? toDate(validity_end_date) : toDate(tempEndDate);

					return {
						date_range: {
							startDate: addDays(
								check === 1 ? toDate(validity_start_date) : new Date(),
								(index * newDays) || 1,
							),
							endDate: newEndDate,
						},
					};
				});
				setValue('create_plan', value);
			}
		} else {
			const freq_days = [3, 7, 15].includes(
				plan_data?.[ZEROTH_INDEX]?.booking_frequency_days,
			)
				? plan_data?.[ZEROTH_INDEX]?.booking_frequency_days
				: 'others';

			if (freq_days === 'others') {
				setFreqCount(plan_data?.[ZEROTH_INDEX]?.booking_frequency_days);
			}

			setDisableOptions(true);
			setFrequency(`${freq_days}`);
			setSchedule(plan_data?.[0]?.booking_schedule_type);
			setValue('create_plan', modifiedGroupedData.create_plan);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [frequency, schedule, freqCount, plan_data]);

	return (
		<Modal
			show={showModal}
			size="lg"
			onClose={() => setShowModal(false)}
		>
			<div>
				<Modal.Header title="Shipment Plan" />
				<Modal.Body>
					<div style={{ margin: '10px 0 15px' }}>
						<Route
							originPort={origin_port}
							destinationPort={destination_port}
							destinationAirport={destination_airport}
							originAirport={origin_airport}
							serviceType={serviceType}
							origin_main_port={origin_main_port}
							destination_main_port={destination_main_port}
						/>
					</div>
					<div style={{ display: 'flex', color: '#F68B21' }}>
						<div className={styles.validity}>
							Validity :
							{' '}
							{formatDate({
								date       : validity_start_date,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
							{' '}
							to
							{' '}
							{formatDate({
								date       : validity_end_date,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</div>

					</div>

					{days < 1 && !isEditPlan ? (
						<div className={styles.notification}>
							Contract Validity is expired, hence you cannot create plan.
						</div>
					) : (
						<>
							<Frequency
								disableOptions={disableOptions}
								frequency={frequency}
								setFrequency={setFrequency}
								setFreqCount={setFreqCount}
								freqCount={freqCount}
							/>

							<Schedule
								schedule={schedule}
								setSchedule={setSchedule}
								disableOptions={disableOptions}
							/>

							{error ? (
								<div className={styles.error_text}>
									Shipment Frequency days must be less than plan validity days
									{' '}
									<span>
										(
										{Number(days)}
										)
									</span>
								</div>
							) : (
								<ShipmentDetails
									controls={newControls}
									control={control}
									errors={errors}
									schedule={schedule}
									frequency={frequency}
									getValues={getValues}
									handleSubmit={handleSubmit}
									contractServiceId={primaryServiceId}
									serviceType={serviceType}
									freqCount={freqCount}
									vesselOptionsLength={vesselOptionsLength}
									isEditPlan={isEditPlan}
								/>
							)}
						</>
					)}

				</Modal.Body>
				<Modal.Footer>
					<Footer
						loading={loading}
						schedule={schedule}
						setShowModal={setShowModal}
						handleSubmit={handleSubmit}
						handleFormSubmit={handleFormSubmit}
					/>
				</Modal.Footer>
			</div>
		</Modal>
	);
}

export default CreatePlanModal;
