import React, { useState } from 'react';

import FormCard from '../../../common/FormCard';

import SignatoryMethod from './SignatoryMethod';
import styles from './styles.module.css';
import Signatory from './Signatory';

function Agreement({ getCreditRequestResponse, refetch, loading, active }) {
	const [method, setMethod] = useState('digital');
	const mappingComponent = [
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
