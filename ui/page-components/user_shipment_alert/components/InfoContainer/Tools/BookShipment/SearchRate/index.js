import { Input, Button, TabPanel, Tabs } from '@cogoport/components';
import { IcMAppSearch, IcAInternational, IcAShipAmber } from '@cogoport/icons-react';
import { useState } from 'react';

import GeoSelect from './GeoSelect';
import styles from './styles.module.css';

function SearchRate() {
	const [tab, setTab] = useState('sea');

	return (
		<div className={styles.container}>
			<div className={styles.title}>Search Rates to Book</div>
			<Tabs
				activeTab={tab}
				themeType="primary"
				onChange={setTab}
			>
				<TabPanel
					icon={<IcAShipAmber width={20} height={20} />}
					name="sea"
					title="Sea"
				/>

				<TabPanel
					icon={<IcAInternational width={20} height={20} />}
					name="air"
					title="Air"
				/>
			</Tabs>
			<GeoSelect tab={tab} />
		</div>
	);
}

export default SearchRate;
