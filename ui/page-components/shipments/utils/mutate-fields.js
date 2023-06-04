/* eslint-disable no-param-reassign */
import {
	addDays,
	formatDateToString,
	subtractDays,
	differenceInDays,
} from '@cogo/date';

import incoTermMapping from '../configurations/common/inco-term-mapping.json';

const cut_off_dates_keys = [
	'vgm_cutoff',
	'si_cutoff',
	'document_cutoff',
	'gate_in_cutoff',
	'bn_expiry',
	'tr_cutoff',
	'carting_cutoff',
];

const limitedDateRangeKeys = [
	'gated_in_at',
	'picked_up_at',
	'si_filed_at',
	'vessel_arrived_at',
	'vessel_arrived_at_origin',
	'ams_filed_at',
	'alert_status_at',
];

const mutateFields = ({
	fields = {},
	data = {},
	shipment_data = {},
	setBlChangeShow = () => {},
	setBlVal = () => {},
	setPaymentTermChange = () => {},
	setPaymentTermVal = () => {},
}) => {
	const trade_type = incoTermMapping[shipment_data?.inco_term];

	Object.keys(fields).forEach((key) => {
		if (
			shipment_data?.shipment_type === 'fcl_freight'
			&& key === 'shipper_contact_status'
		) {
			if (shipment_data?.shipper_contact_status === 'pending') {
				fields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
					{ label: 'Retry', value: 'retry' },
				];
			} else if (shipment_data?.shipper_contact_status === 'retry') {
				fields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Retry', value: 'retry' },
				];
			} else {
				fields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
				];
			}

			fields[key].value =				fields[key].value || shipment_data?.shipper_contact_status;
		}

		if (key === 'bl_category' && data?.task === 'update_bl_type') {
			const { onChange } = fields.bl_category;
			fields.bl_category.onChange = (val) => {
				const showModal =					(val === 'hbl' && trade_type === 'export')
					|| (val === 'mbl' && trade_type === 'import');

				if (showModal) {
					setBlChangeShow(true);
					setBlVal(val);
				} else {
					onChange(val);
				}
			};
		}

		if (key === 'payment_term' && data?.task === 'update_payment_term') {
			const { onChange } = fields.payment_term;
			fields.payment_term.onChange = (val) => {
				const showModal =					(val === 'prepaid' && trade_type === 'import')
					|| (val === 'collect' && trade_type === 'export');

				if (showModal) {
					setPaymentTermChange(true);
					setPaymentTermVal(val);
				} else {
					onChange(val);
				}
			};
		}

		if (key === 'schedule_departure' && data?.task === 'upload_booking_note') {
			const minDeparture = new Date();
			fields[key].minDate = formatDateToString(minDeparture);
			const daysDifference = differenceInDays(
				new Date(fields?.schedule_departure?.value),
				minDeparture,
			);
			if (daysDifference < 0) {
				fields?.schedule_departure.onChange(formatDateToString(minDeparture));
			}
		}
		if (key === 'schedule_arrival' && data?.task === 'upload_booking_note') {
			const minArrival = addDays(fields?.schedule_departure?.value, 1);
			const daysDifference = differenceInDays(
				new Date(fields?.schedule_arrival?.value),
				minArrival,
			);
			if (daysDifference < 0) {
				fields?.schedule_arrival.onChange(formatDateToString(minArrival));
			}
			fields[key].minDate = minArrival;
		}
		if (key === 'movement_details' && data?.task === 'upload_booking_note') {
			const length = fields?.movement_details?.childFormat?.length;

			(fields?.movement_details?.value || []).forEach((value) => {
				value.service_type = 'fcl_freight_service';
				value.schedule_arrival = value?.schedule_arrival
					? formatDateToString(value?.schedule_arrival)
					: '';
				value.schedule_departure = value?.schedule_departure
					? formatDateToString(value?.schedule_departure)
					: '';
			});

			if (length > 1) {
				(fields?.movement_details?.childFormat || []).forEach((child, i) => {
					const maxDate = fields?.schedule_arrival?.value;
					const minDate = fields?.movement_details.childFormat[i]?.fields?.schedule_departure
						?.value || fields?.schedule_departure?.value;

					child.fields.schedule_arrival.maxDate = formatDateToString(maxDate);
					child.fields.schedule_arrival.minDate = formatDateToString(minDate);

					if (i !== 0) {
						const index = i - 1;
						const last_schedule_arrival_date = fields?.movement_details.childFormat[index]?.fields
							?.schedule_arrival?.value;

						child.fields.schedule_departure.minDate = formatDateToString(
							last_schedule_arrival_date,
						);
						child.fields.schedule_departure.maxDate =							formatDateToString(maxDate);
					}
				});
			}
		}
		if (cut_off_dates_keys.includes(key)) {
			const minCutOff = addDays(new Date(), 1);
			const maxCutoff = subtractDays(fields?.schedule_departure?.value, 1);
			fields[key].minDate = minCutOff;
			fields[key].maxDate = maxCutoff;
		}

		if (limitedDateRangeKeys.includes(key)) {
			fields[key].minDate = subtractDays(new Date(), 2);
			fields[key].maxDate = new Date();
		}

		if (key === 'vessel_departed_at') {
			fields[key].minDate = new Date(
				shipment_data?.container_details[0]?.gated_in_at,
			);
			fields[key].maxDate = new Date();
		}

		if (key === 'gated_out_at') {
			fields[key].minDate = new Date();
			fields[key].maxDate = new Date();
		}
	});

	return fields;
};

export default mutateFields;
