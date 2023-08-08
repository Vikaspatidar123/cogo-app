import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import SideStepper from '../../common/FillOptions';
import Details from '../Details/index';

import styles from './styles.module.css';

function InsuredDetails({
	type = '',
	activeTab = '',
	setActiveStepper = () => {},
	activeStepper = '',
	draftDetailsPrefilling = {},
	policyId = '',
}) {
	const initialState = isEmpty(draftDetailsPrefilling) ? {} : {
		...draftDetailsPrefilling,
		transitDate: draftDetailsPrefilling.transitDate
			? new Date(draftDetailsPrefilling?.transitDate?.toString()) : '',
		invoiceDate: draftDetailsPrefilling.invoiceDate
			? new Date(draftDetailsPrefilling?.invoiceDate?.toString()) : '',
	};

	const [formDetails, setFormDetails] = useState(initialState);

	return (
		<div className={styles.container}>
			<SideStepper
				activeStepper={activeStepper}
				setActiveStepper={setActiveStepper}
			/>
			<Details
				setActiveStepper={setActiveStepper}
				activeStepper={activeStepper}
				formDetails={formDetails}
				setFormDetails={setFormDetails}
				type={type}
				activeTab={activeTab}
				policyId={policyId}
				draftDetailsPrefilling={draftDetailsPrefilling}
			/>
		</div>
	);
}
export default InsuredDetails;
