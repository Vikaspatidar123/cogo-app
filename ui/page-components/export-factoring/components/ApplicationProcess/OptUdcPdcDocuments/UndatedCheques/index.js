import { Button, Toast } from '@cogoport/components';
import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import FilePreview from '@/ui/page-components/export-factoring/common/FilePreview';
import useUpdateCreditApplication from '@/ui/page-components/export-factoring/hooks/useUpdateCreditApplication';

const fields = {
	name        : 'undate_cheque',
	placeholder : 'Upload undated cheque',
	type        : 'file',
	rules       : {
		required: true,
	},

};
function UndatedCheques({ refetch = () => {}, udcCheque, getCreditRequestResponse }) {
	const { documents_list = {} } = getCreditRequestResponse;

	const { undated_cheque = [] } = documents_list;
	const { control, handleSubmit, formState:{ errors } } = useForm();
	const { updateCreditApplication, loading } = useUpdateCreditApplication();
	const Element = getField(fields?.type);

	const submitCheque = (values) => {
		if (Object?.keys(udcCheque.signed_udc || {}).length === 0) {
			Toast.error('Please Sign the Udc and uplaod');
		}
		const chequesList = Object.keys(values).map((item) => ({
			document_url       : values[item],
			document_extension : 'pdf',
		}));
		const payload = {
			credit_id                           : getCreditRequestResponse.credit_id,
			export_factoring_service_attributes : {
				section_to_update   : 'cheque_type_details',
				cheque_type_details : {
					cheque_type      : 'undated_cheque',
					signed_agreement : {
						document_url       : udcCheque.signed_udc,
						document_extension : 'pdf',
						document_type      : 'signed_undated_cheque_agreement',
					},
					cheques: chequesList,
				},
			},
		};
		const resp = updateCreditApplication(payload);
		if (resp) {
			refetch();
		}
	};

	if (undated_cheque.length > 0) {
		return (
			<div className={styles.container}>
				{undated_cheque.map((item) => (
					<FilePreview name={item.document_type} url={item.document_url} />
				))}
			</div>
		);
	}

	return (
		<div className={styles.container}>
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
								rules={{ required: true }}
							/>
							<div className={styles.error_text}>
								{errors?.[`undate_cheque_${x}`]?.message
								|| errors?.[`undate_cheque_${x}`]?.type }
							</div>
						</div>
					))}

				</form>
			</div>
			<div className={styles.btn_container}>
				<Button onClick={handleSubmit(submitCheque)} loading={loading} disabled={loading}> Submit</Button>
			</div>
		</div>
	);
}

export default UndatedCheques;
