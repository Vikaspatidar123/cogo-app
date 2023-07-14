import { Button, Pagination } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Loading from './common/Loading';
import NoSchedulesCard from './components/NoSchedulesCard';
import ScheduleCard from './components/ScheduleCard';
import useFetchSchedules from './hooks/useFetchSchedules';
import styles from './styles.module.css';

import {
	SelectController,
} from '@/packages/forms';

function OceanSchedules() {
	const { t } = useTranslation(['oceanSchedule']);
	const {
		fetchSchedules, schedules,
		loading, currentPage,
		setCurrentPage,
		control,
		fields,
		handleCreateSchedule,
		errorMessage,
		formValues,
	} = useFetchSchedules();
	const { list = [], total_count = 0, page_limit = 6 } = schedules || {};
	return (
		<div className={styles.container}>
			<div className={styles.header}>{t('oceanSchedule:ocean_schedule_heading')}</div>
			<div className={styles.tracker_card}>
				<div>
					{t('oceanSchedule:ocean_schedule_des')}
				</div>
				<form className={styles.form_container}>
					<div className={styles.select_container}>
						{t('oceanSchedule:origin_port_label')}
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
						{t('oceanSchedule:destination_port_label')}
						<SelectController {...fields[1]} control={control} />
					</div>
					<div className={styles.button_container}>
						<Button
							onClick={handleCreateSchedule}
							type="button"
							disabled={
								!(formValues.origin_port
									&& formValues.destination_port)
							}
						>
							{t('oceanSchedule:search_schedule_button_text')}
						</Button>
					</div>
				</form>
				{errorMessage && (
					<div className={styles.error_message}>
						{t('oceanSchedule:origin_port_error_message')}
					</div>
				)}
			</div>
			<div className={styles.sub_heading_container}>{t('oceanSchedule:my_schedules_text')}</div>
			<div className={styles.schedules_container}>
				{loading && <Loading home />}
				{!loading && !isEmpty(list?.length)
					? ((list || []).map((item) => (
						<ScheduleCard
							key={item.id}
							schedule={item}
							refectSchedules={fetchSchedules}
							loading={loading}
						/>
					))
					) : (
						<NoSchedulesCard loading={loading} />
					)}
			</div>

			{!isEmpty(list?.length) && (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={currentPage}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setCurrentPage}
					/>
				</div>
			)}
		</div>
	);
}

export default OceanSchedules;
