import { Tabs, TabPanel } from '@cogoport/components';
import { useState, useMemo } from 'react';

import EmptyState from '../EmptyState';

import ResultDetails from './ResultDetails';
import styles from './styles.module.css';

const importControls = [];
const exportControls = [];

const TAB_MAPPING = {
	IMPORT : importControls,
	EXPORT : exportControls,
};

function IEControlsModal({ tradeEngineResponse = {} }) {
	const [activeTab, setActiveTab] = useState('EXPORT');

	const { lineItem = [] } = tradeEngineResponse || {};
	const { controls = [] } = lineItem[0] || {};

	useMemo(() => {
		(controls || []).forEach((control) => {
			if (control?.tradeType === 'IMPORT') {
				importControls.push(control);
			} else {
				exportControls.push(control);
			}
		});
	}, [controls]);

	return (
		<div>
			{controls?.length > 0 ? (
				<div className={styles.importer_exporter}>
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						<TabPanel name="EXPORT" title="Export Controls">
							{TAB_MAPPING?.[activeTab]?.length > 0 ? (
								<ResultDetails
									activeTab={activeTab}
									controls={TAB_MAPPING?.[activeTab]}
								/>
							) : (
								<EmptyState />
							)}
						</TabPanel>

						<TabPanel name="IMPORT" title="Import Controls">
							{TAB_MAPPING?.[activeTab]?.length > 0 ? (
								<ResultDetails
									activeTab={activeTab}
									controls={TAB_MAPPING?.[activeTab]}
								/>
							) : (
								<EmptyState />
							)}
						</TabPanel>
					</Tabs>

				</div>
			) : (
				<EmptyState />
			)}
		</div>
	);
}
export default IEControlsModal;
