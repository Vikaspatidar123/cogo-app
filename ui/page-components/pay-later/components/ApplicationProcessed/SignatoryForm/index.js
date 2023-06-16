import { Button, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
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
		documents:{ paylater_agreement },
		signatories = [],
		is_sign_mode_digital = '',
		sample_paylater_agreement = '',
	} = getCreditRequestResponse || {};

	const [method, setMethod] = useState('');

	const [showPreviewAndUpload, setPreviewAndUpload] = useState(!isEmpty(paylater_agreement));

	const [signatoriesUpdated, setSignatoriesUpdated] = useState(false);

	const [show, setShow] = useState({});

	const { showMethod = '', showPreview = '', showSignatory = '', showUpload = '' } = show || {};

	const formMapping = {
		method             : showMethod && SignatoryMethod,
		signatory          : showSignatory ? Signatory : SignatoryDetails,
		preview_and_upload : showPreview && Preview,
		upload_signed_copy : showUpload && UploadSignedCopy,
	};

	const { control, handleSubmit } = useForm({
		defaultValues: {
			signature_proof: paylater_agreement?.active?.document_url,
		},
	});

	const {
		updateOrganizationCreditApplication = () => {},
		loading = false,
	} = useUpdateOrganizationCreditApplication({ refetch, getCreditRequestResponse, method });

	const { submitCreditApplication = () => {} } = useSubmitCreditApplication({ getCreditRequestResponse });

	const handleClick = () => {
		submitCreditApplication();
	};

	const submit = async (values) => {
		await updateOrganizationCreditApplication({ physicalVerificationValues: values });
		submitCreditApplication();
		return null;
	};

	useEffect(() => {
		setShow({
			showMethod    : !(sample_paylater_agreement && is_sign_mode_digital),
			showPreview   : sample_paylater_agreement && is_sign_mode_digital,
			showSignatory : !(signatories.length > 0),
			showUpload    : !is_sign_mode_digital,
		});
		setMethod(is_sign_mode_digital ? 'digital' : 'physical');
		setSignatoriesUpdated(signatories?.length > 0);
	}, [signatories?.length, is_sign_mode_digital]);

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
										setSignatoriesUpdated={setSignatoriesUpdated}
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
				{!showPreviewAndUpload 	? (
					<Button
						onClick={() => (!method ? Toast.error('Please Select a method') : setPreviewAndUpload(true))}
					>
						Next
					</Button>
				) : (
					<Button onClick={method === 'physical' ? handleSubmit(submit) : handleClick}>
						{method === 'physical' ? 'Submit Agreement' : 'Proceed to E-sign' }
					</Button>
				)}
			</div>
		</div>
	);
}

export default SignatoryForm;
