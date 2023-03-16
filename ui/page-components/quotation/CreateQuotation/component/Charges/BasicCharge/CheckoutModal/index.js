import { Button, Modal } from '@cogoport/components';
import { IcMArrowLeft } from '@cogoport/icons-react';
import { useState } from 'react';

import useCheckoutModal from '../../../../hooks/useCheckoutModal';
import useDraft from '../../../../hooks/useDraft';
import useListLocation from '../../../../hooks/useListLocation';
import usePayment from '../../../../hooks/usePayment';

import ServiceCharge from './ServiceCharge';
import styles from './styles.module.css';
import Summary from './Summary';
import Transport from './Transport';

function CheckoutModal({
	showCheckout,
	setShowCheckout, paymentMode, serviceProduct, quoteRes, headerResLength = 0, serviceData = {}, isQuotaLeft = false,
	quotaValue, productInfoArr, servicesSelected, createQuoteData = {}, prioritySequence = 0,
}) {
	const [traderCheck, setTrackerCheck] = useState(false);

	const { getPortDetails, locationLoading } = useListLocation();
	const { refetchDraft, draftLoading } = useDraft();
	const { postPayemnt, paymentLoading } = usePayment;

	const consignmentValue = productInfoArr?.reduce((prev, amount) => +prev + +amount.product_price, 0);
	const { id: quoteId = '' } = createQuoteData;

	const { submitHandler, renderBtn } = useCheckoutModal({
		quoteRes,
		quoteId,
		traderCheck,
		productInfoArr,
		servicesSelected,
		paymentMode,
		headerResLength,
		getPortDetails,
		refetchDraft,
		consignmentValue,
		serviceProduct,
		serviceData,
		postPayemnt,
		prioritySequence,
	});

	return (
		<Modal show={showCheckout} onClose={() => setShowCheckout(false)} size="lg">
			<Modal.Header title={(
				<div className={styles.flex_box}>
					<IcMArrowLeft style={{ cursor: 'pointer' }} />
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
					loading={locationLoading || draftLoading || paymentLoading}
					onClick={submitHandler}
				>
					{renderBtn()}

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CheckoutModal;
