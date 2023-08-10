import { IcMAirport, IcMShare } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { INCOTERM_TO_SHIPPERS_RESPONSIBILITY } from '../common/incoterm';

import { UNSHADED_MILESTONES } from './common/constant';
import {
	processList,
	formatDate,
	formatTime,
	isPastOrPresentDay,
} from './common/utils';
import styles from './styles.module.css';

import TrackerMap from '@/ui/page-components/map-tracking';

function MilestonesContainer({
	handleShareModal,
	trackerDetails,
	selectedContainerId,
	track = false,
	renderMap = () => {},
}) {
	const [selectedMilestonesList, setSelectedMilestonesList] = useState([]);
	const [incotermStep, setIncotermStep] = useState(-1);
	const containersMilestonesList = trackerDetails?.data ?? [];
	const incoterm = trackerDetails?.shipment_details?.incoterm;
	const mapPoints = [];
	if (trackerDetails?.air_flight_info?.length > 0) {
		trackerDetails?.data[0]?.tracking_data
			?.sort((a, b) => (a?.actual_date > b?.actual_date ? 1 : -1))
			.forEach((x, i) => {
				if (mapPoints.findIndex((y) => y.station === x.station) > -1) {
					// already present
				} else {
					let info = trackerDetails?.air_flight_info.find(
						(y) => y.depart_station === x.station,
					);
					let point = {};
					if (info) {
						point = {
							station        : info.depart_station,
							departure_lat  : info.departure_lat,
							departure_long : info.departure_long,
						};
					} else {
						info = trackerDetails?.air_flight_info.find(
							(y) => y.arrival_station === x.station,
						);
						if (info) {
							point = {
								station        : info.arrival_station,
								departure_lat  : info.arrival_lat,
								departure_long : info.arrival_long,
							};
						}
					}
					if (
						i > 0
            && point
            && mapPoints[mapPoints.length - 1]?.departure_lat
					) {
						mapPoints[mapPoints.length - 1].arrival_lat = point.departure_lat;
						mapPoints[mapPoints.length - 1].arrival_long = point.departure_long;
					}
					if (point && point?.departure_lat) {
						mapPoints.push(point);
					}
				}
			});
	}
	const getIndexInList = (key) => {
		for (let i = 0; i < containersMilestonesList.length; i += 1) {
			if (containersMilestonesList[i]?.airway_bill_no === key) return i;
		}
		return false;
	};
	useEffect(() => {
		const selectedIndex = getIndexInList(selectedContainerId);
		const processedMilestonesList = processList(
			containersMilestonesList?.[selectedIndex]?.tracking_data ?? [],
		);
		setSelectedMilestonesList(processedMilestonesList);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedContainerId]);

	useEffect(() => {
		let newIncotermStep = -1;
		const incotermMilestonesList = INCOTERM_TO_SHIPPERS_RESPONSIBILITY[incoterm] ?? [];
		selectedMilestonesList.forEach((combinedMilestones, idx) => {
			const containsIncoterm = combinedMilestones.filter(
				(item) => incotermMilestonesList.includes(item.milestone),
			).length > 0;
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
			if (isPastOrPresentDay(currentMilestone?.actual_date)) {
				mostRecentPastOrPresentMilestoneId = currentMilestone?.id;
			}
			return false;
		});
		const anchorTarget = document.getElementById(
			mostRecentPastOrPresentMilestoneId,
		);
		anchorTarget?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
	}, [selectedMilestonesList]);
	const renderEmpty = () => (
		<div className={styles.empty}>

			<div className={styles.empty_content}>Tracking Data Not Available</div>

			<div className={styles.empty_content}>

				Fetching data on this cargo / shipment is taking longer than usual.
			</div>

		</div>
	);
	return (
		<div className={styles.card}>

			{!track &&	(
				<div className={styles.headers}>

					<div className={styles.header}>

						<h1>TRACKING INFORMATION </h1>

						<div
							className={styles.share}
							{...{ 'data-instructional-overlay-step': '8' }}
							role="presentation"
							onClick={() => handleShareModal()}
						>

							<IcMShare height={24} width={24} />

							Share
						</div>

					</div>

				</div>
			)}

			{selectedMilestonesList?.length > 0 ? (
				<div className={styles.tracking_details}>

					<div className={track ? styles.shipping_main : styles.shipping_line}>

						<div className={styles.step_container}>

							{selectedMilestonesList.map((combinedMilestones, idx) => {
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
								let prefixClass = '';
								let shadedClass = '';
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
								if (isShaded) shadedClass = 'shaded';
								const unshadedTimeHeading = `${formatDate(
									currentMilestone.event_date,
								)} | (${formatTime(currentMilestone.event_date)})`;
								const unshadedLocation = `${currentMilestone.milestone} - ${currentMilestone.location}`;
								return (
									<div
										className={styles.step}
										key={currentMilestone.id}
										id={currentMilestone.id}
									>
										<div
											className={`${styles?.[prefixClass]} 
											${shadedClass === 'shaded' ? styles.shaded : ''}`}
										>

											{!isLast ? (
												<div className={styles.tail}>

													<div className={styles.tail_content}>

														<IcMAirport height={20} width={20} className={styles.icons} />

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
												{...(idx && { 'data-instructional-overlay-step': '6' })}
											>
												{isShaded ? (
													<>
														<p className={styles.heading}>
															{currentMilestone.station}
														</p>
														{combinedMilestones.map((item) => {
															const description = `${formatDate(
																item?.actual_date,
															)} (${formatTime(item?.actual_date)}) - ${
																item?.milestone || ''
															}`;
															const pieces = item?.piece
																? `${item?.piece} Pieces •`
																: null;
															const weight = item?.weight
																? `${item?.weight} Weight `
																: null;
															const flight = item?.flight_number
																? `• Flight no - ${item?.flight_number}`
																: null;
															return (
																<div className={styles.text}>

																	<p style={{ marginBottom: 0 }}>

																		{description}
																	</p>

																	<p className={styles.description}>

																		{pieces}

																		{weight}

																		{flight}
																	</p>

																</div>
															);
														})}
													</>
												) : (
													<>

														<p className={styles.time}>{unshadedTimeHeading}</p>

														<p className={styles.description}>

															{unshadedLocation}
														</p>

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
						{track ? renderMap()
							: (
								<TrackerMap
									points={mapPoints.slice(0, mapPoints.length - 1)}
									type="air"
									height="65vh"
									route={{
										origin_port: trackerDetails?.airway_bill_details?.origin,
										destination_port:
                                trackerDetails?.airway_bill_details?.destination,
										tracking_no    : trackerDetails?.airway_bill_no,
										tracking_label : 'Airway Bill No',
									}}
								/>
							)}
					</div>

				</div>
			) : (
				renderEmpty()
			)}
		</div>
	);
}
export default MilestonesContainer;
