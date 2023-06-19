import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Commodity from './Commodity';
import CustomizeAlert from './CustomizeAlert';
import DetentionDemurrage from './DetentionDemurrage';
import RefNumber from './RefNumber';
import styles from './styles.module.css';

const configTab = {
	ocean: {
		commodity         : 'Commodity',
		detentionDemurage : 'Detention & Demurage',
		referenceNo       : 'Reference Number',
		CustomizedAlerts  : 'Customized Alert & Poc Details',
	},
	air: {
		commodity        : 'Commodity',
		referenceNo      : 'Reference Number',
		CustomizedAlerts : 'Poc Details',
	},
};

const COMPONENT_MAPPING = {
	detentionDemurage : DetentionDemurrage,
	commodity         : Commodity,
	referenceNo       : RefNumber,
	CustomizedAlerts  : CustomizeAlert,
};

function Configure({ closeHandler, shipmentId, refetchTrackerList, activeTab = 'ocean', shipmentInfo = {} }) {
	const [configureTab, setConfigureTab] = useState('commodity');
	const Component = COMPONENT_MAPPING?.[configureTab];

	const configTabList = configTab[activeTab];

	return (
		<div className={styles.container}>
			<div className={styles.tab_panel}>
				<Tabs
					activeTab={configureTab}
					themeType="primary-vertical"
					onChange={setConfigureTab}
				>
					{Object.keys(configTabList).map((config) => (
						<TabPanel key={config} name={config} title={configTabList?.[config]} />
					))}
				</Tabs>
			</div>
			<div className={styles.content}>
				<Component
					closeHandler={closeHandler}
					shipmentId={shipmentId}
					refetchTrackerList={refetchTrackerList}
					activeTab={activeTab}
					shipmentInfo={shipmentInfo}
				/>
			</div>

		</div>
	);
}

export default Configure;
