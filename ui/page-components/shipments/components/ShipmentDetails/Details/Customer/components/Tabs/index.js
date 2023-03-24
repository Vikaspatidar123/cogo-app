import { TabPanel, Tabs } from '@cogoport/components';
import { useEffect } from 'react';

// import SalesInvoice from '../../../../../Invoicing/components/IEInvoicing';
// import IEPocAndSop from '../../../../../PocSop/IEPocAndSop';
// import IEDocuments from '../../../../commons/Documents/IEDocuments';
// import RelationshipManager from '../RelationshipManager';

// import Overview from './Overview';
// import { Container, Content, InvoiceDiv } from './styles';
import RelationshipManager from '../RelationshipManager';
import IEDocuments from './IEDocuments';

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
	}, [quickAction]);

	return (
		<div className={styles.container} id="ie_tabs">
			<RelationshipManager />

			<div className={styles.content}>
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

					{/* <TabPanel name="sop_poc" title="SOP AND POC">
						<IEPocAndSop
							quickAction={quickAction}
							setQuickAction={setQuickAction}
						/>
					</TabPanel>  */}
				</Tabs>
			</div>
		</div>
	);
}

export default TabSections;
