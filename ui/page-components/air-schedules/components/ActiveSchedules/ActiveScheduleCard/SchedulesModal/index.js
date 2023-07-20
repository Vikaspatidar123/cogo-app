import { Pill, Modal } from '@cogoport/components';
import { differenceInDays } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import LegsItem from './LegsItem';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

export function SchedulesModal({
	openSchedulesModal, setOpenSchedulesModal, schedule, shippingLine, scheduleDetails,
}) {
	const { t } = useTranslation(['airSchedule']);

	const handleClose = () => {
		setOpenSchedulesModal(false);
	};

	const originSchedule = scheduleDetails?.origin_airport?.port_code || t('airSchedule:origin_text');
	const destinationSchedule = scheduleDetails?.destination_airport?.port_code || t('airSchedule:destination_text');

	const legs = schedule?.legs || [];

	return (
		<Modal show={openSchedulesModal} closeOnOuterClick showCloseIcon onClose={handleClose}>
			<Modal.Header title={t('airSchedule:schedule_details_text')} />
			<Modal.Body>
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
							<span className={styles.span}>
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
								{t('airchedule:vgm_cut_off_text')}
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
					<div className={styles.main_pill_container}>
						<Pill size="md" color="#FEF3E9">
							{differenceInDays(new Date(schedule?.arrival), new Date(schedule?.departure))}
							{t('airSchedule:days_text')}

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
				</div>
				{legs?.length > 0 && (legs || []).map((leg) => (
					<div className={styles.leg_container}>
						<div className={styles.line_seperator} />
						<LegsItem legItem={leg} />
					</div>
				))}
			</Modal.Body>
		</Modal>
	);
}
