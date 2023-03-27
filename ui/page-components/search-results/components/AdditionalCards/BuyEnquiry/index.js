import React, { useState } from 'react';
import { Btn } from '@cogo/deprecated_legacy/ui';
import useGetPaymentAmount from '@cogo/product-pricing/hooks/useGetPaymentAmount';
import AddressModal from '@cogo/product-pricing/components/Card/AddressModal';
import { Container } from './styles';

const BuyEnquiry = ({ buttonText = '', className = '', onPayment = null }) => {
	const { currency, numberValues, amount } = useGetPaymentAmount({ service_type: 'spot-negotiation' });
	const [addressModal, setAddressModal] = useState(false);

	return (
		<Container>
			<Btn className={className} onClick={() => setAddressModal(true)}>{buttonText}</Btn>
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
		</Container>
	);
};
export default BuyEnquiry;
