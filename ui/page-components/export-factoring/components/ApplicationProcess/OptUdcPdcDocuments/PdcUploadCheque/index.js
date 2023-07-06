import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import FilePreview from '@/ui/page-components/export-factoring/common/FilePreview';

const fields = {
	name        : 'signed_udc',
	placeholder : 'Upload Signed UDC Document',
	type        : 'file',

};
function PdcUploadCheque() {
	const { control } = useForm();
	const Element = getField(fields?.type);
	return (
		<div className={styles.container}>
			<FilePreview name="Udc Agreement" />
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

export default PdcUploadCheque;
