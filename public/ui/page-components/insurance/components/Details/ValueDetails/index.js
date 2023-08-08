import { useEffect, useState } from 'react';

import PendingModal from '../../../common/PendingModal';
import PreviewModal from '../../../common/PreviewModal';
import SuccessModal from '../../../common/SuccessModal';
import getControls from '../../../configurations/valueControls';
import useGetRates from '../../../hooks/useGetRates';

import ChargeDetails from './ChargeDetails';
import DocumentsRequired from './DocumentsRequired';
import Footer from './Footer';
import InvoiceDetails from './InvoiceDetails';
import PricingSummary from './PricingSummary';
import styles from './styles.module.css';
import submitHandler from './submitHandler';
import TermsConditions from './TermsConditions';

import { useForm } from '@/packages/forms';
import useSearchQuery from '@/packages/forms/hooks/useDebounceQuery';

function ValueDetails({
	setActiveStepper,
	resp = () => {},
	formDetails = {},
	ratesResponse = {},
	setRatesResponse = () => {},
	countryDetails = {},
	commodityName = '',
	insuranceLoading = false,
	paymentLoading = false,
	setFormDetails = () => {},
	checkLoading = false,
	stop = false,
	paymentStatus = '',
	createInsuranceLoading = false,
	policyIdDownload = '',
	draftResponse = () => {},
	draftLoading = false,
	policyid = '',
	activeTab = '',
	type = '',
	countryCode = '',
	uploadType = '',
	setModal = () => {},
	showModal = {},
	postInsuranceResponse = {},
}) {
	const [isMobile, setIsMobile] = useState(false);
	const [checked, setChecked] = useState(false);
	const [termsconditionshow, setTermsConditionsShow] = useState(false);
	const [showPreviewModal, setShowPreviewModal] = useState(false);
	const [agree, setAgree] = useState(false);
	const [finalData, setFinalData] = useState();
	const [uploadedFiles, setUploadedFiles] = useState({});

	const fields = getControls({ formDetails, uploadType });

	const { showSuccessModal = false, pendingModal = false } = showModal || {};

	const { query, debounceQuery } = useSearchQuery();

	const {
		control,
		handleSubmit,
		watch,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			policyCurrency : formDetails?.policyCurrency || '',
			cargoAmount    : formDetails?.cargoAmount || '',
			invoiceNo      : formDetails?.invoiceNo || '',
			invoiceDate    : formDetails?.invoiceDate || '',
			invoiceDoc     : formDetails?.verificationDoc?.invoiceDoc?.url,
			panDoc         : formDetails?.verificationDoc?.panDoc?.url,
			gstDoc         : formDetails?.verificationDoc?.gstDoc?.url,
			aadharDoc      : formDetails?.verificationDoc?.aadharDoc?.url,
		},
	});

	const watcher = watch(['policyCurrency', 'cargoAmount', 'invoiceNo', 'invoiceDate']);

	const watchInvoiceAmount = watch('cargoAmount');

	useEffect(() => {
		debounceQuery(watchInvoiceAmount);
	}, [debounceQuery, watchInvoiceAmount]);

	const { ratesLoading } = useGetRates({
		activeTab,
		formDetails,
		countryCode,
		setRatesResponse,
		query          : query || watcher[1],
		policyCurrency : watcher?.[0],
	});

	const submit = (values) => {
		submitHandler({
			values,
			setError,
			setFinalData,
			setActiveStepper,
			setShowPreviewModal,
			setFormDetails,
			formDetails,
			checked,
			setAgree,
			uploadedFiles,
		});
	};

	const saveDraft = (values) => {
		setFormDetails((prev) => ({
			...prev,
			...values,
			verificationDoc: {
				aadharDoc: {
					name    : 'Aadhar',
					url     : uploadedFiles.aadharDoc || null,
					success : true,
				},
				invoiceDoc : { name: 'Invoice', url: uploadedFiles.invoiceDoc || null, success: true },
				gstDoc     : { name: 'GstDoc', url: uploadedFiles.gstDoc || null, success: true },
				panDoc     : { name: 'Invoice', url: uploadedFiles.panDoc || null, success: true },
			},
		}));

		const draftPayload = {
			...formDetails,
			verificationDoc: {
				aadharDoc: {
					name    : 'Aadhar',
					url     : uploadedFiles.aadharDoc || null,
					success : true,
				},
				invoiceDoc : { name: 'Invoice', url: uploadedFiles.invoiceDoc || null, success: true },
				gstDoc     : { name: 'GstDoc', url: uploadedFiles.gstDoc || null, success: true },
				panDoc     : { name: 'Invoice', url: uploadedFiles.panDoc || null, success: true },
			},
			...values,
			...ratesResponse,
		};

		draftResponse(draftPayload, policyid);
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMobile(window.innerWidth < 760);
		}
	}, []);

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.yellow_line} />
				<div className={styles.padded_div}>
					<div className={styles.heading_wrapper}>
						<div className={styles.flex_2}>
							<div className={styles.heading}>Consignment Details</div>
						</div>
						<div className={styles.line_wrapper}>
							<div className={styles.line} />
						</div>
					</div>
					<form type="submit">
						<div className={styles.content_wrapper}>
							<div>
								<div className={styles.row}>
									<ChargeDetails
										fields={fields}
										isMobile={isMobile}
										control={control}
										errors={errors}
									/>
								</div>
								<div
									className={isMobile
										? styles.invoice_details_mobile : styles.invoice_details}
								>
									<div className={styles.flex_2}>
										<div className={styles.heading}>Invoice Details</div>
									</div>
									<div className={styles.line_wrapper}>
										<div className={styles.line} />
									</div>
								</div>
								<div className={styles.row}>
									<InvoiceDetails
										fields={fields}
										isMobile={isMobile}
										control={control}
										errors={errors}
									/>
								</div>
								<div className={isMobile
									? styles.invoice_details_mobile : styles.invoice_details}
								>
									<div className={styles.flex_2}>
										<div className={styles.heading}>Documents required</div>
									</div>
									<div className={styles.line_wrapper}>
										<div className={styles.line} />
									</div>
								</div>
							</div>
							{!isMobile && (
								<PricingSummary
									ratesResponse={ratesResponse}
									formDetails={formDetails}
									ratesLoading={ratesLoading}
								/>
							)}
						</div>
						{isMobile && (
							<PricingSummary
								ratesResponse={ratesResponse}
								formDetails={formDetails}
								ratesLoading={ratesLoading}
							/>
						)}
						<div className={styles.documents_row}>
							<DocumentsRequired
								fields={fields}
								control={control}
								errors={errors}
								setUploadedFiles={setUploadedFiles}
							/>
						</div>
					</form>
					<Footer
						saveDraft={saveDraft}
						submit={submit}
						handleSubmit={handleSubmit}
						agree={agree}
						setTermsConditionsShow={setTermsConditionsShow}
						ratesLoading={ratesLoading}
						draftLoading={draftLoading}
						setAgree={setAgree}
						checked={checked}
						setChecked={setChecked}
						ratesResponse={ratesResponse}
						setActiveStepper={setActiveStepper}
					/>

					{showSuccessModal && (
						<SuccessModal
							showSuccessModal={showSuccessModal}
							setModal={setModal}
							createInsuranceLoading={createInsuranceLoading}
							policyIdDownload={policyIdDownload}
							postInsuranceResponse={postInsuranceResponse}
						/>
					)}
					{showPreviewModal && (
						<PreviewModal
							formDetails={formDetails}
							showPreviewModal={showPreviewModal}
							setShowPreviewModal={setShowPreviewModal}
							countryDetails={countryDetails}
							commodityName={commodityName}
							watcher={watcher}
							insuranceLoading={insuranceLoading}
							paymentLoading={paymentLoading}
							resp={resp}
							finalData={finalData}
							ratesResponse={ratesResponse}
						/>
					)}
					{termsconditionshow && (
						<TermsConditions
							setTermsConditionsShow={setTermsConditionsShow}
							termsconditionshow={termsconditionshow}
							setAgree={setChecked}
							isMobile={isMobile}
							activeTab={activeTab}
							type={type}
							formDetails={formDetails}
							countryCode={countryCode}
						/>
					)}
					{pendingModal && (
						<PendingModal
							pendingModal={pendingModal}
							setModal={setModal}
							stop={stop}
							paymentStatus={paymentStatus}
							checkLoading={checkLoading}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
export default ValueDetails;
