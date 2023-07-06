import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import FilePreview from '@/ui/page-components/export-factoring/common/FilePreview';

const fields = {
	name        : 'signed_pdc',
	placeholder : 'Upload Signed PDC Document',
	type        : 'file',

};
function PostedCheque() {
	const { control } = useForm();
	const Element = getField(fields?.type);
	return (
		<div className={styles.container}>
			<FilePreview name="PDC Agreement" />
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

export default PostedCheque;
