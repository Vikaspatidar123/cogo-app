// import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
// import formatDate from '@cogo/globalization/utils/formatDate';
// import { useSelector } from '@cogo/store';
// import { Flex } from '@cogoport/front/components';
// import { IcMTrailorFull } from '@cogoport/icons-react';
import { IcMTrailorFull } from '@cogoport/icons-react';
import { useState, Fragment, useEffect } from 'react';

import ListSaasSubscriptions from '../../hooks/useListSaasSubscription';
import { isPastOrPresentDay } from '../../utils/constants';
import { UNSHADED_MILESTONES } from '../../utils/milestone';
import { INCOTERM_TO_SHIPPERS_RESPONSIBILITY } from '../../utils/milestone_type';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';
// import ListSaasSubscriptions from '../../hooks/getListSaasSubscriptions';
// import {
// 	// formatDate,
// 	// formatTime,
// 	isPastOrPresentDay,
// } from '../../utils/constants';
// import { UNSHADED_MILESTONES } from '../../utils/milestone';
// import { INCOTERM_TO_SHIPPERS_RESPONSIBILITY } from '../../utils/milestone_type';
// import EmptyState from '../EmptyState';

// import {
// 	StyledStep,
// 	StyledStepsContainer,
// 	Title,
// 	SubTitle,
// 	Container,
// 	CustomTag,
// 	TagTitle,
// 	MainContainer,
// 	LocationText,
// 	Circle,
// } from './styles';

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
}) {
	const { data } = ListSaasSubscriptions();

	const {
		general: { isMobile = false },
	} = useSelector((state) => state);
	const [incotermStep, setIncotermStep] = useState(-1);

	const incoterm = trackerDetails?.shipment_details?.incoterm;

	useEffect(() => {
		if (allContainers.length) {
			if (!currentSubscription) {
				setCurrentSubscription(allContainers[0]);
			}
		}
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

	useEffect(() => {
		let mostRecentPastOrPresentMilestoneId = null;
		selectedMilestonesList.map((combinedMilestones) => {
			const currentMilestone = combinedMilestones.slice(-1)[0];
			if (isPastOrPresentDay(currentMilestone?.event_date)) {
				mostRecentPastOrPresentMilestoneId = currentMilestone?.id;
			}
			return false;
		});

		const anchorTarget = document.getElementById(
			mostRecentPastOrPresentMilestoneId,
		);
		anchorTarget?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
	}, [selectedMilestonesList]);

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
						{(data?.list || []).map((item) => (item?.container_details?.length !== 0 ? (
							<div
								role="presentation"
								className={`${styles.custom_tag} 
                                ${currentSubscription?.id === item?.id ? styles.set_tracking : ''}`}
								id={item.container_details[0]?.container_no}
								onClick={(e) => handleSubscription(e)}
								style={{
									fontSize: '12px',
								}}
							>
								{item.container_details[0]?.container_no}
							</div>
						) : null))}
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

						if (isShaded) prefixClass += ' shaded';

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
								<div className={prefixClass}>
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
														<Flex direction="column">
															<Title>
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
															</Title>
															{item?.vessel_name?.length > 2 && (
																<SubTitle>
																	<b>Vessel name:</b>
																	{' '}
																	{item?.vessel_name || '-'}
																</SubTitle>
															)}
														</Flex>
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
