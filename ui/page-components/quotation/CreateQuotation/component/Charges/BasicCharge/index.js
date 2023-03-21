import { cl, Button } from '@cogoport/components';
import { useState, forwardRef } from 'react';

import useCheckPaymentStatus from '../../../hooks/useCheckPaymentStatus';
import useGetDraft from '../../../hooks/useGetDraft';
import useGetQuota from '../../../hooks/useGetQuota';
import useTradeEngine from '../../../hooks/useTradeEngine';
import getRatesModal from '../../../utils/getRatesModal';
import PendingModal from '../../PendingModal';
import SuccessModal from '../../SuccessModal';
import TransactionModal from '../../TransactionModal';
import styles from '../styles.module.css';

import FreightCharges from './FreightCharges';
import PaymentModeModal from './PaymentModeModal';
import ValidateProductModal from './ValidateProductModal';

import getField from '@/packages/forms/Controlled';

const style = {
	padding  : ' 0px',
	fontSize : '9px',
};
const getSuffix = (name, getDutiesSubmitHandler, getRatesModalHandler) => {
	if (name === 'basicFreightCharges') {
		return (
			<Button
				size="sm"
				style={style}
				themeType="linkUi"
				onClick={getRatesModalHandler}
			>
				GET RATES
			</Button>
		);
	}
	if (name === 'dutiesAndTaxes') {
		return (
			<Button
				size="sm"
				style={style}
				themeType="linkUi"
				onClick={getDutiesSubmitHandler}
			>
				GET DUTIES
			</Button>
		);
	}
	return null;
};

function BasicCharge(
	{
		fields, control, errors, submitForm, watch, setValue, transportMode, createQuoteHook = {},
	},
	ref,
) {
	const [paymentModal, setPaymentModal] = useState(false);
	const [pendingModal, setPendingModal] = useState(false);
	const [transactionModal, setTransactionModal] = useState(false);
	const [validateProduct, setValidateProduct] = useState(false);
	const [paymentMode, setPaymentMode] = useState('addon');
	const [quoteRes, setQuoteRes] = useState({});
	const [calculateCharge, setCalculateCharge] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const { current } = ref || {};
	const { getRatesModalHandler, data } = getRatesModal({
		current,
		watch,
		setCalculateCharge,
	});
	const {
		isUserSubscribed = false,
		isQuotaLeft = false,
		quotaValue,
		prioritySequence,
		// getQuota,
	} = useGetQuota();

	const { postTradeEngine, transactionResp, tradeEngineLoading } = useTradeEngine();

	const { loading: getDraftLoading, getDraftData, getDraft } = useGetDraft();
	const { pendingStatus } = 	useCheckPaymentStatus(
		{
			setPendingModal,
			isUserSubscribed,
			isQuotaLeft,
			setTransactionModal,
			setValidateProduct,
			getDraft,
			postTradeEngine,
		},
	);

	const getDutiesSubmitHandler = async () => {
		const resp = await submitForm(true);

		if (resp) {
			setQuoteRes(resp);
			if (isQuotaLeft) {
				setValidateProduct(true);
			} else {
				setPaymentModal(true);
			}
		}
	};

	return (
		<>
			{(fields || []).map((field, index) => {
				if (index === 0 || index > 3) return <div />;
				const Element = getField(field?.type);
				return (
					<div
						className={cl`${styles.flex_box} ${
							errors?.[field?.name] && styles.error
						}  ${styles.row}`}
					>
						<p className={styles.label}>{field?.label}</p>
						<Element
							{...field}
							control={control}
							className={cl`${styles.input_box} ${styles[field?.className]} `}
							suffix={getSuffix(field?.name, getDutiesSubmitHandler, getRatesModalHandler)}
						/>
					</div>
				);
			})}

			<PaymentModeModal
				isUserSubscribed={isUserSubscribed}
				paymentModal={paymentModal}
				setPaymentModal={setPaymentModal}
				paymentMode={paymentMode}
				setPaymentMode={setPaymentMode}
				setValidateProduct={setValidateProduct}
			/>

			<ValidateProductModal
				isUserSubscribed={isUserSubscribed}
				validateProduct={validateProduct}
				setValidateProduct={setValidateProduct}
				paymentMode={paymentMode}
				prioritySequence={prioritySequence}
				quotaValue={quotaValue}
				isQuotaLeft={isQuotaLeft}
				quoteRes={quoteRes}
				getDraftData={getDraftData}
				getDraftLoading={getDraftLoading}
				setTransactionModal={setTransactionModal}
				postTradeEngine={postTradeEngine}
				createQuoteHook={createQuoteHook}
			/>
			{calculateCharge && (
				<FreightCharges
					calculateCharge={calculateCharge}
					setCalculateCharge={setCalculateCharge}
					watch={watch}
					setValue={setValue}
					infoData={data}
					transportMode={transportMode}
				/>
			)}
			<PendingModal pendingModal={pendingModal} setPendingModal={setPaymentModal} pendingStatus={pendingStatus} />
			<TransactionModal
				transactionModal={transactionModal}
				setTransactionModal={setTransactionModal}
				transactionData={transactionResp}
				tradeEngineLoading={tradeEngineLoading}
				setValue={setValue}
				setShowSuccessModal={setShowSuccessModal}
			/>
			<SuccessModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />
		</>
	);
}

export default forwardRef(BasicCharge);
