import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { useState } from 'react';

import TrackerCard from '../TrackerCard';

import styles from './styles.module.css';

function Tab({ archived, setArchived }) {
	const [activeTab, setActiveTab] = useState('local_rates');

	const list = [1, 2, 3, 4];
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
				<div className={styles.parent_tab}>
					{list.map(() => (
						<div className={styles.tab_container}>
							<div className={styles.text}>All Shipments : 34</div>
							<div className={styles.text}> Total Container : 41</div>
							<div className={styles.text}> Tracked by BL/ Booking : 07</div>
						</div>
					))}
				</div>
			)}

			<TrackerCard activeTab={activeTab} archived={archived} setArchived={setArchived} />

		</div>
	);
}
export default Tab;
