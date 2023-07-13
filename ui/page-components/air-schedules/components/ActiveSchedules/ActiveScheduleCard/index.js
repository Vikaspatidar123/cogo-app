import { Pill } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { differenceInDays } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { SchedulesModal } from './SchedulesModal';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function ActiveScheduleCard({ scheduleDetails, schedule }) {
	const originSchedule = scheduleDetails?.origin_airport?.port_code || 'Origin';
	const destinationSchedule = scheduleDetails?.destination_airport?.port_code || 'Destination';
	const { t } = useTranslation(['airSchedule']);

	const airLinesList = scheduleDetails?.schedules?.airlines || [];

	const shippingLine = airLinesList.filter(
		(item) => item.id === schedule.airline_id,
	)[GLOBAL_CONSTANTS.zeroth_index] || {};

	const [openSchedulesModal, setOpenSchedulesModal] = useState(false);
	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.header_text_container}>
					<div className={styles.img_container}>
						<img
							src={shippingLine?.logo_url}
							alt={t('airSchedule:logo_alt')}
							width="40px"
							height="40px"
						/>
					</div>
					<div className={styles.header_text}>
						{shippingLine?.short_name}
						<span className="span">
							{schedule?.vessel_name || schedule?.transport_name}
							/
							{schedule?.voyage_number}
							(
							{t('airSchedule:service_text')}
							-
							{schedule?.service_name}
							)
						</span>
					</div>
				</div>
				<div className={styles.pills_container}>
					{schedule?.vgm_cutoff ? (
						<Pill size="md" color="#F7FAEF">
							{t('airSchedule:vgm_cut_off_text')}
							:
							{formatDate({
								date       : schedule?.vgm_cutoff,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</Pill>
					) : null}
					{schedule?.terminal_cutoff ? (
						<Pill size="md" color="#F7FAEF">
							{t('airSchedule:terminal_cut_off_text')}
							:
							{formatDate({
								date       : schedule?.terminal_cutoff,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</Pill>
					) : null}
				</div>
			</div>
			<div>
				<div className={styles.dates_container}>
					<div className={styles.date_container}>
						{formatDate({
							date       : schedule?.departure,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</div>
					<div className={styles.date_container}>
						{formatDate({
							date       : schedule?.arrival,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</div>
				</div>
				<div className={styles.main_pill_container}>
					<Pill size="md" color="#FEF3E9">
						{differenceInDays(new Date(schedule?.arrival), new Date(schedule?.departure))}
						{t('airSchedule:days_text')}

					</Pill>
				</div>
				<div className={styles.steps_container}>
					<div className={styles.dot_circle}>
						<div className={styles.circle1}>
							<div className={styles.port_code}>{originSchedule}</div>
						</div>
						<div className={styles.line} />
						<div className={styles.circle2}>
							<div className={styles.port_code}>{destinationSchedule}</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={styles.footer_container}
				role="presentation"
				onClick={() => { setOpenSchedulesModal(true); }}
			>
				{t('airSchedule:view_details_text')}
				<IcMArrowNext width="1.2rem" height="1.2rem" />
			</div>
			{openSchedulesModal && (
				<SchedulesModal
					openSchedulesModal={openSchedulesModal}
					setOpenSchedulesModal={setOpenSchedulesModal}
					shippingLine={shippingLine}
					schedule={schedule}
					scheduleDetails={scheduleDetails}
				/>
			)}
		</div>
	);
}

export default ActiveScheduleCard;
