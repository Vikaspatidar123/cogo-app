import React from 'react';

import FormCard from '../../../common/FormCard';

import BoardResolutionDocuments from './BoardResolutionDocuments';
import PartnershipDocuments from './PartnershipDocuments';
import SoleLetterOfAuthority from './SoleLetterOfAuthority';
import styles from './styles.module.css';
import UploadAuthorityDocuments from './UploadAuthorityDocuments';

function CompanyDocuments({ getCreditRequestResponse, refetch, loading, active }) {
	const { registration_type = [] } = getCreditRequestResponse;

	const constitutionMapping = {
		PROPRIETORSHIP: [{
			title       : 'Sole Letter of Authority Preview & Upload',
			description : 'Go through the preview document carefully & upload the signed copy of the document',
			Component   : SoleLetterOfAuthority,
		}],
		PARTNERSHIP: [{
			title       : 'Partnership deed',
			description : 'Upload your latest signed and stamped partnership deed',
			Component   : PartnershipDocuments,
		},
		{
			title       : 'Letter of Authority Preview & Upload',
			description : 'Go through the preview document carefully & upload the signed copy of the document',
			Component   : UploadAuthorityDocuments,
		}],

		'LIMITED LIABILITY PARTNERSHIP': [{
			title       : 'Partnership deed',
			description : 'Upload your latest signed and stamped partnership deed',
			Component   : PartnershipDocuments,
		},
		{
			title       : 'Letter of Authority Preview & Upload',
			description : 'Go through the preview document carefully & upload the signed copy of the document',
			Component   : UploadAuthorityDocuments,
		}],
		'PRIVATE LIMITED COMPANY': [
			{
				title       : 'Board of Resolution Preview & Upload',
				description : 'Go through the preview document carefully & upload the signed copy of the document',
				Component   : BoardResolutionDocuments,
			}],
		'PUBLIC LIMITED COMPANY': [{
			title       : 'Board of Resolution Preview & Upload',
			description : 'Go through the preview document carefully & upload the signed copy of the document',
			Component   : BoardResolutionDocuments,
		}],
	}[registration_type];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Company Documents
			</div>
			<FormCard
				componentMapping={constitutionMapping}
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
				loading={loading}
			/>
		</div>
	);
}

export default CompanyDocuments;
