import { TabPanel, Tabs } from '@cogoport/components';
import { useEffect } from 'react';

import RelationshipManager from '../RelationshipManager';
import Tracking from '../TimeLineHorizontal/components/Tracking';

import IEDocuments from './IEDocuments';
import IEPocAndSop from './IEPocAndSop';
import Overview from './Overview';
import SalesInvoice from './SalesInvoice';
import styles from './styles.module.css';

function TabSections({
	quickAction,
	activeTab = '',
	setActiveTab = () => {},
	setQuickAction = () => {},
	servicesLoading = false,
	servicesList = [],
}) {
	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	useEffect(() => {
		if (quickAction) {
			setActiveTab(quickAction);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quickAction]);
	return (
		<main className={styles.container} id="ie_tabs">
			<RelationshipManager />

			<section className={styles.content}>
				<Tabs activeTab={activeTab} onChange={handleTabChange}>
					<TabPanel name="services" title="SERVICES">
						<Overview
							quickAction={quickAction}
							setQuickAction={setQuickAction}
							servicesLoading={servicesLoading}
							servicesList={servicesList}
						/>
					</TabPanel>

					<TabPanel name="invoices" title="INVOICE">
						<div className={styles.invoice_div}>
							<SalesInvoice isCustomer />
						</div>
					</TabPanel>

					<TabPanel name="documents" title="DOCUMENTS">
						<IEDocuments />
					</TabPanel>

					<TabPanel name="sop_poc" title="SOP AND POC">
						<IEPocAndSop
							quickAction={quickAction}
							setQuickAction={setQuickAction}
						/>
					</TabPanel>
					<TabPanel name="tracking" title="TRACKING">
						<Tracking />
					</TabPanel>
				</Tabs>
			</section>
		</main>
	);
}

export default TabSections;
