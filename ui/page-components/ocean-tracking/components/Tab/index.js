// import { Tabs, TabPanel } from '@cogoport/components';
// import { IcMProfile } from '@cogoport/icons-react';
import { useState } from 'react';

import {
	FILTER_CARDS_LIST,
	FILTER_KEYS,
	FILTER_KEY_TO_ID,
	FILTER_KEY_TO_LABEL,
} from '../../common/constants';
import useFetchTrackers from '../../hooks/useFetchTrackers';
import FilterCards from '../FilterCards';
import TrackerCard from '../TrackerCard';

import styles from './styles.module.css';

function Tab({ archived, setArchived }) {
	const [activeTab, setActiveTab] = useState('local_rates');
	const { loading, trackers, pagination, setPagination, filters, setFilters } = useFetchTrackers();
	const { stats = {} } = trackers || {};
	const [activeKey, setActiveKey] = useState(FILTER_KEYS.ALL_SHIPMENTS);
	console.log(stats, 'stats');
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

	console.log(filters, 'filteres');
	return (
		<div>
			{/* <Tabs
				tabIcon={<IcMProfile />}
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
				fullWidth
			>
				<TabPanel name="local_rates" title="Local Rates" badge={3}>
					<TrackerCard activeTab={activeTab} />
				</TabPanel>

				<TabPanel name="suggested_rates" title="Suggested Rates" badge={5}>
					<TrackerCard activeTab={activeTab} />
				</TabPanel>

				<TabPanel name="freight_bookings" title="Freight Bookings" badge={2}>
					<TrackerCard activeTab={activeTab} />
				</TabPanel>
			</Tabs> */}
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
			<TrackerCard
				activeTab={activeTab}
				archived={archived}
				setArchived={setArchived}
				loading={loading}
				trackers={trackers}
				pagination={pagination}
				setPagination={setPagination}
				filters={filters}
				setFilters={setFilters}
				selectedCardLabel={selectedCardLabel}
			/>
		</div>
	);
}
export default Tab;
