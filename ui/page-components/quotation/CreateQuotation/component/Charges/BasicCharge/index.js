import { cl, Button } from '@cogoport/components';
import { useState, forwardRef } from 'react';

import useCheckPaymentStatus from '../../../hooks/useCheckPaymentStatus';
import useGetDraft from '../../../hooks/useGetDraft';
import useGetQuota from '../../../hooks/useGetQuota';
import useTradeEngine from '../../../hooks/useTradeEngine';
import styles from '../styles.module.css';

import PaymentModeModal from './PaymentModeModal';
import ValidateProductModal from './ValidateProductModal';

import getField from '@/packages/forms/Controlled';

const style = {
	padding  : ' 0px',
	fontSize : '9px',
};
const getSuffix = (name, getDutiesSubmitHandler) => {
	if (name === 'basicFreightCharges') {
		return <Button size="sm" style={style} themeType="linkUi">GET RATES</Button>;
	}
	if (name === 'dutiesAndTaxes') {
		return <Button size="sm" style={style} themeType="linkUi" onClick={getDutiesSubmitHandler}>GET DUTIES</Button>;
	}
	return null;
};

function BasicCharge({ fields, control, errors, submitForm }) {
	const [paymentModal, setPaymentModal] = useState(false);
	const [pendingModal, setPendingModal] = useState(false);
	const [transactionModal, setTransactionModal] = useState(false);
	const [validateProduct, setValidateProduct] = useState(false);
	const [paymentMode, setPaymentMode] = useState('addon');
	const [quoteRes, setQuoteRes] = useState({});
	const {
		isUserSubscribed = false,
		isQuotaLeft = false,
		quotaValue,
		prioritySequence,
		// getQuota,
		// loading = false,
	} = useGetQuota();

	const {
		postTradeEngine,
		transactionResp,
		tradeEngineLoading,
		tradeEngineRespLength,
	} = useTradeEngine();

	const { loading, getDraftData, getDraft } = useGetDraft();
	const { pendingStatus, checkPaymentStatus } = 	useCheckPaymentStatus(
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
		const resp = await submitForm();
		console.log(resp, 'resp');
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
				// eslint-disable-next-line react/jsx-no-useless-fragment
				if (index === 0 || index > 3) return <></>;
				const Element = getField(field?.type);
				return (
					<div className={cl`${styles.flex_box} ${errors?.[field?.name] && styles.error}  ${styles.row}`}>
						<p className={styles.label}>{field?.label}</p>
						<Element
							{...field}
							control={control}
							className={cl`${styles.input_box} ${styles[field?.className]} `}
							suffix={getSuffix(field?.name, getDutiesSubmitHandler)}
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
			/>
		</>
	);
}

export default forwardRef(BasicCharge);
