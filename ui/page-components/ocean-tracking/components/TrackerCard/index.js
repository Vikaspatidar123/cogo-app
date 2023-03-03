import { Placeholder, Pagination, Popover } from '@cogoport/components';
import { IcMListView, IcMMap, IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import useFetchTrackers from '../../hooks/useFetchTrackers';
import Map from '../Map/index';

import Card from './Card';
import FilterComponent from './FIlterComponent';
import styles from './styles.module.css';

function TrackerCard({ archived, setArchived }) {
	const { loading, trackers, pagination, setPagination, filters, setFilters } = useFetchTrackers();

	const [isMapView, setIsMapView] = useState(false);
	const [showFilters, setShowFilters] = useState(false);

	const trackerList = trackers?.list;

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div>
					All Shipments
				</div>
				<div className={styles.head2}>

					<div
						role="presentation"
						className={styles.status}
						onClick={() => { setArchived(!archived); }}
					>
						Archived Shipments
					</div>
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
			{!isMapView && (
				<div>
					{!loading
						? (
							<div>
								{trackerList?.map((tracker) => (
									<Card tracker={tracker} />
								))}
							</div>
						) : (<Placeholder height="182px" />)}
				</div>
			)}
			{isMapView && (
				<div>
					{!loading
						? (
							<div className={styles.map_container}>
								<Map />
							</div>
						) : (<Placeholder height="182px" width="324px" />)}
				</div>
			)}
			<div className={styles.pagination}>
				<Pagination
					type="number"
					currentPage={pagination.page}
					totalItems={trackers?.total_count}
					pageSize={10}
					onPageChange={(e) => { setPagination({ page: e }); }}
				/>
			</div>
		</div>
	);
}
export default TrackerCard;
