import { Button, Modal } from '@cogoport/components';
import { IcMArrowLeft } from '@cogoport/icons-react';
import { useState } from 'react';

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
	console.log(serviceProduct, 'serviceProduct');
	const { refetchDraft, draftLoading } = useDraft();
	const { postPayemnt, paymentLoading } = usePayment;

	const { id: quoteId = '' } = createQuoteData;
	const headerResLength = Object.keys(headerResponse).length;

	const { submitHandler, renderBtn } = useCheckoutModal({
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
	});

	return (
		<Modal show={showCheckout} onClose={() => setShowCheckout(false)} size="lg">
			<Modal.Header title={(
				<div className={styles.flex_box}>
					<IcMArrowLeft style={{ cursor: 'pointer' }} onClick={() => setShowCheckout(false)} />
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
					/>
					<Summary isQuotaLeft={isQuotaLeft} quotaValue={quotaValue} productInfoArr={productInfoArr} />
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					loading={draftLoading || paymentLoading || locationLoading}
					onClick={submitHandler}
				>
					{renderBtn()}

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CheckoutModal;
