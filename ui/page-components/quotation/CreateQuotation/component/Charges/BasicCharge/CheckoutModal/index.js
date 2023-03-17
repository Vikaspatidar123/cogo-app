import { Button, Modal } from '@cogoport/components';
import { IcMArrowLeft } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import useCheckoutModal from '../../../../hooks/useCheckoutModal';
import useDraft from '../../../../hooks/useDraft';
import usePayment from '../../../../hooks/usePayment';

import ServiceCharge from './ServiceCharge';
import styles from './styles.module.css';
import Summary from './Summary';
import Transport from './Transport';

function CheckoutModal({
	showCheckout,
	setShowCheckout,
	setValidateProduct,
	quotaValue,
	paymentMode,
	serviceProduct,
	headerResponse,
	serviceData = {},
	isQuotaLeft = false,
	productInfoArr,
	createQuoteData = {},
	prioritySequence = 0,
	createHeader,
	createlineItem,
	consignmentValue,
	postTradeEngine,
	setTransactionModal,
	locationLoading,
}) {
	const [traderCheck, setTrackerCheck] = useState(false);
	const [chargeData, setChargeData] = useState({});
	const { refetchDraft, draftLoading } = useDraft();
	const { postPayemnt, paymentLoading } = usePayment();
	const loading = draftLoading || paymentLoading || locationLoading;

	const { id: quoteId = '' } = createQuoteData;
	const headerResLength = Object.keys(headerResponse).length;

	const { submitHandler, renderBtn, createBillLineItems } = useCheckoutModal({
		quoteId,
		traderCheck,
		paymentMode,
		headerResLength,
		refetchDraft,
		serviceProduct,
		postPayemnt,
		prioritySequence,
		createHeader,
		createlineItem,
		postTradeEngine,
		setTransactionModal,
		setShowCheckout,
		serviceData,
		setValidateProduct,
	});

	useEffect(() => {
		if (paymentMode === 'directPay') {
			const { payloadData, ...rest } = createBillLineItems();
			setChargeData(rest);
		}
	}, [traderCheck]);
	return (
		<Modal show={showCheckout} onClose={() => setShowCheckout(false)} size="lg">
			<Modal.Header title={(
				<div className={styles.flex_box}>
					<IcMArrowLeft style={{ cursor: 'pointer' }} onClick={() => !loading && setShowCheckout(false)} />
					<h3 className={styles.header}>Checkout</h3>
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.container}>
					<Transport consignmentValue={consignmentValue} />
					<ServiceCharge
						serviceProduct={serviceProduct}
						serviceData={serviceData}
						isQuotaLeft={isQuotaLeft}
						traderCheck={traderCheck}
						setTrackerCheck={setTrackerCheck}
						loading={loading}
					/>
					<Summary
						isQuotaLeft={isQuotaLeft}
						quotaValue={quotaValue}
						productInfoArr={productInfoArr}
						chargeData={chargeData}
						serviceData={serviceData}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					loading={loading}
					onClick={submitHandler}
				>
					{renderBtn()}

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CheckoutModal;
