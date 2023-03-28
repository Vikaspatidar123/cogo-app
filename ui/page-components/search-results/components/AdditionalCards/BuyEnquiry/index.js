// import AddressModal from '@cogo/product-pricing/components/Card/AddressModal';
// import useGetPaymentAmount from '@cogo/product-pricing/hooks/useGetPaymentAmount';
import { Button } from '@cogoport/components';
import React, { useState } from 'react';

function BuyEnquiry({ buttonText = '', className = '', onPayment = null }) {
	const { currency, numberValues, amount } = useGetPaymentAmount({ service_type: 'spot-negotiation' });
	const [addressModal, setAddressModal] = useState(false);

	return (
		<div>
			<Button className={className} onClick={() => setAddressModal(true)}>{buttonText}</Button>
			{addressModal ? (
				<AddressModal
					{...{
						addressModal,
						setAddressModal,
						currency,
						numberValues,
						amount,
						Razorpay,
						currentService: 'spot-negotiation',
						onPayment,
					}}
				/>
			) : null}
		</div>
	);
}
export default BuyEnquiry;
