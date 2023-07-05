import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import Agreement from './Agreement';
import BankDetails from '../BankDetails';
import CompanyDocuments from './CompanyDocuments';
import UdcAndPdc from './UdcAndPdc';

const tabsPanelMapping = [{
	name      : 'agreement',
	title     : 'Agreement',
	Component : Agreement,
	status    : 'PENDING',
}, {
	name      : 'bankDetails',
	title     : 'Bank Details',
	Component : BankDetails,
	status    : 'PENDING',
},
{
	name      : 'companyDocuments',
	title     : 'Company Documents',
	Component : CompanyDocuments,
	status    : 'PENDING',
},
{
	name      : 'udc&Pdc',
	title     : 'UDC PDC',
	Component : UdcAndPdc,
	status    : 'PENDING',
},
];

function ApplicationProcess() {
	const [activeTab, setActiveTab] = useState('agreement');
	return (

		<div style={{ margin: 20 }}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{tabsPanelMapping.map(({ title = '', Component, status = '', name = '' }) => (
					<TabPanel name={name} title={title} badge={status}>
						<Component />
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}

export default ApplicationProcess;
