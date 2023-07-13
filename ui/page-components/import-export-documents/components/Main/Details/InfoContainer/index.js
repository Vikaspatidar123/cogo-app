import { cl, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import HsCode from '../../../../../hs-code-modal';
import ProductCatalogue from '../../../../../product-catalogue-modal';
import PaymentOptionsModal from '../../../../common/PaymentOptionsModal';
import PendingModal from '../../../../common/PendingModal';
import documentConfig from '../../../../configuration/documentConfig';
import useCheckPaymentStatus from '../../../../hooks/useCheckPaymentStatus';
import useDraft from '../../../../hooks/useDraft';
import infoValidateFn from '../../../../hooks/useInfoValidateFn';
import useVerifyHscode from '../../../../hooks/useVerifyHsCode';
import ValidateHsModal from '../../ValidateHsModal';

import HyperLink from './HyperLine';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRouter } from '@/packages/next';

function InfoContainer({
	transportDetails = {},
	setTransportDetails,
	isUserSubscribed,
	isQuotaLeft,
}) {
	const { t } = useTranslation(['importExportDoc']);
	const [showValidate, setShowValidate] = useState(false);
	const [prevHs, setPrevHs] = useState('');
	const [selectedData, setSelectedData] = useState();
	const [showCatalogue, setShowCatalogue] = useState(false);
	const [showHsCodeModal, setShowHsCodeModal] = useState(false);
	const [showPaymentOptionsModal, setPaymentOptionsModal] = useState(false);
	const [showPendingModal, setShowPendingModal] = useState(false);

	const { query, push } = useRouter();
	const { billId = '' } = query || {};

	const fields = documentConfig({ t });
	const { refetchDraft, draftLoading, getDraftFn, getDraftData } = useDraft();
	const { verifySixDigitHs, verifySixDigitLoading } = useVerifyHscode();

	const SelectProductModal = showCatalogue ? ProductCatalogue : HsCode;

	const formProps = useForm();
	const {
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors },
		getValues,
	} = formProps;

	const [watchHsCode, watchExport, watchImport] = watch([
		'hsCode',
		'exportCountry',
		'importCountry',
	]);

	const paymentSuccessHandler = () => {
		setShowPendingModal(false);
		setShowValidate(true);
	};

	const { stop, checkPaymentStatus } = useCheckPaymentStatus({
		setShowPendingModal,
		paymentSuccessHandler,
		billId,
	});

	const {
		submitHandler,
		changeHandler,
		validateSubmitHandler,
		getKey,
		renderLabel,
		withHsHandler,
		errorHandler,
	} = infoValidateFn({
		verifySixDigitHs,
		watchHsCode,
		setShowValidate,
		transportDetails,
		setTransportDetails,
		refetchDraft,
		isUserSubscribed,
		isQuotaLeft,
		setPaymentOptionsModal,
		checkPaymentStatus,
		setValue,
		billId,
		getValues,
		push,
		selectedData,
		watchExport,
		watchImport,
		setShowPendingModal,
		styles,
		getDraftData,
	});

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{fields.map((config) => {
					const { label, sublabel, type, name } = config || {};
					if (type === 'hidden') return null;
					const Element = getField(type);

					return (
						<div className={styles.col} key={name}>
							<div className={styles.label_container}>
								{renderLabel(name, label)}
								{sublabel && (
									<p className={styles.sub_label}>
										(
										{sublabel}
										)
									</p>
								)}
								{errors?.[name] && (
									<p className={styles.error}>
										{t('importExportDoc:details_form_req')}
									</p>
								)}
							</div>
							<Element
								{...config}
								control={control}
								key={getKey(name)}
								handleChange={(e) => changeHandler(name, e)}
							/>

							{name === 'hsCode' && (
								<HyperLink
									setShowCatalogue={setShowCatalogue}
									setShowHsCodeModal={setShowHsCodeModal}
								/>
							)}
						</div>
					);
				})}
			</div>
			<div className={styles.btn_container}>
				<Button
					className={cl`${styles.submit_btn} ${watchExport === watchImport ? styles.disable_btn : null}`}
					onClick={handleSubmit(submitHandler, errorHandler)}
					loading={verifySixDigitLoading || draftLoading}
					disabled={watchExport === watchImport}
				>
					{t('importExportDoc:details_btn_text')}
				</Button>
			</div>
			{showValidate && (
				<ValidateHsModal
					show={showValidate}
					setShow={setShowValidate}
					handleSubmit={handleSubmit}
					setVerifiedData={setSelectedData}
					hsCode={watchHsCode}
					prevHs={prevHs}
					setPrevHs={setPrevHs}
					getDraftFn={getDraftFn}
					validateSubmitHandler={validateSubmitHandler}
					draftLoading={draftLoading}
					transportDetails={transportDetails}
				/>
			)}

			{showPaymentOptionsModal && (
				<PaymentOptionsModal
					isUserSubscribed={isUserSubscribed}
					showPaymentOptionsModal={showPaymentOptionsModal}
					setPaymentOptionsModal={setPaymentOptionsModal}
					validateSubmitHandler={validateSubmitHandler}
					getValues={getValues}
				/>
			)}
			{showPendingModal && (
				<PendingModal
					showPendingModal={showPendingModal}
					setShowPendingModal={setShowPendingModal}
					watchHsCode={watchHsCode}
					withHsHandler={withHsHandler}
					handleSubmit={handleSubmit}
					stop={stop}
				/>
			)}
			<SelectProductModal
				showCatalogue={showCatalogue}
				setShowCatalogue={setShowCatalogue}
				setSelectedData={setSelectedData}
				showHsCodeModal={showHsCodeModal}
				setShowHsCodeModal={setShowHsCodeModal}
				isMobile={false}
			/>
		</div>
	);
}

export default InfoContainer;
