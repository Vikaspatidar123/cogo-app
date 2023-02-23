import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { useState } from 'react';

import TrackerCard from '../TrackerCard';

function Tab() {
	const [activeTab, setActiveTab] = useState('local_rates');
	return (
		<div>
			<Tabs
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
			</Tabs>

		</div>
	);
}
export default Tab;
