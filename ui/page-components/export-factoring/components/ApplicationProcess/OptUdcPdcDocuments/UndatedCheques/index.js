import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import FilePreview from '@/ui/page-components/export-factoring/common/FilePreview';

const fields = {
	name        : 'undate_cheque',
	placeholder : 'Upload undated cheque',
	type        : 'file',

};
function UndatedCheques() {
	const { control } = useForm();
	const Element = getField(fields?.type);

	console.log({ ...fields }, 'aaaa');

	return (
		<div className={styles.container}>
			{/* <FilePreview name="Udc Agreement" /> */}
			<div className={styles.form_div}>
				<form>
					{[1, 2, 3, 4, 5].map((x) => (
						<div className={styles.field}>
							<div className={styles.field_name}>{fields?.placeholder}</div>
							<Element
								control={control}
								name={`undate_cheque_${x}`}
								placeholder={`Upload undated cheque ${x}`}
								type="file"
							/>
						</div>
					))}

				</form>
			</div>
		</div>
	);
}

export default UndatedCheques;
