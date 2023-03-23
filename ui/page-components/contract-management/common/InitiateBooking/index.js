import { Modal, Popover, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import airControls from '../../configurations/air-booking-controls';
import fclControls from '../../configurations/fcl-booking-controls';
import lclControls from '../../configurations/lcl-booking-controls';
import { SERVICE_ICON_MAPPING } from '../../configurations/service-icon-mapping';
import useCreateContractBooking from '../../hooks/useCreateContractBooking';
import { formattedBookingPayload } from '../../utils/getFormattedBookingPayload';
import { getUnit } from '../../utils/getUnit';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function InitiateBooking({
	data = {},
	showBookingModal,
	setShowBookingModal = () => {},
	readyForBooking,
}) {
	const [departureDate, setDepartureDate] = useState('');
	const {
		service_type = 'fcl_freight',
		upcoming_shipment_data: upcomingShipmentData = {},
		additional_services: additionalServices = [],
		contractStartDate,
		contractEndDate,
		source,
		contract_type,
	} = data || {};

	const contractValidity = {
		contractStartDate,
		contractEndDate,
	};
	const { createBooking, loading } = useCreateContractBooking();

	const isFtlPresentInFcl =		additionalServices.includes('ftl_freight')
		&& service_type === 'fcl_freight';

	const truckingServices = ['ftl_freight', 'ltl_freight'];
	const isTruckingPresentInLcl =		additionalServices.every((i) => truckingServices.includes(i))
		&& service_type === 'lcl_freight';

	const contractWithCogoport =		source === 'manual' && contract_type === 'with_cogoport';

	const showElementsFunc = (controlItems, values) => {
		const showElements = {};
		controlItems.forEach((control) => {
			if (!isFtlPresentInFcl && !isTruckingPresentInLcl) {
				showElements.trucks_count = false;
			}
			if (!contractWithCogoport) {
				showElements.shipping_line_id = false;
				showElements.cargo_weight_per_container = false;
			} else if (control.controls) {
				const childControls = (values[control.name] || []).map((value) => {
					const showObject = {};
					Object.keys(value).forEach((key) => {
						showObject[key] = true;
					});
					return showObject;
				});
				showElements[control.name] = childControls;
			} else {
				showElements[control.name] = true;
			}
		});
		return showElements;
	};

	const SERVICE_CONTROLS_MAPPING = {
		fcl_freight : fclControls(contractValidity, departureDate),
		lcl_freight : lclControls(contractValidity, departureDate),
		air_freight : airControls(contractValidity, departureDate),
	};

	const controls = SERVICE_CONTROLS_MAPPING[service_type] || [];

	const {
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		control,
	} = useForm();

	const formValues = watch();
	const showElements = showElementsFunc(controls, formValues);
	console.log(showElements, 'showElements');
	const shipmentStartDate = watch('departure');

	useEffect(() => {
		setDepartureDate(shipmentStartDate);
	}, [shipmentStartDate]);

	const handleFormSubmit = async (item) => {
		const formattedData = formattedBookingPayload({ item, data });
		await createBooking(formattedData);
	};

	const {
		quantity = '1',
		start_date = '',
		end_date = '',
	} = upcomingShipmentData || {};

	useEffect(() => {
		setValue('containers_count', quantity);
		setValue('volume', service_type === 'lcl_freight' ? quantity : 1);
		setValue('weight', service_type === 'air_freight' ? quantity : 1);
		setValue('departure', new Date() > start_date ? start_date : '');
		setValue('arrival', new Date() > end_date ? end_date : '');
	}, [upcomingShipmentData, setValue, quantity, service_type, start_date, end_date]);

	return (
		<Modal
			show={showBookingModal}
			className="primary md"
			onClose={() => setShowBookingModal(false)}
			onOuterClick={() => setShowBookingModal(false)}
		>
			<div className={styles.container}>
				<div className={styles.header}>
					{SERVICE_ICON_MAPPING[service_type]}
					{' '}
					<div className={styles.text}>
						{getUnit(service_type)}
						{' '}
						Details
					</div>
					{!readyForBooking && (
						<Popover
							placement="bottom"
							content={(
								<div className={styles.Content}>
									You can initiate booking once contract validity begin which is
									on
									<span>
										{format(contractStartDate, 'dd MMM yyyy')}
									</span>
								</div>
							)}
							interactive
							theme="light-border"
						>
							<div>
								<IcMInfo />
							</div>
						</Popover>
					)}
				</div>

				<form>
					<div className={styles.row}>
						{controls?.map((controlItem) => {
							const { type, name } = controlItem;
							const Element = getField(type);
							return (
								<div className={styles.styled_form_item}>
									<p className={styles.label}>{controlItem?.label}</p>
									<Element {...controlItem} control={control} showElements />
									{errors[name]?.type === 'required' || 'pattern' ? (
										<div className={styles.text1}>
											{errors[name]?.message}
										</div>
									) : null}

								</div>
							);
						})}
					</div>

					<Button
						disabled={loading || !readyForBooking}
						onClick={handleSubmit(handleFormSubmit)}
						style={{ float: 'right', margin: '10px' }}
					>
						create booking
					</Button>
				</form>
			</div>
		</Modal>
	);
}

export default InitiateBooking;
