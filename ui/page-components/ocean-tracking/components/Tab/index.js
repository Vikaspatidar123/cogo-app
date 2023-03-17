import { useState } from 'react';

import {
	FILTER_CARDS_LIST,
	FILTER_KEYS,
	FILTER_KEY_TO_ID,
	FILTER_KEY_TO_LABEL,
} from '../../common/constants';
import useArchiveList from '../../hooks/useArchiveList';
import useFetchTrackers from '../../hooks/useFetchTrackers';
import FilterCards from '../FilterCards';
import TrackerCard from '../TrackerCard';

import styles from './styles.module.css';

function Tab({ archived, setArchived }) {
	const [activeTab, setActiveTab] = useState('local_rates');
	const {
		loading, trackers, setTrackers, pagination, setPagination, filters, setFilters, refetch,
	} = useFetchTrackers();
	console.log(trackers, '345');
	const {
		trackers: trackers1,
		loading: loading1,
		setTrackers: setTrackers1,
		pagination: pagination1,
		setPagination: setPagination1,
		filters: filters1,
		setFilters: setFilters1,
		refetch: refetch1,
	} = useArchiveList();
	const { stats = {} } = trackers || {};
	const [activeKey, setActiveKey] = useState(FILTER_KEYS.ALL_SHIPMENTS);
	const removeActiveKeyFromFilters = () => {
		const newFilters = { ...filters };
		delete newFilters[activeKey];

		return newFilters;
	};
	const onClick = (key) => {
		// if key is active key
		if (key === activeKey) return;

		const newFilters = removeActiveKeyFromFilters();
		setActiveKey(key);
		if (key === FILTER_KEYS.ALL_SHIPMENTS) {
			setFilters(newFilters);
		} else {
			newFilters[key] = stats[FILTER_KEY_TO_ID[key]];
			setFilters(newFilters);
		}
	};
	const selectedCardLabel = FILTER_KEY_TO_LABEL[FILTER_CARDS_LIST.filter((key) => key === activeKey)[0]] ?? '';
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
					activeTab={activeTab}
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
			{ archived && (
				<TrackerCard
					activeTab={activeTab}
					archived={archived}
					setArchived={setArchived}
					loading={loading1}
					trackers={trackers1}
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
