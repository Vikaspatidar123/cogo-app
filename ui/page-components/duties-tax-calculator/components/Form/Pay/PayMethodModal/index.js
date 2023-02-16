import {
	IcAOfferFlexiblePaymentsTerms,
	IcACreditAndPayments,
	IcAAccountRelated,
} from '@cogoport/icons-react';

import {
	StyledModal, Container, CardContainer, Card, Dot, Txt, Heading,
} from './styles';

import { useRouter } from '@/packages/store';

function PayMethodModal({
	showPayMethodModal,
	setShowPayMethodModal,
	isUserSubscribed = false,
	paymentMode = '',
	setPaymentMode,
	checkoutHandler = () => {},
	isMobile = false,
}) {
	const { query = {} } = useRouter();
	const { org_id, branch_id, account_type } = query || {};
	const subscriptionsUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/cogo-subscriptions`;

	const submitHandler = (method) => {
		if (method === 'buySubscription') {
			const url = `${subscriptionsUrl}/manage-subscription`;
			setPaymentMode('buy');
			window.open(url, '_blank');
		} else if (method === 'buyAddon') {
			const url = `${subscriptionsUrl}/balance-history`;
			setPaymentMode('buy');
			window.open(url, '_blank');
		} else if (method === 'directPay') {
			checkoutHandler();
			setShowPayMethodModal(false);
		}
	};
	return (
		<StyledModal
			className="primary"
			show={showPayMethodModal}
			onClose={() => setShowPayMethodModal(false)}
			width={!isMobile ? '534' : '383'}
		>
			<Container>
				<Heading>Select mode of Payment</Heading>
				<CardContainer>
					{!isUserSubscribed && (
						<Card
							className={`${paymentMode === 'buy' && 'selectedCard'}`}
							onClick={() => submitHandler('buySubscription')}
						>
							{paymentMode === 'buy' && <Dot />}
							<IcAOfferFlexiblePaymentsTerms width={60} height={60} />
							<Txt className="text">Buy Subscription</Txt>
						</Card>
					)}
					{isUserSubscribed && (
						<Card
							className={`${paymentMode === 'buy' && 'selectedCard'}`}
							onClick={() => submitHandler('buyAddon')}
						>
							{paymentMode === 'buy' && <Dot />}
							<IcAAccountRelated width={60} height={60} />
							<Txt className="text">Buy Add-Ons</Txt>
						</Card>
					)}
					<Card
						className={`${paymentMode === 'directPay' && 'selectedCard'}`}
						onClick={() => submitHandler('directPay')}
					>
						{paymentMode === 'directPay' && <Dot />}
						<IcACreditAndPayments width={60} height={60} />
						<Txt className="text">Direct Payment</Txt>
					</Card>
				</CardContainer>
			</Container>
		</StyledModal>
	);
}

export default PayMethodModal;
