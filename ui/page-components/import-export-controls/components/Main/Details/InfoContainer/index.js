import { Button } from '@cogoport/components';
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
	const [showCatalogue, setShowCatalogue] = useState(false);
	const [showHsCodeModal, setShowHsCodeModal] = useState(false);
	const [selectedData, setSelectedData] = useState();
	const [isImportHs, setIsImportHs] = useState(false);
	const [showValidate, setShowValidate] = useState(false);
	const [prevHs, setPrevHs] = useState({});
	const [showPaymentOptionsModal, setPaymentOptionsModal] = useState(false);
	const [showPendingModal, setShowPendingModal] = useState(false);

	const SelectProductModal = showCatalogue ? ProductCatalogue : HsCode;

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
		fields,
		handleSubmit,
		setValues,
		getValues,
		formState: { errors },
		control,
	} = formProps;

	return (
		<div className={styles.container}>
			<div className="row">
				{controlsConfig.map((config) => {
					const { label, sublabel, type, name } = config || {};
					if (type === 'hidden') return null;
					const Element = getField(type);

					return (
						<div className="col" key={name}>
							<div className="label_container">
								<p className="label">{label}</p>
								{sublabel && (
									<p className="sub_label">
										(
										{sublabel}
										)
									</p>
								)}
								{errors?.[name] && <p className="error">required *</p>}
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
			<div className="btn_container">
				<Button
					className={`primary md submit_btn ${
						watchExportCountry === watchImportCountry ? 'disable_btn' : ''
					}`}
					loading={loading}
					onClick={handleSubmit(submitHandler)}
					disabled={watchExportCountry === watchImportCountry}
				>
					Proceed To Checkout
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
					setValues={setValues}
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
