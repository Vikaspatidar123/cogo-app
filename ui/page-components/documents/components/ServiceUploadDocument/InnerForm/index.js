import { Button } from '@cogoport/components';

import { formControls } from '../../../InnerUploadControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function InnerForm({ value = {}, setActiveCollapse = () => {}, addDocument = () => {}, addDocumentLoading = false }) {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const onSubmit = (val) => {
		const payload = {
			image_url     : val?.doc_file,
			data          : { document_validity: val?.doc_validity, document_number: val?.doc_number },
			name          : value?.doc_name,
			document_type : value?.doc_type,
		};
		addDocument(payload);
		setActiveCollapse('');
	};

	return (
		<div className={styles.inner_form}>
			<div className={styles.form}>
				{formControls.map((item) => {
					const { label, name, component } = item || {};
					const Element = getField(component);

					return (
						<div className={styles.form_group}>
							<span className={styles.label}>{label}</span>

							<div className={styles.input_group}>
								<Element
									{...item}
									key={name}
									control={control}
									id={`${name}_input`}
								/>

								<div className={styles.error_message}>
									{errors?.[name]?.message}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.bottom_container}>
				<Button
					themeType="secondary"
					style={{ margin: '0 8px 0 0' }}
					onClick={() => setActiveCollapse('')}
					disabled={addDocumentLoading}
				>
					Cancel
				</Button>

				<Button onClick={handleSubmit(onSubmit)} disabled={addDocumentLoading}>
					Save
				</Button>
			</div>
		</div>
	);
}

export default InnerForm;
