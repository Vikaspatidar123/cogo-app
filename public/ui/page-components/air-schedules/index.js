import { Button, Pagination } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Loading from './common/Loading';
import NoSchedulesCard from './components/NoSchedulesCard';
import ScheduleCard from './components/ScheduleCard';
import useCreateSchedule from './hooks/useCreateSchedule';
import useFetchSchedules from './hooks/useFetchSchedules';
import styles from './styles.module.css';

import {
	SelectController,
} from '@/packages/forms';

function AirSchedules() {
	const { t } = useTranslation(['airSchedule']);
	const {
		handleCreateSchedule,
		errorMessage, formValues, control, fields,
	} = useCreateSchedule();

	const {
		fetchSchedules, schedules, loading,
		setCurrentPage, currentPage,
	} = useFetchSchedules();

	const { list = [], total_count = 0, page_limit = 0 } = schedules || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>{t('airSchedule:heading_text')}</div>
			<div className={styles.tracker_card}>
				<div>
					{t('airSchedule:description_text')}
				</div>
				<form className={styles.form_container}>
					<div className={styles.select_container}>
						{t('airSchedule:origin_air_port_text')}
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
						{t('airSchedule:destination_air_port_text')}
						<SelectController {...fields[1]} control={control} />
					</div>
					<div className={styles.button_container}>
						<Button
							onClick={handleCreateSchedule}
							disabled={
								!(formValues.origin_airport
									&& formValues.destination_airport)
							}
							type="button"
						>
							{t('airSchedule:search_schedule_text')}
						</Button>
					</div>
				</form>
				{errorMessage ? (
					<div className={styles.error_message}>
						{t('airSchedule:error_message')}
					</div>
				) : null}
			</div>
			<div className={styles.sub_heading_container}>{t('airSchedule:my_schedules_text')}</div>
			<div className={styles.schedules_container}>
				{loading ? (
					<div className={styles.card}>
						<Loading home />
					</div>
				) : null}
				{!loading && !isEmpty(list) ? (
					(list || []).map((item) => (
						<ScheduleCard
							key={item.id}
							schedule={item}
							fetchSchedules={fetchSchedules}
							loading={loading}
						/>
					))
				) : (
					<NoSchedulesCard loading={loading} />
				)}
			</div>

			{!isEmpty(list) && (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={currentPage}
						totalItems={total_count || 10}
						pageSize={page_limit}
						onPageChange={setCurrentPage}
					/>
				</div>
			)}
		</div>
	);
}

export default AirSchedules;
