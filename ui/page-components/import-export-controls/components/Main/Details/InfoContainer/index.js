import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import HsCode from '../../../../../hs-code-modal';
import ProductCatalogue from '../../../../../product-catalogue-modal';
import PaymentOptionsModal from '../../../../common/PaymentOptionsModal';
import PendingModal from '../../../../common/PendingModal';
import controlsConfig from '../../../../configurations/controlsConfig';
import useGetQuota from '../../../../hooks/useGetQuota';
import useInfoValidate from '../../../../hooks/useInfoValidate';

import HyperLink from './HyperLine';
import styles from './styles.module.css';
import ValidateHsModal from './ValidateHsModal';

import getField from '@/packages/forms/Controlled';

function InfoContainer({ formInfo, setFormInfo }) {
	const { t } = useTranslation(['importExportControls']);

	const [showCatalogue, setShowCatalogue] = useState(false);
	const [showHsCodeModal, setShowHsCodeModal] = useState(false);
	const [selectedData, setSelectedData] = useState();
	const [isImportHs, setIsImportHs] = useState(false);
	const [showValidate, setShowValidate] = useState(false);
	const [prevHs, setPrevHs] = useState({});
	const [showPaymentOptionsModal, setPaymentOptionsModal] = useState(false);
	const [showPendingModal, setShowPendingModal] = useState(false);

	const SelectProductModal = showCatalogue ? ProductCatalogue : HsCode;
	const fields = controlsConfig({ t });
	const { isUserSubscribed = false, isQuotaLeft = false } = useGetQuota();

	const paymentSuccessHandler = () => {
		setShowPendingModal(false);
		setShowValidate(true);
	};

	const {
		formProps,
		getKey,
		changeHandler,
		loading = false,
		submitHandler,
		validateSubmitHandler,
		stop,
		btnSubtmitHandler,
		getDraftFn,
		isMobile = false,
		watchImportCountry,
		watchExportCountry,
	} = useInfoValidate({
		isUserSubscribed,
		isQuotaLeft,
		formInfo,
		setFormInfo,
		isImportHs,
		selectedData,
		setShowValidate,
		setPaymentOptionsModal,
		paymentSuccessHandler,
		setShowPendingModal,
		prevHs,
		setPrevHs,
	});

	const {
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
		control,
	} = formProps;

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
								<p className={styles.label}>{label}</p>
								{sublabel && (
									<p className={styles.sub_label}>
										(
										{sublabel}
										)
									</p>
								)}
								{errors?.[name] && (
									<p className={styles.error}>
										{`${t('importExportControls:details_error')} *`}
									</p>
								)}
							</div>
							<Element
								{...config}
								key={getKey(name)}
								handleChange={(e) => changeHandler(name, e)}
								control={control}
							/>

							{(name === 'exportHsCode' || name === 'importHsCode') && (
								<HyperLink
									setShowCatalogue={setShowCatalogue}
									setShowHsCodeModal={setShowHsCodeModal}
									setIsImportHs={setIsImportHs}
									name={name}
								/>
							)}
						</div>
					);
				})}
			</div>
			<div className={styles.btn_container}>
				<Button
					className={` ${styles.submit_btn} ${
						watchExportCountry === watchImportCountry ? styles.disable_btn : ''
					}`}
					loading={loading}
					onClick={handleSubmit(submitHandler)}
					disabled={watchExportCountry === watchImportCountry}
				>
					{t('importExportControls:details_btn')}
				</Button>
			</div>

			<SelectProductModal
				showCatalogue={showCatalogue}
				setShowCatalogue={setShowCatalogue}
				showHsCodeModal={showHsCodeModal}
				setShowHsCodeModal={setShowHsCodeModal}
				setSelectedData={setSelectedData}
				isMobile={isMobile}
			/>
			{showValidate && (
				<ValidateHsModal
					show={showValidate}
					setShow={setShowValidate}
					handleSubmit={handleSubmit}
					formInfo={formInfo}
					setValue={setValue}
					setFormInfo={setFormInfo}
					loading={loading}
					validateSubmitHandler={validateSubmitHandler}
					prevHs={prevHs}
					setPrevHs={setPrevHs}
					getDraftFn={getDraftFn}
					isMobile={isMobile}
				/>
			)}
			<PendingModal
				showPendingModal={showPendingModal}
				setShowPendingModal={setShowPendingModal}
				btnSubtmitHandler={btnSubtmitHandler}
				stop={stop}
			/>
			{showPaymentOptionsModal && (
				<PaymentOptionsModal
					isUserSubscribed={isUserSubscribed}
					getValues={getValues}
					showPaymentOptionsModal={showPaymentOptionsModal}
					validateSubmitHandler={validateSubmitHandler}
					setPaymentOptionsModal={setPaymentOptionsModal}
				/>
			)}
		</div>
	);
}

export default InfoContainer;
