import { Input, Button } from '@cogoport/components';
import { IcMEyeopen, IcMDocument } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import FilePreview from '@/ui/page-components/export-factoring/common/FilePreview';
import useSubmitAgreement from '@/ui/page-components/export-factoring/hooks/useSubmitAgreement';
import useUpdateCreditApplication from '@/ui/page-components/export-factoring/hooks/useUpdateCreditApplication';

const fields = {
	name  : 'signed_document',
	type  : 'file',
	label : 'Upload Signed',
	rules : {
		required: true,
	},
};

function AgreementPreview({
	getCreditRequestResponse = {}, refetch = () => {
	},
	method = '',
}) {
	const { updateCreditApplication } = useUpdateCreditApplication();
	const { control, formState:{ errors } } = useForm();
	const { documents = {} } = getCreditRequestResponse || {};
	const {
		offer_letter = {}, exportfactoring_agreement = {},
		signed_exportfactoring_agreement = {}, signed_offer_letter,
	} = documents;
	const { submit, loading } = useSubmitAgreement();
	const handleSubmit = async () => {
		const response = await submit(getCreditRequestResponse.credit_id, 'signing_authorities');
		if (response) {
			refetch();
		}
	};
	const Element = getField('file');

	const handleUpload = async ({ url, type, section }) => {
		const payload = {
			credit_id                           : getCreditRequestResponse.credit_id,
			export_factoring_service_attributes : {
				section_to_update           : section,
				agreement_execution_details : {
					preferred_mode            : method,
					exportfactoring_agreement : {
						agreement_type     : type,
						document_url       : url,
						document_extension : 'pdf',
					},
				},
				documents: [{
					document_type      : type,
					document_url       : url,
					document_extension : 'pdf',
				}],
			},

		};
		const resp = await updateCreditApplication(payload);
		if (resp) {
			refetch();
		}
	};

	return (
		<>
			<p>
				Signing Mode :
				{' '}
				{upperCase(method)}
			</p>
			{exportfactoring_agreement.active && (
				<div
					className={styles.download}
					role="presentation"
				>
					<Input
						suffix={<IcMEyeopen className={styles.icon} />}
						prefix={<IcMDocument />}
						onClick={() => window.open(exportfactoring_agreement, '_blank')}
						value="RECEIVABLES PURCHASE AGREEMENT"
						readonly
						className={styles.download}
					/>
					{!signed_exportfactoring_agreement.active ? (
						<>
							<div className={styles.field}>
								<div className={styles.field_name}>
									{`${fields?.label} RPA`}
								</div>
								<Element
									control={control}
									{...fields}
									handleChange={(url) => {
										handleUpload({
											url,
											type    : 'exportfactoring',
											section : 'agreement_execution_details',
										});
									}}
								/>
							</div>
							<div className={styles.error_text}>
								{errors?.signed_document?.message
									|| errors?.signed_document?.type}
							</div>
						</>
					) : <FilePreview name="SIGNED RPA" url={signed_exportfactoring_agreement.active?.document_url} />}
				</div>
			)}
			{offer_letter?.active && (
				<div
					className={styles.download}
					role="presentation"
				>
					<Input
						suffix={<IcMEyeopen className={styles.icon} />}
						prefix={<IcMDocument />}
						value="OFFER LETTER"
						onClick={() => window.open(offer_letter.active?.document_url, '_blank')}
						readonly
						className={styles.download}
					/>
					{!signed_offer_letter?.active ? (
						<>
							<div className={styles.field}>
								<div className={styles.field_name}>
									{' '}
									{`${fields?.label} Offer Lettter`}
								</div>
								<Element
									control={control}
									{...fields}
									handleChange={(e) => {
										handleUpload({
											url     : e,
											type    : 'agreed_offer_letter',
											section : 'documents',
										});
									}}
								/>
							</div>
							<div className={styles.error_text}>
								{errors?.signed_document?.message
									|| errors?.signed_document?.type}
							</div>
						</>
					) : <FilePreview name="SIGNED OFFER LETTER" url={signed_offer_letter?.active?.document_url} />}
				</div>
			)}
			<div className={styles.btn_container}>

				<Button type="button" onClick={handleSubmit} loading={loading} disabled={loading}>
					Submit
				</Button>
			</div>
		</>
	);
}

export default AgreementPreview;
