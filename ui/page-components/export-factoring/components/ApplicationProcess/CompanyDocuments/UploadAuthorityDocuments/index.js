import React from 'react';
import { useForm } from '@/packages/forms';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import FilePreview from '@/ui/page-components/export-factoring/common/FilePreview';

const fields = {
	name        : 'signature_proof',
	placeholder : 'Upload signed Letter of Authority',
	type        : 'file',

};
function UploadAuthorityDocuments() {
	const { control } = useForm();
	const Element = getField(fields?.type);
	return (
		<div className={styles.container}>
			<FilePreview name="Letter of Authority" />
			<div className={styles.form_div}>
				<form>
					<div className={styles.field}>
						<div className={styles.field_name}>{fields?.placeholder}</div>
						<Element control={control} {...fields} />
					</div>
				</form>
			</div>
		</div>
	);
}

export default UploadAuthorityDocuments;
