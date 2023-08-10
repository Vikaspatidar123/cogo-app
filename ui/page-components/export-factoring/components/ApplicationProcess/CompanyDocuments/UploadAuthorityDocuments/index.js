import React from 'react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

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
			{/* <FilePreview name="Letter of Authority" /> */}
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
