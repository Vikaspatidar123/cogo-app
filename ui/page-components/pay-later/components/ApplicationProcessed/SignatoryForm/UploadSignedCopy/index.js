import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

const fields = {
	name        : 'signature_proof',
	placeholder : 'Agreement',
	type        : 'file',
};

function UploadSignedCopy({ control, getCreditRequestResponse = {} }) {
	const { documents:{ paylater_agreement } } = getCreditRequestResponse || {};

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

export default UploadSignedCopy;
