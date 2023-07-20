import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';
import TabSections from './Tabs';
import TimeLineHorizontal from './TimeLineHorizontal';

function ImporterExporter({ servicesLoading = false, servicesList = [] }) {
	const [activeTab, setActiveTab] = useState('services');
	const [quickAction, setQuickAction] = useState('');

	// const handleScroll = (id) => {
	// 	if (id) {
	// 		document.getElementById(id)?.scrollIntoView({
	// 			behavior : 'smooth',
	// 			block    : 'start',
	// 			inline   : 'nearest',
	// 		});
	// 		document.getElementById(id)?.focus();
	// 	}
	// };

	// useEffect(() => {
	// 	if (!isEmpty(activeTab)) {
	// 		handleScroll('ie_tabs');
	// 	}
	// }, [activeTab]);

	return (
		<div className={styles.container}>
			<TimeLineHorizontal
				setQuickAction={setQuickAction}
				servicesList={servicesList}
			/>

			<TabSections
				quickAction={quickAction}
				setQuickAction={setQuickAction}
				setActiveTab={setActiveTab}
				activeTab={activeTab}
				servicesLoading={servicesLoading}
				servicesList={servicesList}
			/>
		</div>
	);
}

export default ImporterExporter;
