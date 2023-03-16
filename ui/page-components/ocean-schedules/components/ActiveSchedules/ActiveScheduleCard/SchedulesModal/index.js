import { Pill, Modal } from '@cogoport/components';
import { differenceInDays, format } from '@cogoport/utils';
import React from 'react';

import LegsItem from './LegsItem';
import styles from './styles.module.css';

export function SchedulesModal({
	openSchedulesModal, setOpenSchedulesModal, schedule, shippingLine, scheduleDetails,
}) {
	const handleClose = () => {
		setOpenSchedulesModal(false);
	};
	const originSchedule = scheduleDetails?.origin_port?.port_code || 'Origin';
	const destinationSchedule =	 scheduleDetails?.destination_port?.port_code || 'Destination';

	const legs = schedule?.legs || [];
	console.log(legs, 'legs');
	return (
		<Modal show={openSchedulesModal} closeOnOuterClick showCloseIcon onClose={handleClose}>
			<Modal.Header title="Schedule Details" />
			<Modal.Body>
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
					<div className={styles.main_pill_container}>
						<Pill size="md" color="#FEF3E9">
							{differenceInDays(new Date(schedule?.arrival), new Date(schedule?.departure))}
							Days
						</Pill>
					</div>
					<div className={styles.dot_circle}>
						<div className={styles.circle1}><div className={styles.port_code}>{originSchedule}</div></div>
						<div className={styles.line} />
						<div className={styles.circle2}>
							<div className={styles.port_code}>{destinationSchedule}</div>
						</div>
					</div>
					<div className={styles.dates_container}>
						<div className={styles.date_container}>
							{format(schedule?.departure, 'dd MMM yyyy (eee)')}
						</div>
						<div className={styles.date_container}>
							{format(schedule?.arrival, 'dd MMM yyyy (eee)')}
						</div>
					</div>
				</div>
				{legs?.length > 0 && (legs || []).map((leg) => (
					<div>
						<div className={styles.line_seperator} />
						<LegsItem legItem={leg} />
					</div>
				))}
			</Modal.Body>
		</Modal>
	);
}
