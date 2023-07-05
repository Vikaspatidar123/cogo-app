import React from 'react';

import FormCard from '../../../common/FormCard';

import PartnershipDocuments from './PartnershipDocuments';
import styles from './styles.module.css';
import UploadAuthorityDocuments from './UploadAuthorityDocuments';

function CompanyDocuments({ getCreditRequestResponse, refetch, loading, active }) {
	const mappingComponent = [
		{
			title       : 'Partnership deed',
			description : 'Upload your latest signed and stamped partnership deed',
			Component   : PartnershipDocuments,
		},
		{
			title       : 'Letter of Authority Preview & Upload',
			description : 'Go through the preview document carefully & upload the signed copy of the document',
			Component   : UploadAuthorityDocuments,
		},

	];
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Company Documents
			</div>
			<FormCard
				componentMapping={mappingComponent}
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
				loading={loading}
			/>
		</div>
	);
}

export default CompanyDocuments;
