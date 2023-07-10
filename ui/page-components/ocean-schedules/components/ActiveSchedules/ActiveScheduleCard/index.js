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
	const { origin_port = {}, destination_port = {}, schedules = {} } = scheduleDetails || {};
	const { t } = useTranslation(['oceanSchedule']);

	const originSchedule = origin_port?.port_code || 'Origin';
	const destinationSchedule = destination_port?.port_code || 'Destination';

	const shippingLinesList = schedules?.shipping_lines || [];

	const shippingLine = shippingLinesList.filter(
		(item) => item.id === schedule.shipping_line_id,
	)[0] || {};

	const [openSchedulesModal, setOpenSchedulesModal] = useState(false);
	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.header_text_container}>
					<div className={styles.img_container}>
						<img
							src={shippingLine?.logo_url}
							alt=""
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
							{t('oceanSchedule:service_text')}
							-
							{schedule?.service_name}
							)
						</span>
					</div>
				</div>
				<div className={styles.pills_container}>

					{schedule?.vgm_cutoff && (
						<Pill size="md" color="#F7FAEF">
							{t('oceanSchedule:vgm_cut_off_text')}
							:
							{formatDate({
								date       : schedule?.vgm_cutoff,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</Pill>
					)}
					{schedule?.terminal_cutoff && (
						<Pill size="md" color="#F7FAEF">
							{t('oceanSchedule:terminal_cut_off_text')}
							:
							{formatDate({
								date       : schedule?.terminal_cutoff,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</Pill>
					)}
				</div>
			</div>
			<div className={styles.main_container}>
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
						{t('oceanSchedule:days_text')}
					</Pill>
				</div>
				<div className={styles.dot_circle}>
					<div className={styles.circle1}><div className={styles.port_code}>{originSchedule}</div></div>
					<div className={styles.line} />
					<div className={styles.circle2}><div className={styles.port_code}>{destinationSchedule}</div></div>
				</div>
			</div>
			<div
				className={styles.footer_container}
				role="presentation"
				onClick={() => { setOpenSchedulesModal(true); }}
			>
				{t('oceanSchedule:view_details_text')}
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
