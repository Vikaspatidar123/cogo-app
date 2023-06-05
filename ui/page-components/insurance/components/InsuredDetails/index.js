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
	isMobile = false,
	draftDetailsPrefilling = {},
	policyId = '',
}) {
	const initialState = isEmpty(draftDetailsPrefilling) ? {} : {
		...draftDetailsPrefilling,
		transitDate : draftDetailsPrefilling ? new Date(draftDetailsPrefilling?.transitDate?.toString()) : null,
		invoiceDate : draftDetailsPrefilling ? new Date(draftDetailsPrefilling?.invoiceDate?.toString()) : null,
	};

	const [formDetails, setFormDetails] = useState(initialState);

	return (
		<div className={isMobile ? styles.container_mobile : styles.container}>
			<SideStepper
				activeStepper={activeStepper}
				setActiveStepper={setActiveStepper}
				isMobile={isMobile}
			/>
			<Details
				setActiveStepper={setActiveStepper}
				activeStepper={activeStepper}
				formDetails={formDetails}
				setFormDetails={setFormDetails}
				type={type}
				activeTab={activeTab}
				isMobile={isMobile}
				policyId={policyId}
				draftDetailsPrefilling={draftDetailsPrefilling}
			/>
		</div>
	);
}
export default InsuredDetails;
