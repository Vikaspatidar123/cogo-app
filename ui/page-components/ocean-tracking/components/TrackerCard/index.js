import { Placeholder, Pagination } from '@cogoport/components';
import { IcMListView, IcMMap, IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import useFetchTrackers from '../../hooks/useFetchTrackers';

import Card from './Card';
import styles from './styles.module.css';

function TrackerCard({ activeTab, archived, setArchived }) {
	const { loading, fetchTrackers, trackers, pagination, setPagination } = useFetchTrackers();

	const [isMapView, setIsMapView] = useState(false);

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
						<IcMListView width="20px" height="20px" />
					</div>
					<div
						role="presentation"
						className={`${isMapView ? styles.on_click : styles.without_click} ${styles.map_view}`}
						onClick={() => { setIsMapView(true); }}
					>
						<IcMMap width="20px" height="20px" />
					</div>
					<div className={styles.fillter_div}>
						<IcMFilter width="20px" height="20px" />
					</div>

				</div>
			</div>
			{!isMapView && (
				<div>
					{!loading
						? (
							<div>
								{trackerList?.map((tracker, index) => (
									<Card tracker={tracker} />
								))}
							</div>
						) : (<Placeholder height="182px" />)}
				</div>
			)}
			{isMapView && (
				<div>
					{!loading
						? (<div className={styles.map_container} />) : (<Placeholder height="182px" width="324px" />)}
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
