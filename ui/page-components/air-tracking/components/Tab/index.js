import useArchiveList from '../../hooks/useArchiveList';
import useFetchTrackers from '../../hooks/useFetchTrackers';
import FilterCards from '../FilterCards';
import TrackerCard from '../TrackerCard';

import styles from './styles.module.css';

function Tab({ archived, setArchived }) {
	const {
		loading,
		trackers,
		setTrackers,
		pagination,
		setPagination,
		filters,
		setFilters,
		refetch,
		activeKey,
		onClick,
		selectedCardLabel,
		FILTER_CARDS_LIST,
	} = useFetchTrackers({ archived });
	const {
		trackers: trackersArchived,
		loading: loadingArchived,
		setTrackers: setTrackers1,
		pagination: pagination1,
		setPagination: setPagination1,
		filters: filters1,
		setFilters: setFilters1,
		refetch: refetch1,
	} = useArchiveList({ archived });

	const { stats = {} } = trackers || {};
	return (
		<div>
			{!archived && (
				<div className={styles.scroll}>
					<div className={styles.parent_tab}>
						{FILTER_CARDS_LIST.map((key) => (
							<FilterCards
								key={key}
								id={key}
								onClick={onClick}
								activeKey={activeKey}
								stats={stats}
								{...(key === 'total_subscriptions' && {
									'data-instructional-overlay-step': '1',
								})}
								{...(key === 'on_track_shipments' && {
									'data-instructional-overlay-step': '2',
								})}
								{...(key === 'attention_required' && {
									'data-instructional-overlay-step': '3',
								})}
							/>
						))}
					</div>
				</div>
			)}
			{!archived && (
				<TrackerCard
					archived={archived}
					setArchived={setArchived}
					loading={loading}
					trackers={trackers}
					setTrackers={setTrackers}
					pagination={pagination}
					setPagination={setPagination}
					filters={filters}
					setFilters={setFilters}
					selectedCardLabel={selectedCardLabel}
					refetch={refetch}
				/>
			)}
			{archived && (
				<TrackerCard
					archived={archived}
					setArchived={setArchived}
					loading={loadingArchived}
					trackers={trackersArchived}
					setTrackers={setTrackers1}
					pagination={pagination1}
					setPagination={setPagination1}
					filters={filters1}
					setFilters={setFilters1}
					selectedCardLabel={selectedCardLabel}
					refetch={refetch1}
				/>
			)}
		</div>
	);
}
export default Tab;
