import { Button } from '@cogoport/components';
import React from 'react';
import { useForm } from '@/packages/forms';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import FilePreview from '@/ui/page-components/export-factoring/common/FilePreview';
import useUpdateCreditApplication from '@/ui/page-components/export-factoring/hooks/useUpdateCreditApplication';

const fields = {
	name        : 'signed_pdc',
	placeholder : 'Upload Signed UDC Document',
	type        : 'file',
	rules       : {
		required: true,
	},

};
function PdcUploadCheque({ refetch = () => {}, getCreditRequestResponse }) {
	const { updateCreditApplication, loading } = useUpdateCreditApplication();

	const { control, handleSubmit, formState: { errors } } = useForm();
	const Element = getField(fields?.type);
	const onSubmit = async () => {
		const payload = {
			credit_id                           : getCreditRequestResponse.credit_id,
			export_factoring_service_attributes : {
				section_to_update   : 'cheque_type_details',
				cheque_type_details : {
					cheque_type: 'postdated_cheque',
				},
			},
		};
		const resp = await updateCreditApplication(payload);
		if (resp) {
			refetch();
		}
	};
	return (
		<div className={styles.container}>
			<FilePreview name="PDC Agreement" />
			<div className={styles.form_div}>
				<form>
					<div className={styles.field}>
						<div className={styles.field_name}>{fields?.placeholder}</div>
						<Element control={control} {...fields} />
					</div>
					<div className={styles.error_text}>
						{errors?.signed_pdc?.message
									|| errors?.signed_pdc?.type}
					</div>
				</form>
			</div>
			<div className={styles.btn_container}>
				<Button type="button" onClick={handleSubmit(onSubmit)} loading={loading} disabled={loading}>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default PdcUploadCheque;
