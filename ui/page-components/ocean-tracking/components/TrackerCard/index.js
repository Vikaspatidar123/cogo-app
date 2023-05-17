import { Placeholder, Pagination, Popover } from '@cogoport/components';
import { IcMListView, IcMMap, IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetallOceanRoutes from '../../hooks/useGetallOceanRoutes';
import EmptyState from '../Emptystate';
import Map from '../Map/index';

import Card from './Card';
import CardPlaceholder from './CardPlaceholder';
import FilterComponent from './FIlterComponent';
import styles from './styles.module.css';

function TrackerCard({
	archived,
	setArchived,
	loading,
	trackers,
	setTrackers,
	pagination,
	setPagination,
	filters,
	setFilters,
	selectedCardLabel,
	refetch,
}) {
	const { getAllOceanRoutes, points } = useGetallOceanRoutes();
	const [isMapView, setIsMapView] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const trackerList = trackers?.list;
	const empty = isEmpty(trackerList);
	useEffect(() => {
		if (trackers?.list) {
			getAllOceanRoutes(trackers?.list);
		}
	}, [trackers, pagination]);
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.btn}>
					{!archived && <h2>{selectedCardLabel}</h2>}
					{archived && <h2>Archived Shipments</h2>}
				</div>
				<div className={styles.head2}>
					<div
						role="presentation"
						className={styles.status}
						onClick={() => {
							setArchived(!archived);
						}}
					>
						{!archived
							? 'Archived Shipments'
							: 'UnArchived Shipments'}
					</div>
					{!archived && (
						<>
							<div
								role="presentation"
								className={`${
									isMapView
										? styles.without_click
										: styles.on_click
								} ${styles.list_view}`}
								onClick={() => {
									setIsMapView(false);
								}}
							>
								<IcMListView className={styles.icon} />
							</div>
							<div
								role="presentation"
								className={`${
                                	isMapView
                                		? styles.on_click
                                		: styles.without_click
								} ${styles.map_view}`}
								onClick={() => {
                                	setIsMapView(true);
								}}
							>
								<IcMMap className={styles.icon} />
							</div>
						</>
					)}
					{!isMapView && (
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
								onClickOutside={() => {
									setShowFilters(false);
								}}
							>
								<IcMFilter
									className={styles.icon}
									onClick={() => {
										setShowFilters(!showFilters);
									}}
								/>
							</Popover>
						</div>
					)}
				</div>
			</div>
			{!loading && empty && (
				<div>
					<EmptyState />
				</div>
			)}
			{!isMapView && (
				<div>
					{!loading ? (
						<div>
							{trackerList?.map((tracker) => (
								<Card
									tracker={tracker}
									setTrackers={setTrackers}
									refetch={refetch}
								/>
							))}
						</div>
					) : (
						[1, 2, 3, 4].map(() => (
							<CardPlaceholder height="182px" />
						))
					)}
				</div>
			)}
			{isMapView && (
				<div>
					{!loading ? (
						<div className={styles.map_container}>
							<Map points={points} height="80vh" />
						</div>
					) : (
						<Placeholder height="182px" width="324px" />
					)}
				</div>
			)}
			<div className={styles.pagination}>
				<Pagination
					type="number"
					currentPage={pagination.page}
					totalItems={trackers?.total_count}
					pageSize={10}
					onPageChange={(e) => {
						setPagination({ page: e });
					}}
				/>
			</div>
		</div>
	);
}
export default TrackerCard;
