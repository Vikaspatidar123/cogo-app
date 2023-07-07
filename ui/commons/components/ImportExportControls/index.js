import { TabPanel, Tabs } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import ResultDetails from './ResultDetails';
import styles from './styles.module.css';

function ImportExportControls({ controls, EmptyState, listClassName }) {
	const [activeTab, setActiveTab] = useState('EXPORT');
	const [controlVal, setControlVal] = useState({
		importControls : [],
		exportControls : [],
	});

	const { importControls, exportControls } = controlVal;

	const TAB_MAPPING = {
		IMPORT: {
			controlArr : importControls,
			// title      : t('importExportControls:result_tab_1'),
			title      : 'IMPORT',
		},
		EXPORT: {
			controlArr : exportControls,
			// title      : t('importExportControls:result_tab_2'),
			title      : 'EXPORT',
		},
	};

	useEffect(() => {
		if (!isEmpty(controls)) {
			const impControls = [];
			const expControls = [];

			(controls || []).forEach((control) => {
				if (control?.tradeType === 'IMPORT') {
					impControls.push(control);
				} else {
					expControls.push(control);
				}
			});

			setControlVal({
				importControls : impControls,
				exportControls : expControls,
			});
		}
	}, [controls]);

	return (
		<div className={styles.importer_exporter}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{Object.keys(TAB_MAPPING).map((ele) => {
					const info = TAB_MAPPING[ele]; return (
						<TabPanel name={ele} title={info.title} key={ele}>
							{(!isEmpty(info?.controlArr)) ? (
								<ResultDetails
									activeTab={activeTab}
									controls={info.controlArr}
									listClassName={listClassName}
								/>
							) : (
								<EmptyState />
							)}
						</TabPanel>
					);
				})}

			</Tabs>

		</div>
	);
}

export default ImportExportControls;
