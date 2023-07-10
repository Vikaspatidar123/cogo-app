import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import ApplicationProcess from '../ApplicationProcess';
import BasicDetails from '../BasicDetails';
// import Buyers from '../Buyers';
import CompanyInformation from '../CompanyInformation';
import DirectorInformation from '../DirectorInformation';
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
const tabsPanelMapping = [{
	name         : 'application',
	title        : 'Application',
	SubComponent : ApplicationProcess,
	status       : 'PENDING',
}, 
// {
// 	name         : 'Buyers',
// 	title        : 'Buyers',
// 	SubComponent : Buyers,

// },
// {
// 	name         : 'Invoices',
// 	title        : 'Invoices',
// 	SubComponent : Invoices,
// },

];
function Form({ active = {}, getCreditRequestResponse = {}, refetch = () => {}, loading }) {
	const [activeTab, setActiveTab] = useState('application');
	const { flags = {} } = getCreditRequestResponse;
	const Component = flags?.offer_letter === 'complete' && active === 'awaiting_offer_letter'
		? RENDERING_FORM.offer_letter_complete : RENDERING_FORM[active];

	return (
		<div className={styles.form}>
			{ flags?.offer_letter === 'complete' ?	(
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					{tabsPanelMapping.map(({ title = '', SubComponent, status = '', name = '' }) => (
						<TabPanel name={name} title={title} badge={status}>
							<SubComponent
								active={active}
								getCreditRequestResponse={getCreditRequestResponse}
								refetch={refetch}
								loading={loading}
							/>
						</TabPanel>
					))}
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
