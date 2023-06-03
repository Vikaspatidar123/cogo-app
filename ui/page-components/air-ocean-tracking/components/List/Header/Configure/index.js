import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Commodity from './Commodity';
import DailyReport from './DailyReport';
import DetentionDemurrage from './DetentionDemurrage';
import styles from './styles.module.css';

const configTab = {
	dailyStatus       : 'Daily Status Report',
	detentionDemurage : 'Detention & Demurage',
	commodity         : 'Commodity',
	referenceNo       : 'Reference Number',
	CustomizedAlerts  : 'Customized Alert',
};

const COMPONENT_MAPPING = {
	dailyStatus       : DailyReport,
	detentionDemurage : DetentionDemurrage,
	commodity         : Commodity,
};

function Configure() {
	const [configureTab, setConfigureTab] = useState('dailyStatus');
	const Component = COMPONENT_MAPPING?.[configureTab];
	return (
		<div className={styles.container}>
			<div className={styles.tab_panel}>
				<Tabs
					activeTab={configureTab}
					themeType="primary-vertical"
					onChange={setConfigureTab}
				>
					{Object.keys(configTab).map((config) => (
						<TabPanel name={config} title={configTab?.[config]} />
					))}
				</Tabs>
			</div>
			<div className={styles.content}>
				{/* <DailyReport /> */}
				<Component />
			</div>

		</div>
	);
}

export default Configure;
