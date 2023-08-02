import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import ApplicationProcess from '../ApplicationProcess';
import BasicDetails from '../BasicDetails';
// import Buyers from '../Buyers';
import Buyers from '../Buyers';
import CompanyInformation from '../CompanyInformation';
import DirectorInformation from '../DirectorInformation';
import Invoices from '../Invoices';
import OfferLetterDetails from '../OfferLetterDetails';
import { OfferLetterWaiting } from '../WaitingScreens';

import styles from './styles.module.css';

const RENDERING_FORM = {
	awaiting_user_inputs  : BasicDetails,
	payment_success       : CompanyInformation,
	awaiting_offer_letter : OfferLetterDetails,
	offer_letter_complete : DirectorInformation,
	locked                : OfferLetterWaiting,
	processing            : ApplicationProcess,
	finance_assessment    : ApplicationProcess,
	approved              : ApplicationProcess,
};
const tabsPanelMapping = (status) => {
	const tabsConfig = [
		{
			name         : 'application',
			title        : 'Application',
			SubComponent : ApplicationProcess,
		},
		{
			name         : 'Buyers',
			title        : 'Buyers',
			SubComponent : Buyers,
		},
		{
			name         : 'Invoices',
			title        : 'Invoices',
			SubComponent : Invoices,
		},
	];

	if (status !== 'approved') {
		tabsConfig.splice(2, 1);
	}

	return tabsConfig;
};

function Form({ active = {}, getCreditRequestResponse = {}, refetch = () => {}, loading }) {
	const [activeTab, setActiveTab] = useState('application');
	const { flags = {} } = getCreditRequestResponse;
	const Component = RENDERING_FORM[active];

	const { status = '' } = getCreditRequestResponse || {};

	return (
		<div className={styles.form}>
			{ flags?.offer_letter === 'complete' ?	(
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					{tabsPanelMapping(status).map(({ title = '', SubComponent, name = '' }) => {
						const MappedComponet = flags?.offer_letter === 'complete'
						&& (active === 'offer_letter_complete') && activeTab === 'application'
							? RENDERING_FORM.offer_letter_complete : SubComponent;

						return (
							<TabPanel name={name} title={title} key={name}>
								{(active === 'locked' && activeTab === 'application')
									? (
										<OfferLetterWaiting
											active={active}
											getCreditRequestResponse={getCreditRequestResponse}
											refetch={refetch}
											loading={loading}
										/>
									) : (
										<MappedComponet
											active={active}
											getCreditRequestResponse={getCreditRequestResponse}
											refetch={refetch}
											loading={loading}
										/>
									)}
							</TabPanel>
						);
					})}
				</Tabs>
			) : (
				<Component
					active={active}
					getCreditRequestResponse={getCreditRequestResponse}
					refetch={refetch}
					loading={loading}
				/>
			)}
		</div>
	);
}

export default Form;
