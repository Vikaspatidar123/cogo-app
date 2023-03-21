// import { Flex, Text } from '@cogoport/front/components';
// import React, { useState, Fragment, useEffect } from 'react';
import { Placeholder } from '@cogoport/components';
import { Button } from '@cogoport/components';
import { IcAShipAmber, IcMShare } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

// import ContainerDetailsModal from '../../../../common/components/container-details-modal';
// import TrackerMap from '../../../../common/components/map-tracking';
// import { useSaasState } from '../../../../common/context';
// import LoadingBanner from '../../../../common/icons/loading-banner.svg';
// import IconShare from '../../../../common/icons/share.svg';
// import IconTridot from '../../../../common/icons/tridot-loading-animated.svg';
// import IconTruck from '../../../../common/icons/truck.svg';
// import IconVessel from '../../../../common/icons/vessel.svg';
// import Button from '../../../../common/ui/Button';
// import { INCOTERM_TO_SHIPPERS_RESPONSIBILITY } from '../../../../common/utils/constants';
import { INCOTERM_TO_SHIPPERS_RESPONSIBILITY } from '../../common/constant';

import { UNSHADED_MILESTONES } from './common/constant';
import { processList, formatDate, formatTime, isPastOrPresentDay } from './common/utils';
import styles from './styles.module.css';
import TrackerMap from './TrackerMap';
// import { UNSHADED_MILESTONES } from './common/constants';
// import {
// 	StyledStep,
// 	StyledStepsContainer,
// 	Card,
// 	Header,
// 	ContainersPill,
// 	LocationText,
// 	Circle,
// } from './styles';

// const TRANSPORT_MODE_TO_ICON = {
// 	TRUCK  : IconTruck,
// 	VESSEL : IconVessel,
// };
function MilestonesContainer({
	handleShareModal,
	mapLoading, trackerDetails, selectedContainer, setMapPoints, mapPoints, loading,
}) {
	// const { general, trackerDetails, isMobile, selectedContainer, mapPoints } =		useSaasState();
	const [selectedMilestonesList, setSelectedMilestonesList] = useState([]);
	const [oceanPoints, setOceanPoints] = useState([]);
	const [incotermStep, setIncotermStep] = useState(-1);
	const [isContainerDetailsModalOpen, setContainerDetailsModal] = useState(false);

	const [vesselLocationLat, setVesselLocationLat] = useState();
	const [vesselLocationLang, setVesselLocationLang] = useState();
	const [preditiveEta, setPreditiveEta] = useState({});
	const [vesselName, setVesselName] = useState();
	const containersMilestonesList = trackerDetails?.data ?? [];
	const incoterm = trackerDetails?.shipment_details?.incoterm;

	// const { container_details } = trackerDetails;

	const containerNo = trackerDetails?.input;
	const handleContainerDetailsModal = () => {
		setContainerDetailsModal(!isContainerDetailsModalOpen);
	};

	useEffect(() => {
		const processedMilestonesList = processList(
			containersMilestonesList?.[selectedContainer]?.tracking_data ?? [],
		);
		console.log('in useEffect', containersMilestonesList);
		setSelectedMilestonesList(processedMilestonesList);
	}, [selectedContainer, containersMilestonesList]);

	console.log(containersMilestonesList, 'containersMilestonesList');
	useEffect(() => {
		let newIncotermStep = -1;
		const incotermMilestonesList = INCOTERM_TO_SHIPPERS_RESPONSIBILITY[incoterm] ?? [];

		selectedMilestonesList.forEach((combinedMilestones, idx) => {
			const containsIncoterm = combinedMilestones.filter((item) => (
				incotermMilestonesList.includes(item.milestone)).length > 0);
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

		// eslint-disable-next-line no-undef
		const anchorTarget = document.getElementById(mostRecentPastOrPresentMilestoneId);
		anchorTarget?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
	}, [selectedMilestonesList]);
	useEffect(() => {
		if (mapPoints?.length) {
			setOceanPoints(
				mapPoints.find(
					(x) => x.container_no
						=== containersMilestonesList?.[selectedContainer]?.container_no,
				)?.route,
			);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedContainer, mapPoints]);

	useEffect(() => {
		if (containersMilestonesList?.[selectedContainer] !== undefined) {
			if (
				containersMilestonesList?.[selectedContainer]?.vessel_eta_details?.vessel_name
				!== undefined
			) {
				setVesselName(
					containersMilestonesList?.[selectedContainer]?.vessel_eta_details?.vessel_name,
				);
			}

			if (
				containersMilestonesList?.[selectedContainer]?.vessel_eta_details
					?.vessel_eta_details !== undefined
				&& containersMilestonesList?.[selectedContainer]?.vessel_eta_details
					?.vessel_eta_details !== null
			) {
				if (
					containersMilestonesList?.[selectedContainer]?.vessel_eta_details
						?.vessel_eta_details?.current_location !== undefined
				) {
					setVesselLocationLat(
						containersMilestonesList?.[selectedContainer]?.vessel_eta_details
							?.vessel_eta_details?.current_location.Lat,
					);
					setVesselLocationLang(
						containersMilestonesList?.[selectedContainer]?.vessel_eta_details
							?.vessel_eta_details?.current_location.Lang,
					);
				}

				if (
					containersMilestonesList?.[selectedContainer]?.vessel_eta_details
						?.vessel_eta_details?.shipment?.preditive_eta !== undefined
				) {
					setPreditiveEta(
						containersMilestonesList?.[selectedContainer]?.vessel_eta_details
							?.vessel_eta_details?.shipment?.preditive_eta,
					);
				}
			}
		}
	}, [selectedContainer, selectedMilestonesList]);

	const renderEmpty = () => (
		<div className={styles.empty}>
			{/* <LoadingBanner style={{ width: 300, height: 'auto' }} /> */}
			{/* <IconTridot style={{ width: 40, height: 'auto', marginBottom: 24 }} /> */}
			<div className={styles.empty_content}>
				Retrieving Tracking Data
			</div>
			<div className={styles.empty_content}>
				Fetching data on this container / shipment is taking longer than usual. We will
				inform you as soon as it&apos;s available.
			</div>
		</div>
	);

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<h1>TRACKING INFORMATION </h1>
				{preditiveEta !== undefined
					&& preditiveEta?.ActualArrivalTime !== null
					&& preditiveEta?.ActualArrivalTime !== undefined && (
						<div className={styles.location_text}>
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
										{formatDate(preditiveEta?.ScheduleArrivalTime || '-')}
									</div>
								</div>
							</div>
						</div>
				)}
				<div>
					<div role="presentation" onClick={() => handleShareModal()} className={styles.share}>
						<IcMShare />
						Share
					</div>
				</div>
			</div>

			{/* <ContainerDetailsModal
				isOpen={isContainerDetailsModalOpen}
				handleModal={handleContainerDetailsModal}
				containersDetails={container_details}
				containerNo={containerNo}
			/> */}
			{loading && <Placeholder height="500px" />}
			{!loading && selectedMilestonesList?.length > 0 ? (
				<div className={styles.tracking_details}>
					<div className={styles.shipping_line}>
						<div className={styles.step_container}>
							{selectedMilestonesList.map((combinedMilestones, idx) => {
								let prefixClass = '';
								const currentMilestone = combinedMilestones.slice(-1)[0];
								const isLast = idx === selectedMilestonesList.length - 1;
								console.log(isLast, 'selectedMilestonesList');
								const isShaded = !UNSHADED_MILESTONES.includes(
									currentMilestone.milestone,
								);

								const nextMilestone = isLast ? null : selectedMilestonesList[idx + 1][0];
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

								if (isShaded) prefixClass += 'shaded';

								// const Icon = TRANSPORT_MODE_TO_ICON[currentMilestone?.transport_mode] ?? Fragment;

								const unshadedTimeHeading = `${formatDate(
									currentMilestone.event_date,
								)} | (${formatTime(currentMilestone.event_date)})`;

								const unshadedLocation = `${currentMilestone.milestone} - ${currentMilestone.location}`;
								return (
									<div className={styles.step} key={currentMilestone.id} id={currentMilestone.id}>
										<div className={styles.prefixClass}>
											{!isLast ? (
												<div className={styles.tail}>
													<div className={styles.tail_content}>
														<IcAShipAmber size={10} width={30} height={30} />
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
											>
												{isShaded ? (
													<>
														<p className={styles.heading}>{currentMilestone.location}</p>
														{combinedMilestones.map((item) => {
															const description = (
																<div className={styles.vessel}>
																	<span>
																		{formatDate(item.event_date || '')}
																		{' '}
																		(
																		{formatTime(item.event_date)}
																		) -
																		{' '}
																		{item.milestone || ''}
																	</span>
																	{item?.vessel_name?.length > 2 && (
																		<span>
																			<b>Vessel name:</b>
																			{' '}
																			{item?.vessel_name || '-'}
																		</span>
																	)}
																</div>
															);
															return (
																<>
																	<p>{description}</p>
																	{/* {isMobile && (
																		<p className={styles.time}>
																		{formatTime(item.event_date)}</p>
																	)} */}
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
					</div>
					<div className={styles.tracker}>
						<TrackerMap
							mapLoading={mapLoading}
							points={oceanPoints}
							vesselLocationLat={vesselLocationLat}
							vesselLocationLang={vesselLocationLang}
							mapPoints={mapPoints}
							type="container"
							height="65vh"
							route={{
								origin_port:
									trackerDetails?.iternary && trackerDetails?.type === 'CONTAINER_NO'
										? trackerDetails?.iternary[0]?.origin
										: null,
								destination_port:
									trackerDetails?.iternary && trackerDetails?.type === 'CONTAINER_NO'
										? trackerDetails?.iternary[0]?.destination
										: null,
								tracking_no: trackerDetails?.input,
								tracking_label:
									trackerDetails?.type === 'CONTAINER_NO'
										? 'Container No:'
										: 'BL/Booking no:',
							}}
						/>
					</div>
				</div>
			) : (
				renderEmpty()
			)}
		</div>
	);
}

export default MilestonesContainer;
