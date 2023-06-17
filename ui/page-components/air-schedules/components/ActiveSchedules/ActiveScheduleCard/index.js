import { Pill } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { differenceInDays, format } from '@cogoport/utils';
import React, { useState } from 'react';

import { SchedulesModal } from './SchedulesModal';
import styles from './styles.module.css';

function ActiveScheduleCard({ scheduleDetails, schedule }) {
	const originSchedule = scheduleDetails?.origin_airport?.port_code || 'Origin';
	const destinationSchedule =	 scheduleDetails?.destination_airport?.port_code || 'Destination';

	const airLinesList = scheduleDetails?.schedules?.airlines || [];

	const shippingLine = airLinesList.filter(
		(item) => item.id === schedule.airline_id,
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
							(SERVICE-
							{schedule?.service_name}
							)
						</span>
					</div>
				</div>
				<div className={styles.pills_container}>
					<Pill size="md" color="#F7FAEF">
						VGM Cutoff:
						{format(schedule?.vgm_cutoff, 'dd MMM yyyy')}
					</Pill>
					<Pill size="md" color="#F7FAEF">
						Terminal Cutoff:
						{format(schedule?.terminal_cutoff, 'dd MMM yyyy')}
					</Pill>
				</div>
			</div>
			<div>
				<div className={styles.dates_container}>
					<div className={styles.date_container}>
						{format(schedule?.departure, 'dd MMM yyyy (eee)')}
					</div>
					<div className={styles.date_container}>
						{format(schedule?.arrival, 'dd MMM yyyy (eee)')}
					</div>
				</div>
				<div className={styles.main_pill_container}>
					<Pill size="md" color="#FEF3E9">
						{differenceInDays(new Date(schedule?.arrival), new Date(schedule?.departure))}
						Days
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
				View Details
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
