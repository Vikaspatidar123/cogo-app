import { DateRangepicker, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import FilterDropDownContent from './FilterDropDownContent';
import styles from './styles.module.css';

function Filter({
	carrierList,
	durationValue,
	onChange, clearAllHandler,
	handleCheckList,
	departureDate,
	setDepartureDate,
	arrivalDate,
	setArrivalDate,
}) {
	const { t } = useTranslation(['oceanSchedule']);

	return (
		<div className={styles.col_container}>
			<div className={styles.button_container}>
				<Button
					onClick={() => clearAllHandler()}
					type="button"
					themeType="accent"
				>
					{t('oceanSchedule:clear_all_text')}
				</Button>
			</div>
			<div className={styles.filter_item}>
				{t('oceanSchedule:transit_duration_text')}
				{' '}
				:
				<div>
					<div style={{ textAlign: 'center' }}>{durationValue}</div>
					<input
						type="range"
						min="0"
						max="60"
						value={durationValue}
						className={styles.slider}
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
				{t('oceanSchedule:carrier_text')}
				:
				<FilterDropDownContent
					list={carrierList}
					events={handleCheckList}
					value="carrier"
				/>
			</div>
			<div className={styles.filter_item}>
				{t('oceanSchedule:departure_text')}
				:
				<DateRangepicker
					value={departureDate}
					onChange={setDepartureDate}
					id="active_oc_sc_departure_date"
					isPreviousDaysAllowed
				/>
			</div>
			<div className={styles.filter_item}>
				{t('oceanSchedule:arrival_text')}
				:
				<DateRangepicker
					value={arrivalDate}
					onChange={setArrivalDate}
					id="active_oc_sc_arrival_date"
					isPreviousDaysAllowed
				/>
			</div>
		</div>
	);
}

export default Filter;
