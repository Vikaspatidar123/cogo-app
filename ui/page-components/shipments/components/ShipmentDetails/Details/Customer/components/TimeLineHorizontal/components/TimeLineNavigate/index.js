import { Pagination } from '@cogoport/components';
import { IcMTrailorFull } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, Fragment, useEffect } from 'react';

import { isPastOrPresentDay } from '../../utils/constants';
import { UNSHADED_MILESTONES } from '../../utils/milestone';
import { INCOTERM_TO_SHIPPERS_RESPONSIBILITY } from '../../utils/milestone_type';
import EmptyState from '../EmptyState';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const TRANSPORT_MODE_TO_ICON = {
	TRUCK  : <IcMTrailorFull size={2} />,
	VESSEL : (
		<img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/vessel.svg"
			alt="vessel"
			size={2}
		/>
	),
};

function TimelineNavigate({
	selectedMilestonesList = [],
	currentSubscription = '',
	trackerDetails = [],
	allContainers = '',
	setCurrentSubscription,
	preditiveEta = {},
	vesselName = '',
	servicesForMap = false,
	rest,
}) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);
	const [incotermStep, setIncotermStep] = useState(-1);

	const incoterm = trackerDetails?.shipment_details?.incoterm;
	const { page = 0, pageLimit = 0, totalCount = 0, setPage } = rest || {};

	useEffect(() => {
		if (allContainers.length) {
			if (!currentSubscription) {
				setCurrentSubscription(allContainers[0]);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSubscription, allContainers]);

	const handleSubscription = (event) => {
		const clickedSubscripton = (allContainers || []).find(
			(obj) => obj.input === event.target.id,
		);
		setCurrentSubscription(clickedSubscripton);
	};

	useEffect(() => {
		let newIncotermStep = -1;
		const incotermMilestonesList = INCOTERM_TO_SHIPPERS_RESPONSIBILITY[incoterm] ?? [];

		selectedMilestonesList.forEach((combinedMilestones, idx) => {
			const containsIncoterm = combinedMilestones
				.filter((item) => incotermMilestonesList.includes(item.milestone)).length > 0;
			if (containsIncoterm) {
				newIncotermStep = idx - 1;
			}
		});

		setIncotermStep(newIncotermStep);
	}, [incoterm, selectedMilestonesList]);

	// do not remove
	// useEffect(() => {
	// 	let mostRecentPastOrPresentMilestoneId = null;
	// 	selectedMilestonesList.map((combinedMilestones) => {
	// 		const currentMilestone = combinedMilestones.slice(-1)[0];
	// 		if (isPastOrPresentDay(currentMilestone?.event_date)) {
	// 			mostRecentPastOrPresentMilestoneId = currentMilestone?.id;
	// 		}
	// 		return false;
	// 	});

	// 	const anchorTarget = document.getElementById(
	// 		mostRecentPastOrPresentMilestoneId,
	// 	);
	// 	anchorTarget?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
	// }, [selectedMilestonesList]);

	return servicesForMap ? (
		<div className={styles.main_container}>
			{allContainers.length === 0 ? (
				<div style={{ width: '100%', height: '200px' }}>
					No Subscriptions are there
				</div>
			) : null}

			{allContainers.length > 0 ? (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div className={styles.tag_title}>Tracking Information</div>

					<div className={styles.container}>
						{(allContainers || []).map((item) => (!isEmpty(item?.container_details) ? (
							<div
								key={item?.input}
								role="presentation"
								className={`${styles.custom_tag} 
                                ${currentSubscription?.id === item?.id ? styles.set_tracking : ''}`}
								id={item?.input}
								onClick={(e) => handleSubscription(e)}
								style={{
									fontSize: '12px',
								}}
							>
								{item?.input}
							</div>
						) : null))}
					</div>

					<div className={styles.pagination_container}>
						<Pagination
							type="compact"
							pageSize={pageLimit}
							totalItems={totalCount}
							currentPage={page}
							onPageChange={setPage}
						/>
					</div>
				</div>
			) : null}

			{preditiveEta !== undefined
				&& preditiveEta?.ActualArrivalTime !== null
				&& preditiveEta?.ActualArrivalTime !== undefined && (
					<div className={`${styles.location_text} ${styles.blinking}`}>
						<div className={styles.flex}>
							<div className={styles.circle} />
							<div>
								<div className={styles.flex}>
									<b> CountryName :</b>
									{' '}
									{preditiveEta?.CountryName}
									<b> | Vessel Name :</b>
									{' '}
									{vesselName || '-'}
								</div>
								<div className={styles.flex}>
									<b> Prediction ETA : </b>
									{formatDate({
										date       : preditiveEta?.ScheduleArrivalTime || '-',
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType : 'date',
									})}
								</div>
							</div>
						</div>
					</div>
			)}

			{selectedMilestonesList?.length > 0 ? (
				<div className={styles.step_container}>
					{selectedMilestonesList.map((combinedMilestones, idx) => {
						let prefixClass = '';
						let shadedClass = '';
						const currentMilestone = combinedMilestones.slice(-1)[0];
						const isLast = idx === selectedMilestonesList.length - 1;
						const isShaded = !UNSHADED_MILESTONES.includes(
							currentMilestone.milestone,
						);

						const nextMilestone = isLast
							? null
							: selectedMilestonesList[idx + 1][0];
						const isCurrentMilestonePastOrPresent = isPastOrPresentDay(
							currentMilestone?.event_date,
						);
						const isNextMilestonePastOrPresent = isLast
							? false
							: isPastOrPresentDay(nextMilestone?.event_date);

						if (isLast) {
							if (isCurrentMilestonePastOrPresent) {
								prefixClass = 'finish';
							} else {
								prefixClass = 'wait';
							}
						} else if (
							isCurrentMilestonePastOrPresent
							&& isNextMilestonePastOrPresent
						) {
							prefixClass = 'finish';
						} else if (
							isCurrentMilestonePastOrPresent
							&& !isNextMilestonePastOrPresent
						) {
							prefixClass = 'process';
						} else {
							prefixClass = 'wait';
						}

						if (isShaded) shadedClass = ' shaded';

						const unshadedTimeHeading = `${formatDate({
							date       : currentMilestone.event_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})} | (${formatDate({
							date       : currentMilestone.event_date,
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'time',
						})})`;

						const unshadedLocation = `${currentMilestone.milestone} - ${currentMilestone.location}`;
						return (
							<div className={styles.steps} key={currentMilestone.id} id={currentMilestone.id}>
								<div className={`${styles?.[prefixClass]} 
								${shadedClass === 'shaded' ? styles.shaded : ''}`}
								>
									{!isLast ? (
										<div className={styles.tail}>
											<div className={styles.tail_content}>
												{/* <Icon size={2} /> */}
												{
													TRANSPORT_MODE_TO_ICON[
														currentMilestone?.transport_mode
													]
												}
											</div>
										</div>
									) : null}
									{incotermStep >= idx ? (
										<div className={styles.incoterm_line}>
											{idx === 0 ? (
												<div className={styles.incoterm_label}>
													Inco:
													{incoterm}
												</div>
											) : null}
										</div>
									) : null}
									<div className={styles.icon} />
									<div
										className={styles.content}
										{...(idx === 1 && {
											'data-instructional-overlay-step': '6',
										})}
									>
										{isShaded ? (
											<>
												<p className={styles.heading}>{currentMilestone.location}</p>
												{combinedMilestones.map((item) => {
													const description = (
														<div className={styles.vessel}>
															<div className={styles.title}>
																{formatDate({
																	date: item.event_date || '',
																	dateFormat:
																		GLOBAL_CONSTANTS.formats.date[
																			'dd MMM yyyy'
																		],
																	formatType: 'date',
																})}
																{' '}
																(
																{formatDate({
																	date: item.event_date,
																	timeFormat:
																		GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
																	formatType: 'time',
																})}
																) -
																{' '}
																{item.milestone || ''}
															</div>
															{item?.vessel_name?.length > 2 && (
																<div className={styles.sub_title}>
																	<b>Vessel name:</b>
																	{' '}
																	{item?.vessel_name || '-'}
																</div>
															)}
														</div>
													);
													return (
														<>
															<p>{description}</p>
															{isMobile && (
																<p className={styles.time}>
																	{formatDate({
																		date: item.event_date,
																		timeFormat:
																			GLOBAL_CONSTANTS.formats.time[
																				'hh:mm aaa'
																			],
																		formatType: 'time',
																	})}
																</p>
															)}
														</>
													);
												})}
											</>
										) : (
											<>
												<p className={styles.time}>{unshadedTimeHeading}</p>
												<p className={styles.description}>{unshadedLocation}</p>
											</>
										)}
									</div>
									{incotermStep === idx && (
										<div className={styles.incoterm_handover_container}>
											<p>Handover to consignee as per incoterm</p>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<EmptyState />
			)}
		</div>
	) : null;
}

export default TimelineNavigate;
