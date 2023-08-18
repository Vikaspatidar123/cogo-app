import { Modal, Button, cl, ButtonIcon } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import airControls from '../../configurations/air-booking-controls';
import fclControls from '../../configurations/fcl-booking-controls';
import lclControls from '../../configurations/lcl-booking-controls';
import { SERVICE_ICON_MAPPING } from '../../configurations/service-icon-mapping';
import useCreateContractBooking from '../../hooks/useCreateContractBooking';
import { formattedBookingPayload } from '../../utils/getFormattedBookingPayload';
import { getSubUnit } from '../../utils/getUnit';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

function InitiateBooking({
	data = {},
	showBookingModal,
	setShowBookingModal = () => {},
	primaryServicesDetails: primaryServicesDetailsArray = [],
	contractId = '',
	added_additional_services: additionalServices = [],
}) {
	const [departureDate, setDepartureDate] = useState('');
	const [intialFormData, setIntialFormData] = useState({});

	const {
		service_type = 'fcl_freight',
		upcoming_shipment_data: upcomingShipmentData = {},
		contractStartDate,
		contractEndDate,
		source,
		contract_type,
	} = data || {};

	const { quantity = '1', start_date = '', end_date = '' } = upcomingShipmentData || {};

	const contractValidity = {
		contractStartDate,
		contractEndDate,
	};

	const isFtlPresentInFcl = additionalServices.includes('ftl_freight') && service_type === 'fcl_freight';

	const isTruckingPresentInLcl = additionalServices.includes('ftl_freight') && service_type === 'lcl_freight';

	const contractWithCogoport = source === 'manual' && contract_type === 'with_cogoport';

	const { createBooking, loading } = useCreateContractBooking();

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
		fcl_freight: fclControls({
			contractValidity,
			departureDate,
			primaryServicesDetailsArray,
		}),
		lcl_freight: lclControls({
			contractValidity,
			departureDate,
			primaryServicesDetailsArray,
		}),
		air_freight: airControls({
			contractValidity,
			departureDate,
			primaryServicesDetailsArray,
		}),
	};

	const { defaultValues, fields } = SERVICE_CONTROLS_MAPPING[service_type] || [];

	const {
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		control,
	} = useForm({ defaultValues });

	const formValues = watch();
	const showElements = showElementsFunc(fields, formValues);
	const shipmentStartDate = watch('departure');

	const handleFormSubmit = (item) => {
		const formattedData = formattedBookingPayload({ item, data, contractId });
		createBooking(formattedData);
	};

	useEffect(() => {
		setDepartureDate(shipmentStartDate);
	}, [shipmentStartDate]);

	useEffect(() => {
		if (service_type === 'fcl_freight') {
			setIntialFormData(defaultValues?.attributes);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setValue('containers_count', quantity);
		setValue('volume', service_type === 'lcl_freight' ? quantity : 1);
		setValue('weight', service_type === 'air_freight' ? quantity : 1);
		setValue('departure', new Date() > start_date ? start_date : '');
		setValue('arrival', new Date() > end_date ? end_date : '');
	}, [upcomingShipmentData, setValue, quantity, service_type, start_date, end_date]);

	return (
		<Modal
			size="xl"
			show={showBookingModal}
			onClose={() => setShowBookingModal(false)}
			onOuterClick={() => setShowBookingModal(false)}
		>
			<div>

				<div className={cl`${styles.header} ${styles.modal_header}`}>
					<div className={styles.header}>
						{SERVICE_ICON_MAPPING[service_type]}
						<h3 className={styles.title}>
							{getSubUnit(service_type)}
							{' '}
							Details
						</h3>
					</div>
					<div className={styles.header}>
						{service_type === 'fcl_freight' ? (
							<Button
								themeType="secondary"
								type="button"
								onClick={() => {
									setValue('attributes', intialFormData);
								}}
							>
								Get Contract Services
							</Button>
						) : null}
						<ButtonIcon icon={<IcMCross />} onClick={() => setShowBookingModal(false)} />
					</div>
				</div>

				<form>
					<div className={styles.row}>
						<FormElement
							controls={fields}
							control={control}
							showElements={showElements}
							errors={errors}
							noScroll
						/>
					</div>
				</form>
				<Modal.Footer>
					<Button
						type="button"
						disabled={loading}
						onClick={handleSubmit(handleFormSubmit)}
					>
						Create booking
					</Button>
				</Modal.Footer>
			</div>
		</Modal>
	);
}

export default InitiateBooking;
