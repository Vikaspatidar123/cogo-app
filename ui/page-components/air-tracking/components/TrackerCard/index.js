import { Placeholder, Pagination, Popover } from '@cogoport/components';
import { IcMListView, IcMMap, IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../common/Emptystate';

import Card from './Card';
import CardPlaceholder from './CardPlaceholder';
import FilterComponent from './FIlterComponent';
import styles from './styles.module.css';
import TrackerMap from './TrackerMap';

function TrackerCard({
	archived, setArchived,
	loading, trackers, setTrackers, pagination, setPagination, filters, setFilters, selectedCardLabel, refetch,
}) {
	const [isMapView, setIsMapView] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const [points, setPoints] = useState([]);
	const trackerList = trackers?.list;
	const empty = isEmpty(trackerList);

	const getAllAirRoutes = (allAirTrackerDetails) => {
		allAirTrackerDetails.map((airTrackerDetails) => {
			const mapPoints = [];
			if (
				airTrackerDetails?.air_flight_info?.length > 0
				&& airTrackerDetails?.data.length > 0
			) {
				airTrackerDetails?.data
					.sort((a, b) => (a?.actual_date > b?.actual_date ? 1 : -1))
					.forEach((x, i) => {
						if (mapPoints.findIndex((y) => y.station === x.station) > -1) {
							// already present
						} else {
							let info = airTrackerDetails?.air_flight_info.find(
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
								info = airTrackerDetails?.air_flight_info.find(
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
							if (i > 0 && point && mapPoints[mapPoints.length - 1]?.departure_lat) {
								mapPoints[mapPoints.length - 1].arrival_lat = point.departure_lat;
								mapPoints[mapPoints.length - 1].arrival_long = point.departure_long;
							}
							if (point && point?.departure_lat) {
								mapPoints.push(point);
							}
						}
					});
				if (mapPoints[0]?.arrival_lat) {
					setPoints((prevPoints) => [
						...prevPoints,
						{
							data    : airTrackerDetails,
							id      : airTrackerDetails.id,
							service : 'air',
							route   : mapPoints,
						},
					]);
				}
			}
			return 0;
		});
	};

	useEffect(() => {
		if (trackerList) {
			getAllAirRoutes(trackerList);
		}
	}, [trackerList, pagination]);
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.btn}>
					{!archived && (
						<h2>{selectedCardLabel}</h2>
					)}
					{archived && (
						<div className={styles.back}>
							<h2>Archived Cargo</h2>
						</div>
					)}
				</div>
				<div className={styles.head2}>

					{!isMapView &&	(
						<div
							role="presentation"
							className={styles.status}
							onClick={() => { setArchived(!archived); }}
						>
							{ archived ? 'UnArchived Cargo' : 'Archived Cargo' }

						</div>
					)}
					{!archived &&	(
						<>
							<div
								role="presentation"
								className={`${isMapView ? styles.without_click : styles.on_click} ${styles.list_view}`}
								onClick={() => { setIsMapView(false); }}
							>
								<IcMListView className={styles.icon} />
							</div>
							<div
								role="presentation"
								className={`${isMapView ? styles.on_click : styles.without_click} ${styles.map_view}`}
								onClick={() => { setIsMapView(true); }}
							>
								<IcMMap className={styles.icon} />
							</div>
						</>
					)}
					<div className={styles.fillter_div}>
						<Popover
							placement="bottom"
							content={(
								<FilterComponent
									trackers={trackers}
									filters={filters}
									setFilters={setFilters}
									showFilters={showFilters}
									setShowFilters={setShowFilters}
								/>
							)}
							visible={showFilters}
							caret={false}
							onClickOutside={() => { setShowFilters(false); }}
						>
							<IcMFilter className={styles.icon} onClick={() => { setShowFilters(!showFilters); }} />
						</Popover>
					</div>

				</div>
			</div>
			{!loading && empty && (
				<div>
					<EmptyState />
				</div>
			)}
			{!isMapView && (
				<div>
					{!loading
						? (
							<div>
								{trackerList?.map((tracker) => (
									<Card
										key={tracker?.id}
										tracker={tracker}
										setTrackers={setTrackers}
										refetch={refetch}
										loading={loading}
									/>
								))}
							</div>
						) : ([1, 2, 3, 4].map(() => (
							<CardPlaceholder height="182px" />
						)))}
				</div>
			)}
			{isMapView && (
				<div>
					{!loading
						? (
							<div className={styles.map_container}>
								<TrackerMap points={points} type="air" />
							</div>
						) : (<Placeholder height="182px" width="324px" />)}
				</div>
			)}
			{!empty && !loading && (
				<div className={styles.pagination}>
					<Pagination
						type="number"
						currentPage={pagination.page}
						totalItems={trackers?.total_count}
						pageSize={10}
						onPageChange={(e) => { setPagination({ page: e }); }}
					/>
				</div>
			)}
		</div>
	);
}
export default TrackerCard;
