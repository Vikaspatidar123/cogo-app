import { Button, Modal } from '@cogoport/components';
import { IcMArrowLeft } from '@cogoport/icons-react';
import { useState } from 'react';

import ServiceCharge from './ServiceCharge';
import styles from './styles.module.css';
import Summary from './Summary';
import Transport from './Transport';

function CheckoutModal({
	showCheckout,
	setShowCheckout, paymentMode, serviceProduct, quoteRes, headerResLength = 0, serviceData = {}, isQuotaLeft = false,
	quotaValue, productInfoArr,
}) {
	const [traderCheck, setTrackerCheck] = useState(false);
	const renderBtn = () => {
		if (paymentMode === 'addon' || headerResLength > 0) {
			return 'Get Details';
		}
		return 'Proceed to Pay';
	};
	console.log(serviceProduct, 'serviceProduct');

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
					<Transport />
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
				<Button>{renderBtn()}</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CheckoutModal;
