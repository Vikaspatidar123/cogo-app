import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Commodity from './Commodity';
import DetentionDemurrage from './DetentionDemurrage';
import RefNumber from './RefNumber';
import styles from './styles.module.css';

const configTab = {
	commodity         : 'Commodity',
	detentionDemurage : 'Detention & Demurage',
	referenceNo       : 'Reference Number',
	CustomizedAlerts  : 'Customized Alert',
};

const COMPONENT_MAPPING = {
	detentionDemurage : DetentionDemurrage,
	commodity         : Commodity,
	referenceNo       : RefNumber,
};

function Configure({ closeHandler, shipmentId, refetchTrackerList }) {
	const [configureTab, setConfigureTab] = useState('commodity');
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
				<Component
					closeHandler={closeHandler}
					shipmentId={shipmentId}
					refetchTrackerList={refetchTrackerList}
				/>
			</div>

		</div>
	);
}

export default Configure;
