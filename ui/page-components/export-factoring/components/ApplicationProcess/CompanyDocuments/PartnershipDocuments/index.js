import { Button } from '@cogoport/components';
import React, { useCallback, useEffect, useMemo } from 'react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import FilePreview from '@/ui/page-components/export-factoring/common/FilePreview';
import useSubmitAgreement from '@/ui/page-components/export-factoring/hooks/useSubmitAgreement';
import useUpdateCreditApplication from '@/ui/page-components/export-factoring/hooks/useUpdateCreditApplication';

const fields = {
	name        : 'partnership_deed',
	placeholder : 'Upload Signed & Stamped Partnership Deed',
	type        : 'file',
};

function PartnershipDocuments({
	getCreditRequestResponse = {},
	refetch = () => {},
}) {
	const { documents: { partnership_deed = {} }, flags:{ documentation } } = getCreditRequestResponse;
	const { updateCreditApplication = () => {} } = useUpdateCreditApplication();
	const { submit, loading } = useSubmitAgreement();

	const { control } = useForm();

	const Element = getField(fields?.type);

	const uploadpartnerDocument = async (value) => {
		const payload = {
			credit_id                           : getCreditRequestResponse.credit_id,
			export_factoring_service_attributes : {
				section_to_update : 'documents',
				documents         : [
					{
						document_extension : 'pdf',
						document_type      : 'partnership_deed',
						document_url       : value,
					},
				],
			},
		};
		const resp = await updateCreditApplication(payload);
		if (resp) {
			refetch();
		}
	};
	const handleSubmit = async () => {
		const response = await submit(getCreditRequestResponse.credit_id, 'documentation');
		if (response) {
			refetch();
		}
	};

	return (
		<form>
			{!partnership_deed.active && (
				<div className={styles.field}>
					<div className={styles.field_name}>{fields?.placeholder}</div>
					<Element control={control} {...fields} handleChange={(e) => uploadpartnerDocument(e)} />
				</div>
			)}
			{partnership_deed.active
				&& <FilePreview name="partnership_deed" url={partnership_deed.active.document_url} />}
			<div className={styles.btn_container}>
				<Button
					onClick={handleSubmit}
					loading={loading}
					disabled={loading
					|| documentation === 'approval_pending'}
					type="button"
				>
					Submit
				</Button>
			</div>
		</form>
	);
}

export default PartnershipDocuments;
