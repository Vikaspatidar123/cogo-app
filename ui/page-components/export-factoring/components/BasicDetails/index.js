import React from 'react';

import FormCard from '../../common/FormCard';

import CompanyInfoForm from './CompanyInfoForm';
import styles from './styles.module.css';

function BasicDetails({ active = {}, getCreditRequestResponse = {}, refetch = () => {} }) {
	const mappingComponent = [
		{
			title       : 'Company Details',
			description : 'Provide company information',
			Component   : CompanyInfoForm,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.header}>Basic information</div>
			<FormCard
				componentMapping={mappingComponent}
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
			/>
		</div>
	);
}

export default BasicDetails;
