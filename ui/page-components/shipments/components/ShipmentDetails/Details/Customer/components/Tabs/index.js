// import { Tabs, TabPanel } from '@cogoport/front/components';
// import React, { useEffect } from 'react';

// import SalesInvoice from '../../../../../Invoicing/components/IEInvoicing';
// import IEPocAndSop from '../../../../../PocSop/IEPocAndSop';
// import IEDocuments from '../../../../commons/Documents/IEDocuments';
// import RelationshipManager from '../RelationshipManager';

// import Overview from './Overview';
// import { Container, Content, InvoiceDiv } from './styles';

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
		<Container id="ie_tabs">
			<RelationshipManager />

			<Content>
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
						<InvoiceDiv>
							<SalesInvoice isCustomer />
						</InvoiceDiv>
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
				</Tabs>
			</Content>
		</Container>
	);
}

export default TabSections;
