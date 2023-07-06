import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

const fields = {
	name        : 'partnership_doc',
	placeholder : 'Upload Signed & Stamped Partnership Deed',
	type        : 'file',
};

function PartnershipDocuments() {
	const { control } = useForm();
	const Element = getField(fields?.type);
	return (
		<form>
			<div className={styles.field}>
				<div className={styles.field_name}>{fields?.placeholder}</div>
				<Element control={control} {...fields} />
			</div>
		</form>
	);
}

export default PartnershipDocuments;
