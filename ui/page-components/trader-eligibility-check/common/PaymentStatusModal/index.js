import Modal from '@cogoport/front/components/admin/Modal';
import Button from '@cogoport/front/components/admin/Button';
import { IcMInformation } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';
import { Container, Title, Txt, Image } from './style';
import redirectUrl from '../../constants/redirectUrl';
import PaymentDoneSvg from '../../assets/payment.svg';

const PaymentStatusModal = ({
	paymentStatusModal = false,
	setPaymentStatusModal = () => {},
	stop = '',
	paymentStatus = '',
	checkLoading = false,
}) => {
	setTimeout(() => {
		if (paymentStatus === 'PAID') {
			setPaymentStatusModal(false);
		}
	}, 3000);
	const { successUrl, pendingUrl } = redirectUrl();
	const closeModalHandler = () => {
		setPaymentStatusModal(false);
	};
	const [url, setUrl] = useState(pendingUrl);
	const [text, setText] = useState('Hang on! Checking payment status');
	useEffect(() => {
		if (!checkLoading && paymentStatus === 'PAID') {
			setTimeout(
				() => {
					setPaymentStatusModal(false);
				},
				2500,
				setUrl(successUrl),
				setText('Payment Successful!!!!'),
			);
		} else if (!checkLoading && paymentStatus === 'ERROR') {
			setText(
				'Ooopss!!! Something went wrong.We could not process your request right now. We will review this issue and get back to you in 24-48 hrs.',
			);
		}
	}, [paymentStatus]);

	return (
		<Modal
			className="primary md"
			show={paymentStatusModal}
			onClose={closeModalHandler}
			closable
		>
			{!stop && (
				<Container>
					{paymentStatus === 'ERROR' ? (
						<PaymentDoneSvg height="150px" width="150px" />
					) : (
						<Image src={url} />
					)}
					<Title className={paymentStatus === 'ERROR' && 'noresult'}>{text}</Title>
				</Container>
			)}
			{stop && (
				<Container>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<Txt className="error">
						Sorry, It took longer than usual. We will notify you once payment is
						successful
					</Txt>
					<Button className="secondary sm text" onClick={closeModalHandler}>
						Close
					</Button>
				</Container>
			)}
		</Modal>
	);
};
export default PaymentStatusModal;
