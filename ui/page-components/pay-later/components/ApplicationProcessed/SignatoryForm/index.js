import { Button, Toast } from '@cogoport/components';
import { useEffect, useState } from 'react';

import FormTitleAndDescription from '../../../common/FormTitleAndDescription';
import useSubmitCreditApplication from '../../../hooks/useSubmitCreditApplication';
import useUpdateOrganizationCreditApplication from '../../../hooks/useUpdateOrganizationCreditApplication';

import PreviewAndUpload from './PreviewAndUpload';
import Signatory from './Signatory';
import SignatoryDetails from './SignatoryDetails';
import SignatoryMethod from './SignatoryMethod';
import styles from './styles.module.css';
import UploadSignedCopy from './UploadSignedCopy';

const DETAILS_ARRAY = ['method', 'signatory', 'preview_and_upload', 'upload_signed_copy'];

function SignatoryForm({ getCreditRequestResponse = {}, refetch = () => {} }) {
	const [method, setMethod] = useState('');
	const [showPreviewAndUpload, setPreviewAndUpload] = useState(false);
	const { signatories = [], is_sign_mode_digital = '' } = getCreditRequestResponse || {};

	const [signatoriesUpdated, setSignatoriesUpdated] = useState(false);

	const formMapping = {
		method             : !showPreviewAndUpload && SignatoryMethod,
		signatory          : signatoriesUpdated ? SignatoryDetails : Signatory,
		// signatory          : signatoriesUpdated ? Signatory : SignatoryDetails,
		preview_and_upload : showPreviewAndUpload && PreviewAndUpload,
		upload_signed_copy : showPreviewAndUpload && method === 'physical' && UploadSignedCopy,
	};

	const {
		updateOrganizationCreditApplication = () => {},
		loading = false,
	} = useUpdateOrganizationCreditApplication({ refetch, getCreditRequestResponse, method });

	const { submitCreditApplication = () => {} } = useSubmitCreditApplication({ getCreditRequestResponse });

	const handleClick = () => {
		submitCreditApplication();
		// get_credit_application_logs?credit_request_id=14def529-4a40-499f-a775-c23dc367504c
	};

	useEffect(() => {
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
					<Button onClick={handleClick}>
						{method === 'physical' ? 'Submit Agreement' : 'Proceed to E-sign' }
					</Button>
				)}
			</div>
		</div>
	);
}

export default SignatoryForm;
