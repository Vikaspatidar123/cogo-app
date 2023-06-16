import { Button, Toast } from '@cogoport/components';
import { useEffect, useState } from 'react';

import FormTitleAndDescription from '../../../common/FormTitleAndDescription';
import useSubmitCreditApplication from '../../../hooks/useSubmitCreditApplication';
import useUpdateOrganizationCreditApplication from '../../../hooks/useUpdateOrganizationCreditApplication';

import Preview from './PreviewAndUpload';
import Signatory from './Signatory';
import SignatoryDetails from './SignatoryDetails';
import SignatoryMethod from './SignatoryMethod';
import styles from './styles.module.css';
import UploadSignedCopy from './UploadSignedCopy';

import { useForm } from '@/packages/forms';

const DETAILS_ARRAY = ['method', 'signatory', 'preview_and_upload', 'upload_signed_copy'];

function SignatoryForm({ getCreditRequestResponse = {}, refetch = () => {} }) {
	const {
		documents,
		documents:{ paylater_agreement },
		signatories = [],
		is_sign_mode_digital = '',
		sample_paylater_agreement = '',
	} = getCreditRequestResponse || {};

	const [method, setMethod] = useState(is_sign_mode_digital ? 'digital' : 'physical');

	const [changeSignatory, setChangeSignatory] = useState(false);

	const [show, setShow] = useState({});

	const { showMethod = '', showPreview = '', showSignatory = '', showUpload = '' } = show || {};

	const formMapping = {
		method             : showMethod && SignatoryMethod,
		signatory          : showSignatory ? Signatory : SignatoryDetails,
		preview_and_upload : showPreview && Preview,
		upload_signed_copy : showUpload && UploadSignedCopy,
	};

	const { control, handleSubmit, watch } = useForm({
		defaultValues: {
			signature_proof: paylater_agreement?.active?.document_url,
		},
	});

	const {
		updateOrganizationCreditApplication = () => {},
		loading = false,
	} = useUpdateOrganizationCreditApplication({ refetch, getCreditRequestResponse, method });

	const {
		submitCreditApplication = () => {},
		loading:submitApplicationLoading = false,
	} = useSubmitCreditApplication({ getCreditRequestResponse, refetch });

	const submit = async (values) => {
		await updateOrganizationCreditApplication({ physicalVerificationValues: values, submitCreditApplication });
	};

	useEffect(() => {
		setShow({
			showMethod: signatories.length === 0 || is_sign_mode_digital === (method === 'physical')
			|| method === 'physical' || changeSignatory,
			showPreview   : sample_paylater_agreement && is_sign_mode_digital,
			showSignatory : !(signatories.length > 0)
			|| is_sign_mode_digital === (method === 'physical') || changeSignatory,
			showUpload: method === 'physical' && signatories.length > 0 && !changeSignatory,
		});
	}, [changeSignatory, documents, is_sign_mode_digital, method, sample_paylater_agreement, signatories.length]);

	return (
		<div>
			{DETAILS_ARRAY.map((details) => {
				const FormFields = formMapping[details];
				if (FormFields) {
					return (
						<div>
							<div className={styles.wrapper}>
								<div className={styles.form_description}>
									<FormTitleAndDescription details={details} />
								</div>
								<div className={styles.form}>
									<FormFields
										getCreditRequestResponse={getCreditRequestResponse}
										setMethod={setMethod}
										method={method}
										setChangeSignatory={setChangeSignatory}
										updateOrganizationCreditApplication={updateOrganizationCreditApplication}
										loading={loading}
										control={control}
									/>
								</div>
							</div>
						</div>

					);
				}
				return null;
			})}
			<div className={styles.button_wrapper}>
				{sample_paylater_agreement && method === 'physical' && !watch('signature_proof')
					&& (
						<Button
							onClick={() => !method && Toast.error('Please Select a method')}
						>
							Next
						</Button>
					)}
				{sample_paylater_agreement && method === 'digital' && (
					<Button
						onClick={submitCreditApplication}
						loading={submitApplicationLoading}
					>
						Proceed to E-sign
					</Button>
				)}

				{sample_paylater_agreement && method === 'physical' && watch('signature_proof') && (
					<Button
						onClick={handleSubmit(submit)}
						loading={loading}
					>
						{is_sign_mode_digital ? 'Proceed to E-sign' : 'Submit Agreement' }
					</Button>
				)}
			</div>
		</div>
	);
}

export default SignatoryForm;
