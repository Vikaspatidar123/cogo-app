import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { formControls } from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function InnerForm({
	value = {},
	setActiveCollapse = () => {},
	addDocument = () => {},
	addDocumentLoading = false,
}) {
	const { t } = useTranslation(['documents']);

	const mandatory_validity_docs = [
		t('documents:custom_service_doc_1'),
		t('documents:custom_service_doc_2'),
		t('documents:custom_service_doc_3'),
		t('documents:custom_service_doc_4'),
		t('documents:custom_service_doc_7'),
		t('documents:custom_service_doc_8'),
		t('documents:custom_service_doc_15'),
	];

	const getMutatedFields = () => {
		const mutatedControls = [];
		formControls.forEach((cont) => {
			const controlItem = cont || {};

			if (controlItem.name === 'doc_validity') {
				if (mandatory_validity_docs.includes(value?.doc_name)) {
					controlItem.rules = { required: { value: true, message: 'Document Validity is required' } };
				} else {
					controlItem.rules = undefined;
				}
			}
			mutatedControls.push(controlItem);
		});

		return mutatedControls;
	};

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
				{getMutatedFields(value).map((item) => {
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
					{t('documents:cancel_btn')}
				</Button>

				<Button onClick={handleSubmit(onSubmit)} disabled={addDocumentLoading}>
					{t('documents:save_btn')}
				</Button>
			</div>
		</div>
	);
}

export default InnerForm;
