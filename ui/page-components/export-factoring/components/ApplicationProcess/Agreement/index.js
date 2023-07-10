import React, { useState } from 'react';

import FormCard from '../../../common/FormCard';

import AgreementPreview from './AgreementPreview';
import FinancialAssessment from './FinancialAssessment';
import Signatory from './Signatory';
import SignatoryMethod from './SignatoryMethod';
import styles from './styles.module.css';

function Agreement({ getCreditRequestResponse, refetch, loading, active }) {
	const { signatories = [], is_sign_mode_digital = false } = getCreditRequestResponse;
	const { flags = {} } = getCreditRequestResponse;
	const { signing_authorities = '' } = flags;
	const mode = (!is_sign_mode_digital ? 'physical' : 'digital');
	const [method, setMethod] = useState(mode);
	const mappingComponent = 	signatories.length > 0 ? [{
		title       : 'Preview Agreement',
		description : 'Preview of Offer Letter and Rpa ',
		Component   : AgreementPreview,
	}] : [
		{
			title       : 'Method',
			description : 'Select method of Signature',
			Component   : SignatoryMethod,
		},
		{
			title       : 'Signatory',
			description : 'Select authorised of Signatory',
			Component   : Signatory,
		},

	];

	if (signing_authorities === 'approval_pending') {
		return (
			<FinancialAssessment
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
				loading={loading}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Agreement
			</div>
			<FormCard
				componentMapping={mappingComponent}
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
				loading={loading}
				setMethod={setMethod}
				method={method}
			/>
		</div>
	);
}

export default Agreement;
