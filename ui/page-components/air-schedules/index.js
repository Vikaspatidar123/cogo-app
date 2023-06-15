import { Button, Pagination } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';
import React, { useState } from 'react';

import Loading from './common/Loading';
import NoSchedulesCard from './components/NoSchedulesCard';
import ScheduleCard from './components/ScheduleCard';
import getControls from './config';
import useCreateSchedule from './hooks/useCreateSchedule';
import useFetchSchedules from './hooks/useFetchSchedules';
import styles from './styles.module.css';

import {
	SelectController,
	asyncFieldsLocations,
	useForm,
	useGetAsyncOptions,
} from '@/packages/forms';

function AirSchedules() {
	const { control, watch } = useForm();
	const [currentPage, setCurrentPage] = useState(1);
	const { createSchedule } = useCreateSchedule();
	const { fetchSchedules, schedules, loading } = useFetchSchedules({
		currentPage,
		setCurrentPage,
	});
	const [errorMessage, setErrorMessage] = useState(false);

	const formValues = watch();

	const airportOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['airport'] } },
		}),
	);
	const handleCreateSchedule = () => {
		if (formValues.origin_airport === formValues.destination_airport) {
			setErrorMessage((prev) => !prev);
			return;
		}
		createSchedule(
			formValues.origin_airport,
			formValues.destination_airport,
		);
	};

	const fields = getControls({ airportOptions });

	return (
		<div className={styles.container}>
			<div className={styles.header}>Air Schedule Tracker</div>
			<div className={styles.tracker_card}>
				<div>
					Enter a airport pair to view and compare and save air
					schedules.
				</div>
				<form className={styles.form_container}>
					<div className={styles.select_container}>
						Origin Airport
						<SelectController {...fields[0]} control={control} />
					</div>
					<div className={styles.icon_container}>
						<IcMPortArrow
							fill="#88CAD1"
							width="2rem"
							height="2rem"
						/>
					</div>
					<div className={styles.select_container}>
						Destination Airport
						<SelectController {...fields[1]} control={control} />
					</div>
					<div className={styles.button_container}>
						<Button
							onClick={handleCreateSchedule}
							disabled={
                                !(formValues.origin_airport
                                && formValues.destination_airport)
                            }
						>
							Search Schedule
						</Button>
					</div>
				</form>
				{errorMessage && (
					<div className={styles.error_message}>
						* origin
						and destination could not be same
					</div>
				)}
			</div>
			<div className={styles.sub_heading_container}>My Schedules</div>
			<div className={styles.schedules_container}>
				{loading && (
					<div className={styles.card}>
						<Loading />
					</div>
				)}
				{!loading && schedules?.list.length > 0 ? (
					schedules?.list?.map((item) => (
						<ScheduleCard
							schedule={item}
							fetchSchedules={fetchSchedules}
							loading={loading}
						/>
					))
				) : (
					<NoSchedulesCard loading={loading} />
				)}
			</div>

			{schedules?.list.length > 0 && (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={currentPage}
						totalItems={schedules?.total_count || 10}
						pageSize={schedules?.page_limit}
						onPageChange={setCurrentPage}
					/>
				</div>
			)}
		</div>
	);
}

export default AirSchedules;
