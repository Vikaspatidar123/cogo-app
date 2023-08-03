import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import BankDetails from '../BankDetails';
import styles from './styles.module.css';

import Agreement from './Agreement';
import CompanyDocuments from './CompanyDocuments';
import OptUdcAndPdc from './OptUdcPdcDocuments';
import { upperCase } from '@cogoport/utils';

const tabsPanelMapping = (maximum_org_annual_income, flags) => {
	const { bank_details = ''} = flags || {};
	const baseTabs = [
		{
			name      : 'agreement',
			title     : 'Agreement',
			Component : Agreement,
			status    : 'PENDING',
		},
		{
			name      : 'bankDetails',
			title     : 'Bank Details',
			Component : BankDetails,
			status    : upperCase(bank_details) || 'PENDING',
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
			Component : OptUdcAndPdc,
			status    : 'PENDING',
		},
	];

	if (maximum_org_annual_income >= 100) {
		baseTabs.splice(3, 1);
	}

	return baseTabs;
};

function ApplicationProcess({ active = {}, getCreditRequestResponse = {}, refetch = () => {}, loading = false }) {
	const { maximum_org_annual_income = 0, flags = {}, status = '' } = getCreditRequestResponse;
	const [activeTab, setActiveTab] = useState('agreement');
	return (

		<div style={{ margin: 20 }}>
			{status === 'approved' && (
				<div>
					<div className={styles.congrats_div}>
					<span>Congratulations 🎉</span>
					<span>
					You have successfully been registered with us!
					</span>
				</div>
				</div>
			)}
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{tabsPanelMapping(maximum_org_annual_income, flags).map(({
					title = '',
					Component, status = '', name = '',
				}) => (
					<TabPanel name={name} title={title} badge={status} key={name}>
						<Component
							active={active}
							getCreditRequestResponse={getCreditRequestResponse}
							refetch={refetch}
							loading={loading}
						/>
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}

export default ApplicationProcess;
