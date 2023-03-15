import { Pill, Modal } from '@cogoport/components';
import { differenceInDays, format } from '@cogoport/utils';
import React from 'react';

import LegsItem from './LegsItem';
import styles from './styles.module.css';

import StepsComponent from '@/ui/page-components/air-schedules/common/Steps';

export function SchedulesModal({
	openSchedulesModal, setOpenSchedulesModal, schedule, shippingLine, scheduleDetails,
}) {
	const handleClose = () => {
		setOpenSchedulesModal(false);
	};
	const stepsList = [
		{ title: scheduleDetails?.origin_port?.port_code || 'Origin' },
		{ title: scheduleDetails?.destination_port?.port_code || 'Destination' },
	];

	const legs = schedule?.legs;

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
						<StepsComponent stepsList={stepsList} />
					</div>
				</div>
				{legs?.length > 0 && legs?.map((leg) => (
					<>
						<div className={styles.line_seperator} />
						<LegsItem legItem={leg} />
					</>
				))}
			</Modal.Body>
		</Modal>
	);
}
