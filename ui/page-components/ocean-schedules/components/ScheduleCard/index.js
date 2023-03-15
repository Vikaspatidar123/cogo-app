import { IcMArrowNext, IcMCrossInCircle } from '@cogoport/icons-react';
import React, { useState } from 'react';

import StepsComponent from '../../common/Steps';
import useDeleteSchedule from '../../hooks/useDeleteSchedule';

import DeleteModal from './DeleteModal';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ScheduleCard({ schedule, refectSchedules }) {
	const { deleteSchedule } = useDeleteSchedule(refectSchedules);

	const [showDelete, setShowDelete] = useState(false);
	const { push } = useRouter();
	const stepsList = [
		{ title: schedule?.origin_port?.port_code || 'Origin' },
		{ title: schedule?.destination_port?.port_code || 'Destination' },
	];

	const origin_port_name = schedule?.origin_port?.name.split('(')[0];
	const destination_port_name = schedule?.destination_port?.name.split('(')[0];

	const handleViewDetails = () => {
		push(`/saas/ocean-schedules/${schedule?.id}`);
	};

	const handleDelete = async () => {
		setShowDelete(!showDelete);
	};

	return (
		<div className={styles.container}>
			<div className={styles.icon_container} role="presentation" onClick={handleDelete}>
				<IcMCrossInCircle />
			</div>
			<div className={styles.countries_container}>
				<div className={styles.country_name}>
					<span className={styles.country_name_span}>{origin_port_name}</span>
					(
					{schedule?.origin_port?.country?.country_code}
					)
				</div>
				<div className={styles.country_name}>
					<span className={styles.country_name_span}>{destination_port_name}</span>
					(
					{
						schedule?.destination_port?.country?.country_code
					}
					)
				</div>
			</div>
			<div className={styles.steps_container}>
				<StepsComponent stepsList={stepsList} />
			</div>
			<div className={styles.footer_container} role="presentation" onClick={handleViewDetails}>
				<div className={styles.value_container}>
					<div className={styles.number_container}>
						{' '}
						{schedule.schedules_count || 0}
					</div>
					Schedules available from
					<div className={styles.number_container}>
						{' '}
						{schedule.shipping_lines_count || 0}
						{' '}
					</div>
					Carriers
				</div>
				<div className={styles.footer_icon_container}>
					<IcMArrowNext fill="#034AFD" width="1.2rem" height="1.2rem" />
				</div>
			</div>
			{
				showDelete && (
					<DeleteModal
						showDelete={showDelete}
						setShowDelete={setShowDelete}
						schedule={schedule}
						deleteSchedule={deleteSchedule}
					/>
				)
			}
		</div>
	);
}

export default ScheduleCard;
