import { IcMArrowNext, IcMCrossInCircle } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useDeleteSchedule from '../../hooks/useDeleteSchedule';

import DeleteModal from './DeleteModal';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ScheduleCard({ schedule, refectSchedules }) {
	const {
		origin_port = {}, destination_port = {}, id = '',
		schedules_count = 0, shipping_lines_count = 0,
	} = schedule || {};
	const { push } = useRouter();

	const { t } = useTranslation(['oceanSchedule']);

	const { deleteSchedule } = useDeleteSchedule(refectSchedules);

	const [showDelete, setShowDelete] = useState(false);

	const originSchedule = origin_port?.port_code || t('oceanSchedule:origin_text');
	const destinationSchedule = destination_port?.port_code || t('oceanSchedule:destination_text');

	const origin_port_name = origin_port?.name.split('(')[GLOBAL_CONSTANTS.zeroth_index];
	const destination_port_name = destination_port?.name.split('(')[GLOBAL_CONSTANTS.zeroth_index];

	const handleViewDetails = () => {
		push(`/saas/ocean-schedules/${id}`);
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
					{origin_port?.country?.country_code}
					)
				</div>
				<div className={styles.country_name}>
					<span className={styles.country_name_span}>{destination_port_name}</span>
					(
					{
						destination_port?.country?.country_code
					}
					)
				</div>
			</div>
			<div className={styles.dot_circle}>
				<div className={styles.circle1}><div className={styles.port_code}>{originSchedule}</div></div>
				<div className={styles.line} />
				<div className={styles.circle2}><div className={styles.port_code}>{destinationSchedule}</div></div>
			</div>
			<div className={styles.footer_container} role="presentation" onClick={handleViewDetails}>
				<div className={styles.value_container}>
					<div className={styles.number_container}>
						{schedules_count || 0}
					</div>
					{t('oceanSchedule:scheduls_available_text')}
					<div className={styles.number_container}>
						{shipping_lines_count || 0}
					</div>
					{t('oceanSchedule:carriers_text')}
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
