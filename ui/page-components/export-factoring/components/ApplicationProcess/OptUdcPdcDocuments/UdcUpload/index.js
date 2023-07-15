import React, { useEffect } from 'react';
import { useForm } from '@/packages/forms';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import FilePreview from '@/ui/page-components/export-factoring/common/FilePreview';
import useGetAgreement from '@/ui/page-components/export-factoring/hooks/useGetAgreement';

const fields = {
	name        : 'signed_udc',
	placeholder : 'Upload Signed UDC Document',
	type        : 'file',
	rules       : {
		required: true,
	},

};
function PostedCheque({ getCreditRequestResponse, setUdcCheque }) {
	const { getAgreement, data } = useGetAgreement();
	const { documents = {} } = getCreditRequestResponse;
	const { signed_undated_cheque_agreement = {} } = documents;
	const { control } = useForm();
	const Element = getField(fields?.type);

	useEffect(() => {
		getAgreement(getCreditRequestResponse.credit_id, 'undated_cheque_agreement');
	}, [getCreditRequestResponse.credit_id, getAgreement]);

	if (signed_undated_cheque_agreement.active) {
		return (
			<div className={styles.container}>
				<FilePreview name="Signed UDC" url={signed_undated_cheque_agreement.active.document_url} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{data?.url && <FilePreview name="UDC Agreement" url={data?.url} />}
			<div className={styles.form_div}>
				<form>
					<div className={styles.field}>
						<div className={styles.field_name}>{fields?.placeholder}</div>
						<Element
							control={control}
							{...fields}
							handleChange={(e) => setUdcCheque((prev) => ({ ...prev, signed_udc: e }))}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PostedCheque;
