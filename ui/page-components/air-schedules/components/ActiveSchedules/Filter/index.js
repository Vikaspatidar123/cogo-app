/* eslint-disable react-hooks/exhaustive-deps */
import { DateRangepicker, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import FilterDropDownContent from './FilterDropDownContent';
import styles from './styles.module.css';

function Filter({
	setCarrierList, carrierList, setFilters,
}) {
	const [durationValue, onChange] = useState(0);
	const [departureDate, setDepartureDate] = useState({});
	const [arrivalDate, setArrivalDate] = useState({});
	const [filterCarrier, setFilterCarrier] = useState([]);

	useEffect(() => {
		if (carrierList.length > 0) {
			const carriers = carrierList.filter((x) => x.status);
			if (carriers.length > 0) {
				const carriersList = carriers.map((val) => val?.shippingLineId);
				setFilterCarrier(carriersList);
			}
		}
	}, [carrierList]);

	useEffect(() => {
		if (
			filterCarrier.length > 0
			|| Object.keys(departureDate).length
			|| Object.keys(arrivalDate).length
			|| durationValue
		) {
			const transitFilter = durationValue !== 0 ? durationValue : '';
			const airFilter = {
				shipping_line_id : filterCarrier,
				departure_start  : departureDate.endDate !== undefined
					? format(departureDate?.startDate, "UTC:yyyy-MM-dd'T'HH:mm:ssZZ") : null,
				departure_end: departureDate?.endDate !== undefined
					? format(departureDate?.endDate, "UTC:yyyy-MM-dd'T'HH:mm:ssZZ") : null,
				arrival_start: arrivalDate?.startDate !== undefined
					? format(arrivalDate?.startDate, "UTC:yyyy-MM-dd'T'HH:mm:ssZZ") : null,
				arrival_end: arrivalDate?.endDate !== undefined
					? format(arrivalDate?.endDate, "UTC:yyyy-MM-dd'T'HH:mm:ssZZ") : null,
				transit_time: transitFilter,
			};
			setFilters(airFilter);
		}
	}, [
		filterCarrier,
		departureDate?.startDate,
		departureDate?.endDate,
		arrivalDate?.startDate,
		arrivalDate?.endDate,
		durationValue,
	]);

	const handleCheckList = (item, value) => {
		if (value === 'carrier') {
			setCarrierList((prevCarrier) => prevCarrier.map((valueLocal) => (valueLocal.id === item.id
				? { ...valueLocal, status: !valueLocal.status }
				: valueLocal)));
		}
	};

	const clearAllHandler = () => {
		setCarrierList((prevCarrier) => prevCarrier.map((value) => (value.status === true
			? { ...value, status: !value.status } : value)));
		setDepartureDate({});
		setArrivalDate({});
		onChange(0);
		setFilters({});
	};

	return (
		<div className={styles.col_container}>
			<div className={styles.button_container}>
				<Button onClick={clearAllHandler} themeType="accent"> Clear All</Button>
			</div>
			<div className={styles.filter_item}>
				Transit Duration :
				<div>
					<div style={{ textAlign: 'center' }}>{durationValue}</div>
					<input
						type="range"
						min="0"
						max="60"
						value={durationValue}
						id="active_oc_sc_transit_time_input"
						onChange={({ target: { value: radius } }) => {
							onChange(radius);
						}}
						style={{ width: '100%' }}
					/>
					<div style={{
						display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
					}}
					>
						<div>0</div>
						<div>60</div>
					</div>
				</div>
			</div>
			<div className={styles.filter_item}>
				Carrier :
				<FilterDropDownContent
					list={carrierList}
					events={handleCheckList}
					value="carrier"
				/>
			</div>
			<div className={styles.filter_item}>
				Departure :
				<DateRangepicker
					value={departureDate}
					onChange={setDepartureDate}
					id="active_oc_sc_departure_date"
				/>
			</div>
			<div className={styles.filter_item}>
				Arrival :
				<DateRangepicker
					value={arrivalDate}
					onChange={setArrivalDate}
					id="active_oc_sc_arrival_date"
				/>
			</div>
		</div>
	);
}

export default Filter;
