import { Button, Toast } from '@cogoport/components';
import { useEffect, useState } from 'react';

import FormTitleAndDescription from '../../../common/FormTitleAndDescription';
import useUpdateOrganizationCreditApplication from '../../../hooks/useUpdateOrganizationCreditApplication';

import PreviewAndUpload from './PreviewAndUpload';
import Signatory from './Signatory';
import SignatoryDetails from './SignatoryDetails';
import SignatoryMethod from './SignatoryMethod';
import styles from './styles.module.css';
import UploadSignedCopy from './UploadSignedCopy';

const DETAILS_ARRAY = ['method', 'signatory', 'preview_and_upload', 'upload_signed_copy'];

function SignatoryForm({ getCreditRequestResponse }) {
	const [method, setMethod] = useState('');
	const [showPreviewAndUpload, setPreviewAndUpload] = useState(false);
	const { signatories = [] } = getCreditRequestResponse || {};

	const [signatoriesUpdated, setSignatoriesUpdated] = useState(false);

	const formMapping = {
		method             : !showPreviewAndUpload && SignatoryMethod,
		// signatory          : signatoriesUpdated ? SignatoryDetails : Signatory, correct one
		signatory          : signatoriesUpdated ? Signatory : SignatoryDetails,
		preview_and_upload : showPreviewAndUpload && PreviewAndUpload,
		upload_signed_copy : showPreviewAndUpload && method === 'physical' && UploadSignedCopy,
	};

	const { updateOrganizationCreditApplication = () => {} } = useUpdateOrganizationCreditApplication();

	const handleClick = () => {
		// first update_organization_credit_application
		// then submit submit_credit_application_for_agreement_flow
		// get_credit_application_logs?credit_request_id=14def529-4a40-499f-a775-c23dc367504c
	};

	useEffect(() => {
		setSignatoriesUpdated(signatories?.length > 0);
	}, [signatories?.length]);

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
