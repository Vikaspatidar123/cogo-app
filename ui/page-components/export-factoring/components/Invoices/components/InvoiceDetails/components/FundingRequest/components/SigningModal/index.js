import { Tooltip, Modal, Button, Select } from '@cogoport/components';
import { IcMArrowBack, IcMEyeopen, IcMPdf } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import SignatoryMethod from '../SignatoryMethod';

import styles from './styles.module.css';

import FileUploader from '@/packages/forms/Business/FileUploader';
import getField from '@/packages/forms/Controlled';
import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';
import { getFundingRequestSignatoryControls } from '@/ui/page-components/export-factoring/configurations/getFundingRequestSignatoryControls';
import useSubmitFundingRequest from '@/ui/page-components/export-factoring/hooks/useSubmitFundingRequest';

function SigningModal({
	data,
	refetch,
	setCurrentStep,
	receivableModal,
	setReceivableModal
}) {
	const [signingMode, setSigningMode] = useState('physical');
	const [exporterSignatory, setExporterSignatory] = useState('');

	const { documents = {} } = data || {};
	const { offer_receivable = [] } = documents;
	const { document_url = '' } = offer_receivable?.[0] || {};

	const signatoryOptions = data?.signatory_details?.map((x) => ({
		label : x?.name,
		value : x?.id,
	}));

	const signatoryDetails = data?.signatory_details?.find(
		(x) => x?.id === exporterSignatory,
	);

	const FileUploaderController = getField('file');

	const {
		name = '',
		designation = '',
		email = '',
		mobile_country_code = '',
		mobile_number = '',
	} = signatoryDetails || {};

	const fundingRequestSignatoryControls = getFundingRequestSignatoryControls();

	const {
		control, watch, handleSubmit, setValue, formState: { errors },
	} = useForm();

	const { loading, onSubmit } = useSubmitFundingRequest({
		data,
		refetch,
		receivableModal,
		setReceivableModal,
		exporterSignatory,
		signingMode,
	});

	useEffect(() => {
		if (signatoryDetails) {
			setValue('name', name);
			setValue('designation', designation);
			setValue('email', email);
			setValue('mobile_number', {
				country_code : mobile_country_code,
				number       : mobile_number,
			});
		}
	}, [signatoryDetails]);

	return (
		<>
			<Modal.Body>
				{document_url && (
					<>
						<div>
							File generated successfully, kindly review once before submit
						</div>
						<Tooltip
							content={<PdfViewer url={document_url} />}
							placement="top-start"
							interactive
						>
							<div className={styles.docContainer}>
								<div style={{ display: 'flex' }}>
									<div>
										<IcMPdf height="20px" width="20px" />
									</div>
									<div>
										Offer Receivable Generation
									</div>
								</div>
								<IcMEyeopen height="20px" width="20px" />
							</div>
						</Tooltip>
						<div />
					</>
				)}
				<div className={styles.flexDiv}>
					<div>
						<div className={styles.title}>
							Method
						</div>
						<div className={styles.description}>
							Select method of signature
						</div>
					</div>
					<div className={styles.formDiv}>
						<SignatoryMethod signingMode={signingMode} setSigningMode={setSigningMode} />
					</div>
				</div>

				<div className={styles.flexDiv}>
					<div>
						<div className={styles.title}>
							Signatory
						</div>
						<div className={styles.description}>
							Select the authorised signatory
						</div>
					</div>
					<div className={styles.formDiv}>
						<div className={styles.field_name}>Select Signatory</div>
						<Select
							value={exporterSignatory}
							onChange={(val) => setExporterSignatory(val)}
							options={signatoryOptions}
						/>
						{exporterSignatory && (

							<form>
								{fundingRequestSignatoryControls.map((item) => {
									const Element = getField(item?.type);
									return (
										item?.type && item?.name !== 'name'
									&& (
										<div className={styles.field}>
											<div className={styles.field_name}>{item?.label}</div>
											<Element control={control} {...item} />
											<div className={styles.error_text}>
												{errors?.[item?.name]?.message
												|| errors?.[item?.name]?.type }
											</div>
										</div>
									)
									);
								})}
							</form>
						)}
					</div>
				</div>

				<div>
					{exporterSignatory
					&& (signingMode === 'digital' ? (
						<div className={styles.noteText}>
							Note*: An E-sign email & SMS will be sent to “
							{signatoryDetails?.name}
							”. Please do the E-signing to start the
							Invoicing process.
						</div>
					) : (
						<>
							<div className={styles.noteText}>
								Note*: Please download the funding request letter & kindly sign
								and re-upload the signed copy and “Submit”
							</div>
							<div className={styles.uploadContainer}>
								<div className={styles.field_name}>Upload signed Offer Receivable</div>
								<FileUploaderController
									{...fundingRequestSignatoryControls[3]}
									control={control}
									styles={{ maxHeight: '30px' }}
								/>
								{errors?.signedLetter && (
									<div style={styles.error_text}>Required</div>
								)}
							</div>
						</>
					))}
				</div>

			</Modal.Body>
			<Modal.Footer>
				<Button
					type="button"
					size="md"
					className="secondary"
					onClick={() => setCurrentStep('review_details')}
					style={{ marginRight: '10px' }}
				>
					<IcMArrowBack />
					Previous Step
				</Button>
				<Button
					type="button"
					size="md"
					themeType="accent"
					disabled={loading || !signingMode || !exporterSignatory}					
					onClick={handleSubmit(onSubmit)}
					loading={loading}
				>
					Submit
				</Button>
			</Modal.Footer>

		</>
	);
}

export default SigningModal;
