import React from 'react';

import CheckoutModal from '../CheckoutModal';

function PaymentModal({ modal, setModal, paymentData }) {
	const { checkoutModal } = modal || {};
	return (
		checkoutModal && (
			<CheckoutModal
				checkoutModal={checkoutModal}
				setModal={setModal}
				paymentInitiationResponse={paymentData}
			/>
		)

	);
}

export default PaymentModal;
